# Operativ Media - News Website

A modern, responsive news website built with Next.js, TypeScript, and Tailwind CSS for Operativ Media.

## Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with smooth animations
- **Interactive Components**: 
  - Hero carousel with navigation
  - Collapsible news feed sidebar
  - Video news section with play overlays
  - Photo gallery with navigation
- **News Categories**: Politics, Economy, Sports, Culture, World news, and more
- **Real-time News Feed**: Live news updates with timestamps
- **Social Media Integration**: Footer with social media links

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Font**: Inter (Google Fonts)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/
│   ├── Header.tsx           # Navigation header
│   ├── Footer.tsx           # Footer with social links
│   ├── NewsFeed.tsx         # Left sidebar news feed
│   ├── SelectedNews.tsx     # Right sidebar selected news
│   ├── HeroSection.tsx      # Main hero carousel
│   ├── NewsSection.tsx      # Reusable news sections
│   └── PhotoGallery.tsx     # Photo gallery component
```

## Components

### Header
- Logo with navigation menu
- Mobile-responsive hamburger menu
- Search functionality

### Hero Section
- Featured news carousel
- Navigation arrows and pagination dots
- Category tags and timestamps

### Sidebars
- **Left**: Live news feed with timestamps and verification badges
- **Right**: Selected/featured news with thumbnails

### News Sections
- Categorized news (Politics, Economy, Sports, etc.)
- Video news with play button overlays
- Navigation controls for pagination

### Footer
- Company logo and copyright
- Social media links
- Footer navigation

## Customization

The website uses a consistent color scheme:
- Primary: Blue (#2563eb)
- Secondary: Gray tones
- Accent: Green and Red for tags
- Background: White with light gray sections

## Deployment

The project is ready for deployment on platforms like Vercel, Netlify, or any Node.js hosting service.

```bash
npm run build
npm start
```

## License

© 2025 Operativ Media. All rights reserved.