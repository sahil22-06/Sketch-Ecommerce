# 🚀 Render Deployment Guide for Sketch E-Commerce

This guide will help you deploy your Sketch e-commerce platform to Render.

## 📋 Prerequisites

1. **Render Account**: Sign up at [render.com](https://render.com)
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **Firebase Project**: Set up and configured
4. **Resend Account**: For email functionality

## 🎯 Deployment Strategy

We'll deploy two separate services:
1. **Main E-commerce App** (sketch-ecommerce)
2. **Admin Panel** (sketch-admin)

## 📝 Step-by-Step Deployment

### Step 1: Prepare Your Repository

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Prepare for Render deployment"
   git push origin main
   ```

2. **Verify these files are in your repository**:
   - `render.yaml` (main app configuration)
   - `shopAdmin/render.yaml` (admin panel configuration)
   - `package.json` (main app)
   - `shopAdmin/package.json` (admin panel)

### Step 2: Deploy Main E-commerce App

1. **Go to Render Dashboard**:
   - Visit [dashboard.render.com](https://dashboard.render.com)
   - Click "New +" → "Static Site"

2. **Connect Repository**:
   - Connect your GitHub account
   - Select your repository
   - Choose the branch (usually `main`)

3. **Configure Build Settings**:
   - **Name**: `sketch-ecommerce`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`
   - **Environment**: `Static Site`

4. **Add Environment Variables**:
   Click "Environment" tab and add these variables:

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

5. **Deploy**:
   - Click "Create Static Site"
   - Wait for build to complete
   - Your app will be available at: `https://sketch-ecommerce.onrender.com`

### Step 3: Deploy Admin Panel

1. **Create Another Static Site**:
   - Click "New +" → "Static Site"
   - Connect the same repository

2. **Configure Build Settings**:
   - **Name**: `sketch-admin`
   - **Root Directory**: `shopAdmin`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`
   - **Environment**: `Static Site`

3. **Add Environment Variables**:
   ```env
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

4. **Deploy**:
   - Click "Create Static Site"
   - Your admin panel will be available at: `https://sketch-admin.onrender.com`

## 🔧 Alternative: Using render.yaml (Recommended)

If you prefer using the configuration files:

### For Main App:
1. Go to Render Dashboard
2. Click "New +" → "Blueprint"
3. Connect your repository
4. Render will automatically detect `render.yaml`
5. Add environment variables in the dashboard
6. Deploy

### For Admin Panel:
1. Create a separate Blueprint deployment
2. Point to `shopAdmin/render.yaml`
3. Add environment variables
4. Deploy

## 🌐 Custom Domains

### Set Up Custom Domain for Main App:
1. Go to your main app service in Render
2. Click "Settings" → "Custom Domains"
3. Add your domain (e.g., `shop.yourdomain.com`)
4. Update DNS records as instructed

### Set Up Custom Domain for Admin:
1. Go to your admin service in Render
2. Click "Settings" → "Custom Domains"
3. Add your domain (e.g., `admin.yourdomain.com`)
4. Update DNS records

## 🔒 Security Considerations

### 1. Environment Variables
- Never commit sensitive data to your repository
- Use Render's environment variable system
- Keep your Firebase and Resend keys secure

### 2. Firebase Configuration
- Update Firebase authorized domains:
  - Add your Render domains
  - Add your custom domains

### 3. CORS Settings
- Update your Firebase Storage CORS rules
- Allow your Render domains

## 📊 Monitoring & Maintenance

### 1. Build Logs
- Monitor build logs for any errors
- Check for dependency issues
- Verify environment variables

### 2. Performance
- Render provides built-in CDN
- Monitor page load times
- Check for optimization opportunities

### 3. Updates
- Render automatically redeploys on git push
- Test changes in development first
- Use feature branches for major updates

## 🐛 Troubleshooting

### Common Issues:

1. **Build Failures**:
   - Check Node.js version compatibility
   - Verify all dependencies are in package.json
   - Check for syntax errors

2. **Environment Variables**:
   - Ensure all variables are set in Render dashboard
   - Check for typos in variable names
   - Verify Firebase configuration

3. **Routing Issues**:
   - Ensure SPA routing is configured
   - Check render.yaml routes configuration
   - Test all routes after deployment

4. **Admin Access**:
   - Verify user has 'Admin' role in Firebase
   - Check authentication providers
   - Test admin panel functionality

## 📈 Performance Optimization

### 1. Build Optimization
- Use production builds
- Enable code splitting
- Optimize images

### 2. Caching
- Leverage Render's CDN
- Configure service worker
- Use browser caching

### 3. Monitoring
- Set up error tracking
- Monitor user analytics
- Track performance metrics

## 🔄 Continuous Deployment

### Automatic Deployments:
- Render automatically deploys on git push
- Use feature branches for testing
- Set up staging environment if needed

### Manual Deployments:
- Use Render dashboard for manual deployments
- Rollback to previous versions if needed
- Monitor deployment status

## 📞 Support

If you encounter issues:
1. Check Render documentation
2. Review build logs
3. Verify configuration
4. Contact Render support if needed

---

**Your Sketch e-commerce platform will be live on Render! 🎉** 