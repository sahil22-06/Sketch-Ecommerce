import { Link, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useToast } from "../components/CustomToast";
import { collection, query, getDocs, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase";
import { formatCurrency } from "../utils/formatUtils";

/**
 * Admin Dashboard Component
 * 
 * This component provides the main dashboard with statistical information:
 * - Total orders and revenue metrics
 * - Order trends over time
 * - Top selling products
 * - Order status breakdown
 */
const AdminDashboard = () => {
  // State for statistics
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [orderStats, setOrderStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    averageOrderValue: 0,
    recentOrders: [] 
  });
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [productPerformance, setProductPerformance] = useState([]);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [userStats, setUserStats] = useState({
    totalUsers: 0,
    newUsersThisMonth: 0
  });

  // Define chart colors for status indicators
  const STATUS_COLORS = {
    "Placed": "#FFBB28", 
    "Approved": "#0088FE", 
    "Shipped": "#8884d8",
    "Delivered": "#00C49F",
    "Declined": "#FF8042",
    "Cancelled": "#FF6B6B"
  };

  /**
   * Fetch statistics data when component mounts
   */
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          fetchOrderStatistics(),
          fetchMonthlyRevenue(),
          fetchProductPerformance(),
          fetchOrderStatusDistribution(),
          fetchUserStatistics()
        ]);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast.error("Failed to load some dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  /**
   * Fetch general order statistics
   */
  const fetchOrderStatistics = async () => {
    try {
      const ordersRef = collection(db, "orders");
      const ordersSnapshot = await getDocs(ordersRef);
      
      let totalRevenue = 0;
      const orders = ordersSnapshot.docs.map(doc => {
        const data = doc.data();
        totalRevenue += data.total || 0;
        return { id: doc.id, ...data };
      });
      
      // Get recent orders
      const recentOrdersQuery = query(
        collection(db, "orders"), 
        orderBy("orderDate", "desc"), 
        limit(5)
      );
      const recentOrdersSnapshot = await getDocs(recentOrdersQuery);
      const recentOrders = recentOrdersSnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      }));
      
      setOrderStats({
        totalOrders: orders.length,
        totalRevenue: totalRevenue,
        averageOrderValue: orders.length > 0 ? totalRevenue / orders.length : 0,
        recentOrders: recentOrders
      });
    } catch (error) {
      console.error("Error fetching order statistics:", error);
    }
  };

  /**
   * Fetch monthly revenue data for charts
   */
  const fetchMonthlyRevenue = async () => {
    try {
      const now = new Date();
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(now.getMonth() - 6);
      
      const ordersRef = collection(db, "orders");
      const ordersSnapshot = await getDocs(ordersRef);
      
      // Group orders by month
      const monthlyData = {};
      
      // Initialize with last 6 months
      for (let i = 0; i < 6; i++) {
        const month = new Date();
        month.setMonth(now.getMonth() - i);
        const monthKey = `${month.getFullYear()}-${month.getMonth() + 1}`;
        const monthName = month.toLocaleString('default', { month: 'short' });
        monthlyData[monthKey] = { month: monthName, year: month.getFullYear(), revenue: 0, orders: 0 };
      }
      
      // Process orders
      ordersSnapshot.docs.forEach(doc => {
        const data = doc.data();
        const orderDate = new Date(data.orderDate);
        
        // Only include orders from last 6 months
        if (orderDate >= sixMonthsAgo) {
          const monthKey = `${orderDate.getFullYear()}-${orderDate.getMonth() + 1}`;
          
          if (monthlyData[monthKey]) {
            monthlyData[monthKey].revenue += data.total || 0;
            monthlyData[monthKey].orders += 1;
          }
        }
      });
      
      // Convert to array and sort by date
      const monthlyArray = Object.values(monthlyData).sort((a, b) => {
        return a.year === b.year 
          ? new Date(0, a.month, 0) - new Date(0, b.month, 0)
          : a.year - b.year;
      });
      
      setMonthlyRevenue(monthlyArray);
    } catch (error) {
      console.error("Error fetching monthly revenue:", error);
    }
  };

  /**
   * Fetch top selling products data
   */
  const fetchProductPerformance = async () => {
    try {
      const ordersRef = collection(db, "orders");
      const ordersSnapshot = await getDocs(ordersRef);
      
      // Count products sold
      const productSales = {};
      
      ordersSnapshot.docs.forEach(doc => {
        const data = doc.data();
        if (data.items && Array.isArray(data.items)) {
          data.items.forEach(item => {
            if (!productSales[item.name]) {
              productSales[item.name] = {
                name: item.name,
                quantity: 0,
                revenue: 0
              };
            }
            productSales[item.name].quantity += item.quantity || 0;
            productSales[item.name].revenue += (item.price * item.quantity) || 0;
          });
        }
      });
      
      // Convert to array and sort by quantity
      const productArray = Object.values(productSales)
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 5); // Get top 5
      
      setProductPerformance(productArray);
    } catch (error) {
      console.error("Error fetching product performance:", error);
    }
  };

  /**
   * Fetch order status distribution data
   */
  const fetchOrderStatusDistribution = async () => {
    try {
      const ordersRef = collection(db, "orders");
      const ordersSnapshot = await getDocs(ordersRef);
      
      // Count orders by status
      const statusCounts = {};
      
      ordersSnapshot.docs.forEach(doc => {
        const data = doc.data();
        const status = data.status || "Unknown";
        
        if (!statusCounts[status]) {
          statusCounts[status] = { status, count: 0 };
        }
        statusCounts[status].count += 1;
      });
      
      // Convert to array
      const statusArray = Object.values(statusCounts);
      
      setStatusDistribution(statusArray);
    } catch (error) {
      console.error("Error fetching status distribution:", error);
    }
  };

  /**
   * Fetch user statistics
   */
  const fetchUserStatistics = async () => {
    try {
      const usersRef = collection(db, "users");
      const usersSnapshot = await getDocs(usersRef);
      
      // Calculate new users in current month
      const now = new Date();
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      let newUsersCount = 0;
      
      usersSnapshot.docs.forEach(doc => {
        const data = doc.data();
        if (data.createdAt && new Date(data.createdAt.seconds * 1000) >= firstDayOfMonth) {
          newUsersCount++;
        }
      });
      
      setUserStats({
        totalUsers: usersSnapshot.docs.length,
        newUsersThisMonth: newUsersCount
      });
    } catch (error) {
      console.error("Error fetching user statistics:", error);
    }
  };



  /**
   * Render dashboard cards and charts
   */
  const renderDashboard = () => {
    if (loading) {
      return (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      );
    }

    return (
      <div>
        {/* Stats Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Orders */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">Total Orders</p>
                <h3 className="text-2xl font-bold text-gray-800">{orderStats.totalOrders}</h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Total Revenue */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">Total Revenue</p>
                <h3 className="text-2xl font-bold text-gray-800">{formatCurrency(orderStats.totalRevenue)}</h3>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Average Order Value */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">Avg. Order Value</p>
                <h3 className="text-2xl font-bold text-gray-800">{formatCurrency(orderStats.averageOrderValue)}</h3>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Total Users */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">Total Users</p>
                <h3 className="text-2xl font-bold text-gray-800">{userStats.totalUsers}</h3>
                <p className="text-xs text-green-500 mt-1">+{userStats.newUsersThisMonth} this month</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Charts Section */}
        {/* Statistics Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Revenue Summary */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-4">Monthly Revenue Summary</h3>
            {monthlyRevenue.length > 0 ? (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {formatCurrency(monthlyRevenue.reduce((sum, item) => sum + item.revenue, 0))}
                  </div>
                  <p className="text-gray-600">Total Revenue</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">{monthlyRevenue.length}</div>
                    <div className="text-gray-500">Months</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">
                      {formatCurrency(monthlyRevenue.reduce((sum, item) => sum + item.revenue, 0) / monthlyRevenue.length)}
                    </div>
                    <div className="text-gray-500">Avg/Month</div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-center py-8 text-gray-500">No revenue data available</p>
            )}
          </div>

          {/* Order Status Distribution */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-4">Order Status Distribution</h3>
            {statusDistribution.length > 0 ? (
              <div className="space-y-3">
                {statusDistribution.map((status, index) => (
                  <div key={status.name} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-3"
                        style={{ backgroundColor: STATUS_COLORS[status.name] || '#8884d8' }}
                      ></div>
                      <span className="text-sm font-medium text-gray-700">{status.name}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">{status.count}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-8 text-gray-500">No status data available</p>
            )}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-8">
          <h3 className="font-semibold text-gray-800 mb-4">Top Selling Products</h3>
          {productPerformance.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {productPerformance.slice(0, 6).map((product, index) => (
                <div key={product.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-sm font-bold text-blue-600 mr-2">#{index + 1}</span>
                    <span className="text-sm text-gray-700 truncate max-w-24">{product.name}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{product.sales} sold</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center py-8 text-gray-500">No product performance data available</p>
          )}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-4">Recent Orders</h3>
          {orderStats.recentOrders.length === 0 ? (
            <div className="text-center p-6 text-gray-500">No orders found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orderStats.recentOrders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        <Link to={`/orders/${order.id}`} className="text-blue-600 hover:underline">
                          {order.orderId || order.id.substring(0, 8)}
                        </Link>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {order.userName || order.userEmail || 'Unknown'}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(order.total || 0)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                          order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' :
                          order.status === 'Approved' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'Placed' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status || 'Processing'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 flex justify-end">
                <Link to="/orders" className="text-sm text-blue-600 hover:underline">
                  View All Orders →
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return renderDashboard();
};

/**
 * Admin Home/Dashboard Component
 * 
 * This component provides the layout for the admin panel including:
 * - Sidebar navigation to all admin functions
 * - Logout functionality
 * - Main content area for displaying child routes
 */
const AdminHome = () => {
  const [setIsLoggedIn] = useState(true); 
  const location = useLocation();
  const { toast } = useToast();

  /**
   * Handle admin logout
   */
  const handleLogout = () => {
    setIsLoggedIn(false); 
    toast.success("Logged out successfully!");
    window.location.href = "/login"; 
  };

  // Check if we're on a management route to hide the welcome content
  const isManageRoute = 
    location.pathname === '/users' || 
    location.pathname === '/products' ||
    location.pathname === '/orders' ||
    location.pathname === '/coupons' ||
    location.pathname === '/banners' ||
    location.pathname === '/announcements' ||
    location.pathname.startsWith('/products/edit') ||
    location.pathname.startsWith('/products/add');

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col justify-between p-4">
        <div>
          <h2 className="text-lg font-bold mb-4">Admin Panel</h2>
          <ul className="space-y-2">
            <li>
              <Link 
                to="/" 
                className={`block px-4 py-2 rounded hover:bg-gray-700 ${
                  location.pathname === '/' ? 'bg-gray-700' : ''
                }`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link 
                to="/orders" 
                className={`block px-4 py-2 rounded hover:bg-gray-700 ${
                  location.pathname === '/orders' ? 'bg-gray-700' : ''
                }`}
              >
                Manage Orders
              </Link>
            </li>
            <li>
              <Link 
                to="/products" 
                className={`block px-4 py-2 rounded hover:bg-gray-700 ${
                  location.pathname.includes('/products') ? 'bg-gray-700' : ''
                }`}
              >
                Manage Products
              </Link>
            </li>
            <li>
              <Link 
                to="/users" 
                className={`block px-4 py-2 rounded hover:bg-gray-700 ${
                  location.pathname === '/users' ? 'bg-gray-700' : ''
                }`}
              >
                Manage Users
              </Link>
            </li>
            <li>
              <Link 
                to="/coupons" 
                className={`block px-4 py-2 rounded hover:bg-gray-700 ${
                  location.pathname === '/coupons' ? 'bg-gray-700' : ''
                }`}
              >
                Manage Coupons
              </Link>
            </li>
            <li>
              <Link 
                to="/banners" 
                className={`block px-4 py-2 rounded hover:bg-gray-700 ${
                  location.pathname === '/banners' ? 'bg-gray-700' : ''
                }`}
              >
                Manage Banners
              </Link>
            </li>
            <li>
              <Link 
                to="/announcements" 
                className={`block px-4 py-2 rounded hover:bg-gray-700 ${
                  location.pathname === '/announcements' ? 'bg-gray-700' : ''
                }`}
              >
                Manage Announcements
              </Link>
            </li>
          </ul>
        </div>
        <button
          onClick={handleLogout}
          className="mt-auto block w-full text-left px-4 py-2 rounded hover:bg-red-700 text-red"
        >
          Logout
        </button>
      </div>
      {/* Main Content Area */}
      <div className="flex-1 p-8 overflow-y-auto">
        {!isManageRoute && location.pathname === "/" && (
          <>
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
            <AdminDashboard />
          </>
        )}
        {isManageRoute || location.pathname !== "/" ? (
          <Outlet /> /* Render nested routes here */
        ) : null}
      </div>
    </div>
  );
};

export default AdminHome;
