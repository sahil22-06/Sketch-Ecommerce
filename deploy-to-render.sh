#!/bin/bash

# 🚀 Render Deployment Script for Sketch E-Commerce
# This script helps prepare your project for Render deployment

echo "🚀 Preparing Sketch E-commerce for Render deployment..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please initialize git first:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    exit 1
fi

# Check if remote is set
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "❌ No remote repository found. Please add your GitHub repository:"
    echo "   git remote add origin https://github.com/yourusername/sketch-ecommerce.git"
    exit 1
fi

# Check if render.yaml exists
if [ ! -f "render.yaml" ]; then
    echo "❌ render.yaml not found. Please create it first."
    exit 1
fi

# Check if shopAdmin/render.yaml exists
if [ ! -f "shopAdmin/render.yaml" ]; then
    echo "❌ shopAdmin/render.yaml not found. Please create it first."
    exit 1
fi

echo "✅ Configuration files found"

# Build the project to check for errors
echo "🔨 Building main application..."
if npm run build; then
    echo "✅ Main app builds successfully"
else
    echo "❌ Main app build failed. Please fix the errors first."
    exit 1
fi

# Build admin panel
echo "🔨 Building admin panel..."
cd shopAdmin
if npm run build; then
    echo "✅ Admin panel builds successfully"
else
    echo "❌ Admin panel build failed. Please fix the errors first."
    exit 1
fi
cd ..

# Check for environment variables
echo "🔍 Checking for environment variables..."
if [ -f ".env" ]; then
    echo "✅ .env file found"
else
    echo "⚠️  No .env file found. You'll need to set environment variables in Render dashboard."
fi

# Commit and push changes
echo "📤 Committing and pushing changes..."
git add .
git commit -m "Prepare for Render deployment"
git push origin main

echo ""
echo "🎉 Deployment preparation complete!"
echo ""
echo "📋 Next steps:"
echo "1. Go to https://dashboard.render.com"
echo "2. Create a new Static Site"
echo "3. Connect your GitHub repository"
echo "4. Configure build settings:"
echo "   - Build Command: npm install && npm run build"
echo "   - Publish Directory: build"
echo "5. Add environment variables in Render dashboard"
echo "6. Deploy!"
echo ""
echo "📖 For detailed instructions, see RENDER_DEPLOYMENT.md"
echo ""
echo "🔗 Your app will be available at: https://your-app-name.onrender.com" 