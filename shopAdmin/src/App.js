import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Users from "./pages/Users";
import ProductManager from "./pages/ProductManagement/ProductManager";
import AddProduct from "./pages/ProductManagement/AddProduct";
import EditProduct from "./pages/ProductManagement/EditProduct";
import CouponManager from "./pages/CouponManagement/CouponManager";
import BannerManager from "./pages/BannerManagement/BannerManager";
import AnnouncementManager from "./pages/AnnouncementManagement/AnnouncementManager";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import AdminHome from "./pages/AdminHome";
import { ToastProvider } from "./components/CustomToast";
import { AuthProvider } from "./contexts/AuthContext"; 

/**
 * Main Application Component
 * 
 * Defines all routes for the shop admin panel:
 * - Authentication routes
 * - Protected admin routes for dashboard, orders, products, users, and coupons management
 * - Banner and announcements management
 */
function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route 
              path="/" 
              element={
                <ProtectedRoute requiredRole="Admin">
                  <AdminHome />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/orders" 
              element={
                <ProtectedRoute requiredRole="Admin">
                  <Orders />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/users" 
              element={
                <ProtectedRoute requiredRole="Admin">
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/products" 
              element={
                <ProtectedRoute requiredRole="Admin">
                  <ProductManager />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/products/add" 
              element={
                <ProtectedRoute requiredRole="Admin">
                  <AddProduct />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/products/edit/:id" 
              element={
                <ProtectedRoute requiredRole="Admin">
                  <EditProduct />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/coupons" 
              element={
                <ProtectedRoute requiredRole="Admin">
                  <CouponManager />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/banners" 
              element={
                <ProtectedRoute requiredRole="Admin">
                  <BannerManager />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/announcements" 
              element={
                <ProtectedRoute requiredRole="Admin">
                  <AnnouncementManager />
                </ProtectedRoute>
              }
            />
            {/* Optionally, handle 404 Not Found */}
            <Route path="*" element={<div className="p-4">404 Not Found</div>} />
          </Routes>
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
