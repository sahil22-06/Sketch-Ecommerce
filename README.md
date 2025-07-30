# Sketch - E-Commerce Platform

A modern, full-stack e-commerce platform built with React, Firebase, and Tailwind CSS. Features a complete shopping experience with admin panel, user authentication, payment processing, and email notifications.

**Made by sahil shaikh**

## 🌟 Features

### 🛍️ User Features
- **Authentication**: Email/password, Google, and GitHub sign-in
- **User Profile**: Complete profile management with address and preferences
- **Product Catalog**: Browse products with search, filtering, and categories
- **Shopping Cart**: Add/remove items with quantity management
- **Wishlist**: Save favorite products for later
- **Checkout**: Secure payment processing with multiple payment methods
- **Order Tracking**: Real-time order status updates
- **Reviews & Ratings**: Product reviews and rating system
- **Email Notifications**: Order confirmations and shipping updates
- **Mobile Responsive**: Optimized for all devices

### 🔧 Admin Features
- **Dashboard**: Analytics and sales overview
- **Product Management**: Add, edit, delete products with images
- **Order Management**: Process orders, update status, add tracking
- **User Management**: View user profiles and manage accounts
- **Coupon System**: Create and manage discount coupons
- **Banner Management**: Dynamic homepage banners
- **Announcements**: Site-wide announcements system
- **Inventory Management**: Stock tracking and updates

## 🚀 Tech Stack

### Frontend
- **React 18** - UI framework
- **Redux Toolkit** - State management
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation
- **React Icons** - Icon library

### Backend & Services
- **Firebase** - Authentication, Database, Storage
- **Firestore** - NoSQL database
- **Cloudflare Functions** - Serverless functions
- **Resend** - Email service
- **React Snap** - Static site generation

### Development Tools
- **Vite** - Build tool
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Puppeteer** - Screenshot generation

## 📁 Project Structure

```
sketch-ecommerce/
├── public/                 # Static assets
├── src/                    # Main application
│   ├── components/         # Reusable components
│   ├── pages/             # Page components
│   ├── redux/             # State management
│   ├── utils/             # Utility functions
│   ├── firebase/          # Firebase configuration
│   └── assets/            # Images and assets
├── shopAdmin/             # Admin panel (separate app)
├── functions/             # Cloudflare Functions
├── firebase.rules.txt     # Firestore security rules
└── cloudflare-pages.config.json
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase account
- Cloudflare account (for deployment)
- Resend account (for emails)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/sketch-ecommerce.git
cd sketch-ecommerce
```

### 2. Install Dependencies
```bash
# Install main app dependencies
npm install

# Install admin panel dependencies
cd shopAdmin
npm install
cd ..
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id

# Email Configuration (Resend)
REACT_APP_EMAIL_ENABLED=true
REACT_APP_EMAIL_FROM=orders@yourdomain.com
REACT_APP_SUPPORT_EMAIL=support@yourdomain.com
RESEND_API_KEY=your_resend_api_key

# Google reCAPTCHA
REACT_APP_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
```

### 4. Firebase Setup

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Create a new project
   - Enable Authentication, Firestore, and Storage

2. **Configure Authentication**
   - Enable Email/Password, Google, and GitHub providers
   - Add authorized domains

3. **Set up Firestore Database**
   - Create database in production mode
   - Apply security rules from `firebase.rules.txt`

4. **Configure Storage**
   - Set up Firebase Storage for product images
   - Configure security rules

### 5. Email Service Setup (Resend)

