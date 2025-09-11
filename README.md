# ATOM Club Landing Page

A modern, responsive landing page for the ATOM Club built with React, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Modern Design**: Blue & metallic theme with techy aesthetic
- **Responsive**: Mobile-first design that works on all devices
- **Smooth Animations**: Framer Motion powered scroll reveals and interactions
- **Accessible**: Keyboard navigation and screen reader support
- **Performance Optimized**: Fast loading with optimized assets
- **SEO Ready**: Proper meta tags and semantic HTML

## 🛠 Technology Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Advanced animations and interactions
- **Vite** - Fast build tool and development server
- **Lucide React** - Beautiful icon library

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd atom-club-landing
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## 🎨 Customization

### Logo & Assets

Replace the generated images in `src/assets/` with your own:
- `atom-logo.png` - Main ATOM logo
- `hero-background.jpg` - Hero section background
- `coordinator-*.jpg` - Coordinator profile images

### Colors & Theme

The design system is defined in `src/index.css` and `tailwind.config.ts`. Key brand colors:

```css
--atom-primary: 220 100% 52%;    /* #0B63FF */
--atom-metallic: 200 8% 77%;     /* #C0C6C9 */
--electric: 200 100% 75%;        /* Electric accent */
```

### Content

Update the sample content in each component:
- `src/components/About.tsx` - Club description
- `src/components/Achievements.tsx` - Club achievements
- `src/components/Coordinators.tsx` - Team member data
- `src/components/Clubs.tsx` - Sub-clubs information
- `src/components/Contact.tsx` - Contact form

### Animations

Control animations via:
- `prefers-reduced-motion` is automatically supported
- Adjust animation timings in `tailwind.config.ts`
- Modify Framer Motion settings in components

## 🏗 Project Structure

```
src/
├── assets/           # Images and static assets
├── components/       # React components
│   ├── Hero.tsx     # Landing section
│   ├── About.tsx    # About section
│   ├── Achievements.tsx # Achievements grid
│   ├── Coordinators.tsx # Team gallery
│   ├── Clubs.tsx    # Clubs showcase
│   └── Contact.tsx  # Contact form
├── components/ui/    # Reusable UI components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
├── pages/           # Page components
└── index.css        # Global styles & design system
```

## 🎯 Sections Overview

1. **Hero** - Full-screen intro with animated ATOM logo
2. **About** - Club description with scroll animations
3. **Achievements** - Glass-card grid of accomplishments
4. **Coordinators** - Auto-scrolling team gallery with modal profiles
5. **Clubs** - Interactive club cards with detailed views
6. **Contact** - Form with validation and success notifications

## 🚀 Deployment

### Lovable Platform
1. Connect your GitHub repository
2. Click "Publish" in the Lovable interface
3. Your site will be live at `https://your-project.lovable.app`

### Other Platforms
Build the project and deploy the `dist/` folder to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## 🔧 Configuration

### Environment Variables
No environment variables required for basic functionality.

### Browser Support
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## 📱 Mobile Optimization

- Touch-friendly interface
- Responsive breakpoints
- Optimized animations for mobile
- Fast loading on slow connections

## ♿ Accessibility

- Semantic HTML structure
- Keyboard navigation support
- Screen reader compatibility
- High contrast ratios
- Focus indicators
- Reduced motion support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙋‍♂️ Support

For questions or support, please contact:
- Email: support@atomclub.com
- Website: https://atomclub.lovable.app

---

Built with ❤️ by the ATOM Club team