# 🎯 ATOM Club Platform

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF.svg)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive, modern web platform for ATOM Club featuring a stunning public website and a powerful content management system (CMS). Built with cutting-edge technologies for optimal performance and user experience.

## ✨ Key Highlights

- 🎨 **Modern Design System** - Sleek UI with professional branding
- 📱 **Fully Responsive** - Perfect on all devices and screen sizes
- ⚡ **High Performance** - Optimized loading and smooth interactions
- 🔐 **Admin CMS** - Complete content management system
- 🖼️ **Image Upload** - Drag-and-drop media management
- 🎭 **Smooth Animations** - Engaging user interactions
- ♿ **Accessible** - WCAG compliant with keyboard navigation
- 🚀 **Production Ready** - Deployed and maintained

## 📋 Table of Contents

- [🚀 Features](#-features)
- [🛠 Technology Stack](#-technology-stack)
- [📦 Quick Start](#-quick-start)
- [🔐 CMS Access](#-cms-access)
- [🏗 Project Structure](#-project-structure)
- [🎨 Customization](#-customization)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## 🚀 Features

### 🌐 Public Website Features

- **Hero Section** - Full-screen introduction with animated ATOM branding
- **About Section** - Club description with scroll-triggered animations
- **Achievements Gallery** - Interactive showcase of accomplishments
- **Events Management** - Dynamic banner-style event cards with glassmorphic design
  - Horizontal banner layout with image and content sections
  - Dynamic event type badges (Free/Paid events)
  - Professional card hover effects and animations
  - Responsive design for all screen sizes
- **Team Coordinators** - Auto-scrolling team gallery with detailed profiles
- **Clubs Showcase** - Interactive sub-club cards with detailed information
- **Contact Forms** - Validated contact forms with success notifications
- **Photo Gallery** - Responsive image gallery with lightbox functionality

### 🔧 Content Management System (CMS)

- **Secure Authentication** - Protected admin access with session management
- **Dashboard Overview** - Real-time statistics and content metrics
- **Event Management** - Complete CRUD operations for events
  - Banner-style event cards with proper image handling
  - Event type classification (Free/Paid)
  - Drag-and-drop image uploads
  - Form validation and error handling
- **Gallery Management** - Upload and organize event photos
- **Real-time Updates** - Changes reflect immediately on the public site
- **Events Management** - CRUD operations for event data with image upload
- **Coordinators Management** - Team member profiles with social links
- **Clubs Management** - Complex club data with coordinators and projects
- **Gallery Management** - Drag-and-drop image upload and organization
- **Content Persistence** - Local storage with data synchronization
- **Responsive Admin UI** - Clean, professional admin interface

### 🎨 Design & UX Features

- **Modern UI Components** - Custom-built component library
- **Dark/Light Themes** - Theme switching capability (prepared)
- **Smooth Animations** - Framer Motion powered interactions
- **Glassmorphism Effects** - Modern visual design elements
- **Professional Typography** - Optimized font hierarchy
- **Consistent Branding** - ATOM brand colors and identity

### ⚡ Performance & Technical Features

- **Fast Loading** - Optimized assets and lazy loading
- **SEO Optimized** - Proper meta tags and semantic HTML
- **Mobile First** - Responsive design with touch optimization
- **Type Safety** - Full TypeScript implementation
- **Error Boundaries** - Graceful error handling
- **Build Optimization** - Production-ready bundles

## 🛠 Technology Stack

### Frontend Framework
- **React 18.3.1** - Modern React with concurrent features
- **TypeScript 5.8.3** - Type-safe development
- **Vite 5.4.19** - Fast build tool and dev server

### Styling & UI
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **ShadCN/UI** - Modern component library
- **Framer Motion** - Advanced animations
- **Lucide React** - Beautiful icon library

### State Management & Data
- **React Context** - Authentication state management
- **Local Storage** - Client-side data persistence
- **Custom Hooks** - Reusable state logic
- **Event Management System** - Dynamic event data with banner cards
- **Image Handling** - Optimized event images from EVENTS folder

### Development Tools
- **ESLint** - Code linting and quality
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

### Build & Deployment
- **Vite** - Fast development and building
- **Firebase Hosting** - Production deployment
- **GitHub Actions** - CI/CD pipeline

## 📦 Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **Git** for version control
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dot-Dev-Club/Atom_Standalone.git
   cd Atom_Standalone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```bash
   touch .env
   ```

   Add the following environment variables:
   ```env
   # Backend API Configuration
   VITE_BACKEND_URL=https://battle-of-binaries-api.onrender.com
   ```

   **Environment Variables Explanation:**
   - `VITE_BACKEND_URL`: Base URL for the Battle of Binaries backend API
     - Required for event registration functionality
     - Used by registration forms and API calls
     - Should point to your deployed backend server

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Build for production**
   ```bash
   npm run build
   npm run preview
   ```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🔐 CMS Access

### Admin Login Credentials

- **URL**: `http://localhost:8002/login` (development) or `/login` (production)
- **Username**: `admin`
- **Password**: `atom2025cms`

### CMS Features

1. **Dashboard** - Overview with statistics and quick actions
2. **Events Manager** - Add, edit, delete events with image upload
3. **Coordinators Manager** - Manage team member profiles
4. **Clubs Manager** - Complex club data management
5. **Gallery Manager** - Image upload and organization

### Content Management Guide

1. **Navigate to Admin** - Access `/login` and enter credentials
2. **Dashboard Overview** - View content statistics and quick actions
3. **Manage Content** - Use respective managers for different content types
4. **Upload Images** - Drag-and-drop or browse for image uploads
5. **Save Changes** - All changes are automatically persisted

## 🏗 Project Structure

```
Atom_Standalone/
├── public/                    # Static assets
│   ├── favicon.ico
│   ├── robots.txt
│   └── 404.html
├── public/                    # Static assets served directly
│   ├── EVENTS/              # Event-specific images
│   │   ├── AI_ML Bootcamp.jpg
│   │   ├── Battle of Binaries 1.0.jpg
│   │   ├── CYBERSECURITY Bootcamp.jpg
│   │   └── ... (other event images)
│   ├── favicon.ico
│   ├── robots.txt
│   └── 404.html
├── src/
│   ├── assets/               # Build-time assets
│   │   ├── PHOTOS/          # Gallery images
│   │   ├── HACKHIVE/        # Club-specific images
│   │   ├── UNBIAS/          # Club-specific images
│   │   └── *.jpg/png        # General assets
│   ├── components/
│   │   ├── admin/           # CMS components
│   │   │   ├── EventsManager.tsx
│   │   │   ├── CoordinatorsManager.tsx
│   │   │   ├── ClubsManager.tsx
│   │   │   ├── GalleryManager.tsx
│   │   │   └── ImageUpload.tsx
│   │   ├── events/          # Event-related components
│   │   ├── ui/              # Reusable UI components
│   │   └── *.tsx            # Public website components
│   ├── config/              # Configuration files
│   │   └── admin-credentials.ts
│   ├── constants/           # Static data
│   │   ├── events.ts
│   │   ├── coordinators.ts
│   │   ├── clubs.ts
│   │   └── *.ts
│   ├── contexts/            # React contexts
│   │   └── AuthContext.tsx
│   ├── hooks/               # Custom hooks
│   ├── lib/                 # Utilities
│   ├── pages/               # Page components
│   │   ├── Admin.tsx        # CMS dashboard
│   │   ├── Login.tsx        # Admin login
│   │   └── *.tsx
│   ├── styles/              # CSS files
│   ├── utils/               # Helper functions
│   │   └── dataService.ts
│   ├── App.tsx              # Main app component
│   └── main.tsx             # App entry point
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🎨 Customization

### Content Management

#### Via CMS (Recommended)
1. Access the admin panel at `/login`
2. Use the dashboard to manage all content types
3. Upload images directly through the interface
4. Changes are automatically saved and reflected on the website

#### Manual Customization

**Assets & Images:**
- Replace images in `src/assets/` with your own
- Event images should be placed in `public/EVENTS/` folder
- **Recommended image dimensions for events**: 640×360px (16:9 aspect ratio)
- **Supported formats**: JPG, PNG, WebP
- **File size**: Keep under 200KB for optimal performance
- Update image references in constants files
- Use the CMS for dynamic content updates

**Event Image Guidelines:**
- Use descriptive filenames matching event titles
- Maintain consistent aspect ratio (16:9) for banner cards
- Optimize images for web (80-90% quality)
- Banner layout works best with landscape images
- Place event images in `public/EVENTS/` for direct serving

**Colors & Branding:**
```css
/* src/index.css */
:root {
  --atom-primary: 220 100% 52%;    /* #0B63FF */
  --atom-metallic: 200 8% 77%;     /* #C0C6C9 */
  --electric: 200 100% 75%;        /* Electric accent */
}
```

**Content Updates:**
- Modify constants in `src/constants/` for static content
- Use CMS for dynamic content management
- Update component props for customization

### Advanced Customization

**Component Styling:**
- Modify Tailwind classes in components
- Update design tokens in configuration files
- Customize animations in Framer Motion settings

**Functionality Extensions:**
- Add new CMS sections in `src/components/admin/`
- Extend data models in `src/constants/`
- Create new pages in `src/pages/`

## 🚀 Deployment

### Firebase Hosting (Recommended)

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize project**
   ```bash
   firebase init hosting
   ```

4. **Deploy**
   ```bash
   npm run build
   firebase deploy
   ```

### Other Platforms

#### Vercel
```bash
npm install -g vercel
vercel --prod
```

#### Netlify
```bash
npm run build
# Drag and drop dist/ folder to Netlify dashboard
```

#### GitHub Pages
```bash
npm install -g gh-pages
npm run build
npm run deploy
```

### Environment Setup

**Production Environment Variables:**
```bash
# No environment variables required for basic functionality
# Add custom variables in .env.production
```

**Build Optimization:**
```bash
npm run build  # Creates optimized dist/ folder
```

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Development Process

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Run tests and linting**
   ```bash
   npm run lint
   npm run build
   ```
5. **Commit your changes**
   ```bash
   git commit -m "Add: Your feature description"
   ```
6. **Push to your branch**
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Create a Pull Request**

### Code Standards

- **TypeScript** - Strict type checking enabled
- **ESLint** - Follow provided linting rules
- **Prettier** - Consistent code formatting
- **Semantic Commits** - Use conventional commit messages

### Testing

- Test all features in multiple browsers
- Verify mobile responsiveness
- Check accessibility with screen readers
- Validate forms and user interactions

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support & Contact

### For Technical Support
- **GitHub Issues**: [Report bugs or request features](https://github.com/dot-Dev-Club/Atom_Standalone/issues)
- **Documentation**: Check this README and inline code comments

### For ATOM Club
- **Website**: [Visit ATOM Club](https://atomclub.lovable.app)
- **Email**: contact@atomclub.com
- **LinkedIn**: [ATOM Club Official](https://linkedin.com/company/atom-club)

### Development Team
Built with ❤️ by the ATOM Club development team at Karunya Institute of Technology and Sciences.

---

**🎓 Proudly developed by students, for students - ATOM Club, Karunya Institute of Technology and Sciences**
