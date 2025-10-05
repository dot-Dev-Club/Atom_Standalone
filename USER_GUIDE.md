# 📚 ATOM Club Platform - Complete User Guide

[![Version](https://img.shields.io/badge/Version-2.0-blue.svg)](https://github.com/dot-Dev-Club/Atom_Standalone)
[![Last Updated](https://img.shields.io/badge/Last_Updated-October_2025-green.svg)](#)
[![Platform](https://img.shields.io/badge/Platform-Web-orange.svg)](#)

Welcome to the comprehensive user guide for the ATOM Club Platform - a modern, feature-rich website designed for tech clubs and organizations. This guide covers everything from basic navigation to advanced content management.

---

## 📋 Table of Contents

1. [🌟 Getting Started](#-getting-started)
2. [🧭 Website Navigation](#-website-navigation)
3. [📱 Public Website Features](#-public-website-features)
4. [🔐 Admin Panel (CMS)](#-admin-panel-cms)
5. [📊 Content Management](#-content-management)
6. [🖼️ Image Management](#️-image-management)
7. [🎨 Customization Guide](#-customization-guide)
8. [⚙️ Troubleshooting](#️-troubleshooting)
9. [📞 Support & Contact](#-support--contact)

---

## 🌟 Getting Started

### System Requirements
- **Modern Web Browser**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Internet Connection**: Stable connection for optimal performance
- **Screen Resolution**: 320px+ width (mobile-first design)
- **JavaScript**: Must be enabled

### First Time Access
1. **Public Website**: Navigate to your website URL (e.g., `https://your-atom-club.com`)
2. **Admin Panel**: Access via `/login` route (e.g., `https://your-atom-club.com/login`)
3. **Default Admin Credentials**:
   - Username: `admin`
   - Password: `atom2025cms`

> ⚠️ **Security Note**: Change default credentials immediately after first login

---

## 🧭 Website Navigation

### Main Navigation Menu
The website features a sleek, floating navigation bar with glassmorphic design:

#### Primary Navigation Links:
- **🏠 Home**: Main landing page with all sections
- **📅 Events**: Dedicated events page with upcoming and past events
- **🖼️ Gallery**: Full photo gallery with lightbox functionality

#### Navigation Features:
- **Responsive Design**: Adapts to all screen sizes
- **Active State Indicators**: Current page highlighted with gradient
- **Smooth Animations**: Fluid transitions between pages
- **Accessibility**: Keyboard navigation support

### URL Structure
```
https://your-website.com/           # Home page
https://your-website.com/events     # Events page
https://your-website.com/full-gallery  # Photo gallery
https://your-website.com/login      # Admin login
https://your-website.com/admin      # Admin dashboard
```

---

## 📱 Public Website Features

### 🏠 Home Page Sections

#### 1. Hero Section
- **Full-screen Impact**: Animated ATOM branding with 3D effects
- **Dynamic Background**: Floating particles and gradient animations
- **Call-to-Action**: Primary action buttons for engagement
- **Responsive**: Adapts perfectly to mobile and desktop

#### 2. About Section
- **Club Introduction**: Mission, vision, and values
- **Scroll Animations**: Content reveals on scroll
- **Professional Layout**: Clean, organized information presentation

#### 3. Achievements Gallery
- **Interactive Showcase**: Hover effects and animations
- **Award Display**: Visual representation of accomplishments
- **Expandable Cards**: Click to view detailed information

#### 4. Events Preview
- **Banner-Style Cards**: Horizontal layout with images and details
- **Event Categories**: Free and Paid event badges
- **Quick Actions**: "View Details" and registration buttons
- **Real-time Updates**: Automatic sync with CMS data

#### 5. Team Coordinators
- **Auto-scrolling Gallery**: Infinite scroll showcase
- **Profile Cards**: Photos, names, and roles
- **Social Links**: Direct links to coordinator profiles
- **Hover Effects**: Interactive card animations

#### 6. Clubs Showcase
- **Sub-club Information**: Detailed club descriptions
- **Project Highlights**: Current and past projects
- **Coordinator Assignments**: Team leads for each club
- **Interactive Cards**: Expandable content areas

#### 7. Photo Gallery Section
- **Grid Layout**: Responsive image grid
- **Lightbox Feature**: Full-screen image viewing
- **Navigation Controls**: Previous/next image browsing
- **Zoom Functionality**: Detailed image inspection

#### 8. Contact Section
- **Contact Forms**: Validated input fields
- **EmailJS Integration**: Direct email sending
- **Success Notifications**: Confirmation messages
- **Social Media Links**: Direct platform connections

### 📅 Events Page

#### Event Display Features:
- **Upcoming Events**: Featured prominently at the top
- **Past Events**: Timeline-style historical view
- **Event Cards**: Banner-style with image and details
- **Modal Windows**: Detailed event information popup
- **Registration Integration**: Direct registration links

#### Event Card Information:
- **Event Title**: Clear, descriptive names
- **Date & Time**: Formatted date/time display
- **Location**: Venue information
- **Event Type**: Free/Paid badges
- **Description**: Brief event overview
- **Registration Status**: Available spots indicator

#### Event Interaction:
- **Click to Expand**: Detailed modal view
- **Registration Buttons**: Direct action links
- **Share Options**: Social media sharing
- **Calendar Integration**: Add to calendar functionality

### 🖼️ Full Photo Gallery

#### Gallery Features:
- **Category Filtering**: Filter by event type or date
- **Grid Layout**: Responsive masonry grid
- **Lazy Loading**: Optimized image loading
- **Search Functionality**: Find specific images
- **Bulk Actions**: Select multiple images

#### Lightbox Viewer:
- **Full-Screen Mode**: Immersive viewing experience
- **Navigation**: Keyboard and mouse controls
- **Zoom Controls**: Pinch-to-zoom on mobile
- **Image Information**: Captions and metadata
- **Download Options**: High-resolution downloads

---

## 🔐 Admin Panel (CMS)

### Login Process
1. Navigate to `/login`
2. Enter credentials:
   - **Username**: `admin`
   - **Password**: `atom2025cms`
3. Click "Sign In"
4. Automatic redirect to admin dashboard

#### Login Security Features:
- **Session Management**: Secure user sessions
- **Auto-logout**: Timeout after inactivity
- **Protected Routes**: Unauthorized access prevention
- **Error Handling**: Clear error messages

### Admin Dashboard Overview

#### Dashboard Statistics:
- **Total Events**: Current event count
- **Coordinators**: Team member count
- **Active Clubs**: Number of sub-clubs
- **Gallery Images**: Total image count

#### Quick Actions Grid:
- **Events Manager**: Direct access to event management
- **Coordinators Manager**: Team member administration
- **Clubs Manager**: Club information management
- **Gallery Manager**: Image upload and organization

#### Navigation Sidebar:
- **Dashboard**: Overview and statistics
- **Events**: Complete event management
- **Coordinators**: Team member profiles
- **Clubs**: Sub-club information
- **Gallery**: Image library management

---

## 📊 Content Management

### 📅 Events Manager

#### Adding New Events:
1. Click "Add New Event" button
2. Fill required fields:
   - **Title**: Event name (required)
   - **Description**: Detailed description
   - **Date**: Event date picker
   - **Time**: Start time selection
   - **Location**: Venue information
   - **Type**: Free or Paid selection
   - **Registration Type**: Internal or External
3. Upload event image (recommended: 640×360px)
4. Save changes

#### Event Management Features:
- **Drag-and-Drop Image Upload**: Easy image addition
- **Form Validation**: Prevents incomplete entries
- **Real-time Preview**: See changes immediately
- **Bulk Actions**: Select multiple events
- **Status Management**: Published/Draft states

#### Event Card Layout:
Events display in banner-style cards with:
- **Left Side**: Event image (16:9 aspect ratio)
- **Right Side**: Event details and action buttons
- **Responsive Design**: Stacks vertically on mobile
- **Glassmorphic Effects**: Modern visual styling

### 👥 Coordinators Manager

#### Adding Team Members:
1. Access Coordinators Manager
2. Click "Add New Coordinator"
3. Complete profile information:
   - **Name**: Full name
   - **Role**: Position or title
   - **Bio**: Brief description
   - **Email**: Contact email
   - **Social Links**: LinkedIn, GitHub, etc.
4. Upload profile photo
5. Save coordinator profile

#### Profile Management:
- **Photo Upload**: Drag-and-drop or browse
- **Social Integration**: Direct platform links
- **Role Assignment**: Position hierarchy
- **Contact Information**: Multiple contact methods

### 🏢 Clubs Manager

#### Club Information Management:
1. Select club to edit
2. Update club details:
   - **Club Name**: Official club name
   - **Description**: Mission and activities
   - **Coordinators**: Assign team leads
   - **Projects**: Current and past projects
   - **Meeting Schedule**: Regular meeting times
3. Save changes

#### Club Features:
- **Multiple Coordinators**: Assign multiple leads
- **Project Tracking**: Current and completed projects
- **Resource Management**: Club-specific assets
- **Activity Logs**: Club event history

### 🖼️ Gallery Manager

#### Image Upload Process:
1. Access Gallery Manager
2. Select "Upload Images"
3. Choose upload method:
   - **Drag-and-Drop**: Multiple file support
   - **Browse Files**: Traditional file selection
4. Add image metadata:
   - **Captions**: Descriptive text
   - **Categories**: Event or general
   - **Tags**: Searchable keywords
5. Upload and organize

#### Gallery Organization:
- **Category System**: Organize by events/general
- **Bulk Operations**: Select multiple images
- **Search Functionality**: Find specific images
- **Metadata Management**: Edit captions and tags

---

## 🖼️ Image Management

### Image Requirements

#### Event Images:
- **Recommended Size**: 640×360px (16:9 aspect ratio)
- **File Formats**: JPG, PNG, WebP
- **File Size**: Under 200KB for optimal loading
- **Quality**: 80-90% compression recommended

#### Profile Images:
- **Size**: 300×300px (1:1 aspect ratio)
- **Format**: JPG or PNG
- **File Size**: Under 100KB
- **Background**: Professional appearance

#### Gallery Images:
- **Variable Sizes**: Supports multiple dimensions
- **Max File Size**: 5MB per image
- **Formats**: JPG, PNG, WebP, GIF
- **Quality**: High resolution for downloads

### Image Optimization Tips:
1. **Compress Images**: Use tools like TinyPNG
2. **Proper Dimensions**: Follow recommended sizes
3. **Descriptive Filenames**: Use clear, descriptive names
4. **Alt Text**: Add accessibility descriptions
5. **Web Formats**: Prefer WebP for better compression

### Image Storage Structure:
```
public/EVENTS/              # Event-specific images
├── AI_ML Bootcamp.jpg
├── Battle of Binaries 1.0.jpg
├── CYBERSECURITY Bootcamp.jpg
└── ...

src/assets/PHOTOS/          # Gallery images
├── Event photos
├── Team photos
└── Activity images

src/assets/HACKHIVE/        # Club-specific images
src/assets/UNBIAS/          # Club-specific images
```

---

## 🎨 Customization Guide

### Visual Customization

#### Brand Colors:
The platform uses CSS custom properties for theming:
```css
:root {
  --atom-primary: 220 100% 52%;    /* Primary blue */
  --atom-metallic: 200 8% 77%;     /* Metallic accent */
  --electric: 200 100% 75%;        /* Electric cyan */
}
```

#### Typography:
- **Headings**: Gradient text effects with brand colors
- **Body Text**: Optimized readability with proper contrast
- **UI Elements**: Consistent font weights and sizes

#### Component Styling:
- **Glass Cards**: Glassmorphic design elements
- **Buttons**: Multiple variants (primary, outline, ghost)
- **Animations**: Smooth transitions and hover effects

### Content Customization

#### Via Admin Panel (Recommended):
1. Login to admin panel
2. Navigate to appropriate manager
3. Edit content directly through forms
4. Changes reflect immediately on website

#### Manual Customization:
For developers who need direct file access:

**Static Content Files:**
- `src/constants/events.ts` - Event data
- `src/constants/coordinators.ts` - Team member data
- `src/constants/clubs.ts` - Club information

**Component Modification:**
- `src/components/` - Individual UI components
- `src/pages/` - Page-level components
- `src/styles/` - Custom CSS files

### Advanced Customization:

#### Adding New Sections:
1. Create component in `src/components/`
2. Import and add to page components
3. Update navigation if needed
4. Add corresponding CMS manager if dynamic

#### Theme Modifications:
1. Update CSS variables in `src/index.css`
2. Modify Tailwind config in `tailwind.config.ts`
3. Update component classes as needed
4. Test across all pages and components

---

## ⚙️ Troubleshooting

### Common Issues

#### 🔐 Login Problems:
**Issue**: Cannot access admin panel
**Solutions**:
- Verify correct URL: `your-website.com/login`
- Check credentials: `admin` / `atom2025cms`
- Clear browser cache and cookies
- Try incognito/private browsing mode

#### 🖼️ Image Display Issues:
**Issue**: Images not showing on website
**Solutions**:
- Check image file format (JPG, PNG, WebP)
- Verify file size (under recommended limits)
- Ensure proper file path structure
- Clear browser cache
- Check browser console for errors

#### 📱 Mobile Display Problems:
**Issue**: Layout breaks on mobile devices
**Solutions**:
- Force refresh the page
- Clear mobile browser cache
- Check internet connection
- Update mobile browser to latest version

#### ⚡ Performance Issues:
**Issue**: Slow loading times
**Solutions**:
- Optimize image file sizes
- Clear browser cache
- Check internet connection speed
- Disable browser extensions temporarily

### Browser Compatibility

#### Supported Browsers:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

#### Known Issues:
- Internet Explorer: Not supported
- Older mobile browsers: Limited functionality
- Disabled JavaScript: Site will not function

### Error Messages

#### Common Error Codes:
- **404 Not Found**: Page doesn't exist - check URL
- **403 Forbidden**: Access denied - check login status
- **500 Server Error**: Server issue - contact administrator
- **Network Error**: Connection problem - check internet

### Data Recovery

#### Lost Admin Access:
1. Contact website administrator
2. Request password reset
3. Check browser saved passwords
4. Try default credentials if recently installed

#### Missing Content:
1. Check if logged into admin panel
2. Verify content wasn't accidentally deleted
3. Check browser local storage
4. Contact technical support

---

## 📞 Support & Contact

### Technical Support

#### For Website Issues:
- **GitHub Issues**: [Report bugs or request features](https://github.com/dot-Dev-Club/Atom_Standalone/issues)
- **Documentation**: Check this guide and inline code comments
- **Email**: technical-support@atomclub.com

#### For Content Management:
- **User Guide**: This document covers most scenarios
- **Admin Training**: Contact for personalized training sessions
- **Quick Help**: Check tooltips in admin panel

### ATOM Club Contact

#### Official Channels:
- **Website**: [ATOM Club Official](https://atomclub.lovable.app)
- **Email**: contact@atomclub.com
- **LinkedIn**: [ATOM Club Official](https://linkedin.com/company/atom-club)
- **Location**: Karunya Institute of Technology and Sciences

#### Development Team:
- **Built by**: ATOM Club Development Team
- **Institution**: Karunya Institute of Technology and Sciences
- **Project Type**: Student-led development initiative

### Quick Reference

#### Essential URLs:
```
Main Website:    https://your-website.com/
Events Page:     https://your-website.com/events
Photo Gallery:   https://your-website.com/full-gallery
Admin Login:     https://your-website.com/login
Admin Panel:     https://your-website.com/admin
```

#### Default Credentials:
```
Username: admin
Password: atom2025cms
```

#### Emergency Contacts:
- **Website Down**: Contact hosting provider
- **Admin Access Lost**: Contact system administrator
- **Critical Bug**: Create GitHub issue with "urgent" label

---

## 📋 Quick Start Checklist

### For New Users:
- [ ] Access website URL and explore public pages
- [ ] Test navigation between different sections
- [ ] View events and photo gallery
- [ ] Login to admin panel with provided credentials
- [ ] Explore dashboard and different managers
- [ ] Change default admin password
- [ ] Add first piece of content (event or coordinator)
- [ ] Verify changes appear on public website

### For Content Managers:
- [ ] Master all CMS sections (Events, Coordinators, Clubs, Gallery)
- [ ] Understand image requirements and optimization
- [ ] Practice adding, editing, and deleting content
- [ ] Learn bulk operations for efficiency
- [ ] Set up regular content update schedule
- [ ] Create backup plan for important content

### For Administrators:
- [ ] Review all security settings
- [ ] Set up regular backup procedures
- [ ] Monitor website performance
- [ ] Plan content strategy and guidelines
- [ ] Train content managers
- [ ] Establish update and maintenance schedule

---

**🎓 Developed with ❤️ by ATOM Club - Empowering students through technology**

---

*Last Updated: October 2025 | Version 2.0 | For support, contact technical-support@atomclub.com*