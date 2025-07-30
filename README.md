# 🎨 Sketch - Modern E-Commerce Platform

<div align="center">

![Sketch Logo](public/sketch-logo-transparent-darkish-logo-for-better-visibility.png)

**A beautifully crafted, full-stack e-commerce platform built with React, Firebase, and Tailwind CSS**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-View%20Now-brightgreen?style=for-the-badge&logo=render)](https://sketch-ecommerce.onrender.com)
[![React](https://img.shields.io/badge/React-18.3.1-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-10.13.2-orange?style=flat-square&logo=firebase)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.12-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

**Made with ❤️ by sahil shaikh**

</div>

---

## 🌟 Live Demo

**🎯 Experience the full e-commerce platform:**
- **Main Store**: [https://sketch-ecommerce.onrender.com](https://sketch-ecommerce.onrender.com)
- **Admin Panel**: [https://sketch-admin.onrender.com](https://sketch-admin.onrender.com)

---

## ✨ Features

### 🛍️ **Customer Experience**
- 🔐 **Multi-Auth**: Email/password, Google, and GitHub sign-in
- 👤 **User Profiles**: Complete profile management with addresses
- 🛒 **Smart Cart**: Add/remove items with real-time quantity management
- ❤️ **Wishlist**: Save favorite products for later
- 🔍 **Advanced Search**: Filter by category, price, and more
- 📱 **Mobile-First**: Responsive design for all devices
- ⭐ **Reviews & Ratings**: Product feedback system
- 📧 **Email Notifications**: Order confirmations and updates

### 🔧 **Admin Dashboard**
- 📊 **Analytics**: Sales overview and performance metrics
- 📦 **Product Management**: Add, edit, delete products with images
- 📋 **Order Management**: Process orders, update status, add tracking
- 👥 **User Management**: View profiles and manage accounts
- 🎫 **Coupon System**: Create and manage discount codes
- 🖼️ **Banner Management**: Dynamic homepage banners
- 📢 **Announcements**: Site-wide notification system
- 📈 **Inventory Tracking**: Real-time stock management

### 🚀 **Technical Features**
- ⚡ **PWA Ready**: Installable web app with offline support
- 🔒 **Secure**: Firebase security rules and authentication
- 📨 **Email Service**: Resend integration for notifications
- 🎨 **Modern UI**: Beautiful animations with Framer Motion
- 🌐 **SEO Optimized**: Meta tags and structured data
- 📊 **Performance**: Optimized loading and caching

---

## 🛠️ Tech Stack

<div align="center">

| Frontend | Backend | Services | Tools |
|----------|---------|----------|-------|
| ![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react) | ![Firebase](https://img.shields.io/badge/Firebase-10.13.2-FFCA28?style=flat-square&logo=firebase) | ![Resend](https://img.shields.io/badge/Resend-Email%20Service-000000?style=flat-square) | ![Tailwind](https://img.shields.io/badge/Tailwind%20CSS-3.4.12-38B2AC?style=flat-square&logo=tailwind-css) |
| ![Redux](https://img.shields.io/badge/Redux%20Toolkit-2.2.7-764ABC?style=flat-square&logo=redux) | ![Firestore](https://img.shields.io/badge/Firestore-Database-FF6B6B?style=flat-square) | ![Render](https://img.shields.io/badge/Render-Hosting-000000?style=flat-square&logo=render) | ![Framer Motion](https://img.shields.io/badge/Framer%20Motion-10.16.4-0055FF?style=flat-square) |
| ![React Router](https://img.shields.io/badge/React%20Router-6.26.2-CA4245?style=flat-square&logo=react-router) | ![Firebase Auth](https://img.shields.io/badge/Firebase%20Auth-Authentication-FF6B6B?style=flat-square) | ![Cloudflare](https://img.shields.io/badge/Cloudflare%20Functions-Serverless-F38020?style=flat-square&logo=cloudflare) | ![PostCSS](https://img.shields.io/badge/PostCSS-8.4.47-DD3A0A?style=flat-square&logo=postcss) |

</div>

---

## 📁 Project Structure

```
sketch-ecommerce/
├── 🎨 public/                 # Static assets & PWA files
├── 🚀 src/                    # Main React application
│   ├── 📦 components/         # Reusable UI components
│   ├── 📄 pages/             # Page components & routing
│   ├── 🔄 redux/             # State management
│   ├── 🛠️ utils/             # Utility functions
│   ├── 🔥 firebase/          # Firebase configuration
│   └── 🎯 assets/            # Images & static files
├── 👨‍💼 shopAdmin/            # Admin panel (separate app)
├── ⚡ functions/             # Cloudflare Functions
├── 📋 firebase.rules.txt     # Firestore security rules
└── 🚀 render.yaml           # Render deployment config
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase account
- Render account

### 1. Clone & Install
```bash
git clone https://github.com/sahil22-06/Sketch-Ecommerce.git
cd Sketch-Ecommerce
npm install
cd shopAdmin && npm install && cd ..
```

### 2. Environment Setup
Create `.env` file in root directory:
```env
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id

# Email Configuration
REACT_APP_EMAIL_ENABLED=true
REACT_APP_EMAIL_FROM=orders@yourdomain.com
REACT_APP_SUPPORT_EMAIL=support@yourdomain.com
RESEND_API_KEY=your_resend_api_key

# reCAPTCHA
REACT_APP_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
```

### 3. Start Development
```bash
# Start main app
npm start

# Start admin panel (new terminal)
cd shopAdmin && npm start
```

---

## 🌐 Deployment

### Render Deployment (Recommended)
1. **Connect to Render**: [dashboard.render.com](https://dashboard.render.com)
2. **Create Static Site** for main app
3. **Create Static Site** for admin panel (root: `shopAdmin`)
4. **Add environment variables**
5. **Deploy!**

**Detailed deployment guide**: [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md)

### Other Platforms
- **Vercel**: Automatic deployment from GitHub
- **Netlify**: Drag & drop deployment
- **Firebase Hosting**: Native Firebase integration

---

## 🔒 Security Features

- 🔐 **Firebase Security Rules**: Comprehensive access control
- 🛡️ **Authentication**: Multiple sign-in methods
- ✅ **Input Validation**: Client and server-side validation
- 🌐 **CORS Protection**: Configured for production
- 📊 **Rate Limiting**: API request limits
- 🔒 **Data Encryption**: Firebase encryption at rest

---

## 📱 PWA Features

- 📱 **Installable**: Add to home screen
- 🔄 **Offline Support**: Service worker caching
- 📲 **Push Notifications**: Order updates
- ⚡ **Fast Loading**: Optimized assets
- 🎯 **App-like Experience**: Native feel

---

## 🎨 Customization

### Styling
- Modify `tailwind.config.js` for theme customization
- Update colors and fonts in `src/index.css`

### Features
- Add payment methods in `src/utils/paymentUtils.js`
- Customize email templates in `src/utils/emailService.js`
- Extend admin features in `shopAdmin/src/`

---

## 📊 Performance

- ⚡ **Code Splitting**: Lazy loading components
- 🖼️ **Image Optimization**: WebP format & lazy loading
- 📦 **Bundle Optimization**: Tree shaking & minification
- 💾 **Caching**: Service worker & CDN caching
- 🚀 **Preloading**: Critical resources

---

## 🧪 Testing

```bash
# Run tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test
npm test -- --testPathPattern=ComponentName
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support & Contact

- 🌐 **Live Demo**: [https://sketch-ecommerce.onrender.com](https://sketch-ecommerce.onrender.com)
- 📧 **Email**: support@yourdomain.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/sahil22-06/Sketch-Ecommerce/issues)
- 📖 **Documentation**: [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md)

---

## 🙏 Acknowledgments

- [Firebase](https://firebase.google.com/) for backend services
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [React](https://reactjs.org/) community for libraries
- [Render](https://render.com/) for hosting
- [Resend](https://resend.com/) for email services

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

**Made with ❤️ by [sahil shaikh](https://github.com/sahil22-06)**

[![GitHub stars](https://img.shields.io/github/stars/sahil22-06/Sketch-Ecommerce?style=social)](https://github.com/sahil22-06/Sketch-Ecommerce)
[![GitHub forks](https://img.shields.io/github/forks/sahil22-06/Sketch-Ecommerce?style=social)](https://github.com/sahil22-06/Sketch-Ecommerce)
[![GitHub issues](https://img.shields.io/github/issues/sahil22-06/Sketch-Ecommerce)](https://github.com/sahil22-06/Sketch-Ecommerce/issues)

</div>