1. **Create Resend Account**
   - Sign up at [Resend](https://resend.com)
   - Verify your domain
   - Get API key

2. **Configure Email Templates**
   - Customize email templates in `src/utils/emailService.js`
   - Test email functionality

### 6. Start Development Server

```bash
# Start main application
npm start

# Start admin panel (in new terminal)
cd shopAdmin
npm start
```

## 🚀 Deployment Options

### Option 1: Cloudflare Pages (Recommended)

#### 1. Connect to Cloudflare Pages
- Go to [Cloudflare Pages](https://pages.cloudflare.com)
- Connect your GitHub repository
- Configure build settings:

**Build Configuration:**
- Framework preset: `Create React App`
- Build command: `npm run build`
- Build output directory: `build`
- Root directory: `/` (leave empty)

#### 2. Environment Variables
Add these environment variables in Cloudflare Pages:

```env
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_EMAIL_ENABLED=true
REACT_APP_EMAIL_FROM=orders@yourdomain.com
REACT_APP_SUPPORT_EMAIL=support@yourdomain.com
RESEND_API_KEY=your_resend_api_key
REACT_APP_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
```

#### 3. Deploy Functions
The `functions/` directory contains Cloudflare Functions for email handling. These will be automatically deployed with your Pages project.

### Option 2: Vercel

#### 1. Connect to Vercel
- Go to [Vercel](https://vercel.com)
- Import your GitHub repository
- Configure build settings

#### 2. Environment Variables
Add the same environment variables as above in Vercel dashboard.

#### 3. Deploy
Vercel will automatically build and deploy your application.

### Option 3: Netlify

#### 1. Connect to Netlify
- Go to [Netlify](https://netlify.com)
- Connect your GitHub repository
- Configure build settings

#### 2. Build Settings
- Build command: `npm run build`
- Publish directory: `build`

#### 3. Environment Variables
Add the same environment variables in Netlify dashboard.

### Option 4: Firebase Hosting

#### 1. Install Firebase CLI
```bash
npm install -g firebase-tools
```

#### 2. Initialize Firebase
```bash
firebase login
firebase init hosting
```

#### 3. Build and Deploy
```bash
npm run build
firebase deploy
```

## 🔧 Admin Panel Deployment

The admin panel is a separate React application in the `shopAdmin/` directory.

### Deploy Admin Panel

#### Option 1: Separate Cloudflare Pages Project
1. Create a new Cloudflare Pages project
2. Set root directory to `shopAdmin`
3. Build command: `npm run build`
4. Build output directory: `build`
5. Add environment variables

#### Option 2: Subdomain Deployment
Deploy to a subdomain like `admin.yourdomain.com`

## 📊 Database Schema

### Collections Structure

```
users/
├── {userId}/
│   ├── profile
│   ├── cart/
│   ├── wishlist/
│   └── orders/

products/
├── {productId}/
│   ├── name, description, price
│   ├── images, category
│   └── stock, featured

orders/
├── {orderId}/
│   ├── userId, items
│   ├── total, status
│   └── shipping, payment

coupons/
├── {couponId}/
│   ├── code, discount
│   ├── validFrom, validTo
│   └── usageLimit

banners/
├── {bannerId}/
│   ├── imageUrl, active
│   └── priority, link

announcements/
├── {announcementId}/
│   ├── text, active
│   ├── backgroundColor
│   └── priority, link
```

## 🔒 Security Features

- **Firebase Security Rules**: Comprehensive access control
- **Authentication**: Multiple sign-in methods
- **Input Validation**: Client and server-side validation
- **CORS Protection**: Configured for production
- **Rate Limiting**: API request limits
- **Data Encryption**: Firebase encryption at rest

## 📱 PWA Features

- **Offline Support**: Service worker for offline functionality
- **App-like Experience**: Installable web app
- **Push Notifications**: Order updates and promotions
- **Fast Loading**: Optimized assets and caching

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- --testPathPattern=ComponentName
```

## 📈 Performance Optimization

- **Code Splitting**: Lazy loading of components
- **Image Optimization**: WebP format and lazy loading
- **Bundle Optimization**: Tree shaking and minification
- **Caching**: Service worker and CDN caching
- **Preloading**: Critical resources preloaded

## 🔧 Customization

### Styling
- Modify `tailwind.config.js` for theme customization
- Update colors, fonts, and spacing in `src/index.css`

### Features
- Add new payment methods in `src/utils/paymentUtils.js`
- Customize email templates in `src/utils/emailService.js`
- Extend admin features in `shopAdmin/src/`

### Localization
- Add language support in `src/utils/i18n.js`
- Update text content in components

## 🐛 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version (v16+)
   - Clear node_modules and reinstall
   - Verify environment variables

2. **Firebase Connection**
   - Verify API keys in environment variables
   - Check Firebase project configuration
   - Ensure Firestore rules are applied

3. **Email Not Working**
   - Verify Resend API key
   - Check domain verification
   - Test email templates

4. **Admin Access**
   - Ensure user has 'Admin' role in Firestore
   - Check authentication providers
   - Verify admin routes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions:
- Email: support@yourdomain.com
- GitHub Issues: [Create an issue](https://github.com/yourusername/sketch-ecommerce/issues)

## 🙏 Acknowledgments

- Firebase for backend services
- Tailwind CSS for styling
- React community for libraries
- Cloudflare for hosting and functions

---

**Made with ❤️ by sahil shaikh**
#   S k e t c h - E c o m m e r c e  
 