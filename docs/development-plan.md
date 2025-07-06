# Jackson Hole Dining Guide - Development Plan

## Phase 1: Foundation & Claude Code Setup

### Project Structure
```
jackson-hole-dining/
├── docs/
│   ├── engineering-guidelines.md
│   ├── content-strategy.md
│   └── deployment-guide.md
├── src/
│   ├── components/
│   │   ├── shared/          # Reusable UI components
│   │   ├── restaurant/      # Restaurant-specific components
│   │   └── layout/          # Layout components
│   ├── pages/
│   ├── data/
│   │   ├── restaurants.json
│   │   └── categories.json
│   ├── assets/
│   │   ├── images/
│   │   └── icons/
│   └── styles/
├── public/
└── scripts/
    ├── image-optimization.js
    └── data-validation.js
```

### Engineering Guardrails

#### When to Create Reusable Components
- **UI patterns used 3+ times** (buttons, cards, modals)
- **Complex logic that's identical** across pages
- **Data formatting functions** (price display, rating stars)
- **Performance-critical elements** (image optimization, lazy loading)

#### When to Duplicate Code
- **Page-specific layouts** with unique requirements
- **One-off styling** for special sections
- **Context-dependent logic** that might diverge
- **Simple HTML structures** under 10 lines

#### Component Architecture Rules
1. **Single Responsibility**: Each component does one thing well
2. **Prop Validation**: Use TypeScript or PropTypes for all props
3. **Performance First**: Implement lazy loading and image optimization
4. **Accessibility**: ARIA labels, keyboard navigation, semantic HTML
5. **Mobile First**: Design for mobile, enhance for desktop

### Technology Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + CSS Modules for complex animations
- **Images**: Next.js Image component with Cloudinary integration
- **Data**: JSON files → migrate to headless CMS later
- **Deployment**: Vercel (optimal for Next.js)
- **Analytics**: Vercel Analytics (privacy-friendly)

## Phase 2: Core Components Development

### Essential Reusable Components

#### 1. RestaurantCard Component
```typescript
interface RestaurantCardProps {
  restaurant: Restaurant;
  variant: 'featured' | 'list' | 'compact';
  showDistance?: boolean;
  showReservationLink?: boolean;
}
```
**Reusable because**: Used on homepage, category pages, search results (3+ locations)

#### 2. PriceIndicator Component
```typescript
interface PriceIndicatorProps {
  priceLevel: 1 | 2 | 3 | 4;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}
```
**Reusable because**: Consistent pricing display across all restaurant content

#### 3. CategoryFilter Component
```typescript
interface CategoryFilterProps {
  categories: Category[];
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  layout: 'horizontal' | 'vertical';
}
```
**Reusable because**: Used on multiple listing pages with different layouts

#### 4. ImageGallery Component
```typescript
interface ImageGalleryProps {
  images: Image[];
  alt: string;
  aspectRatio?: 'square' | 'landscape' | 'portrait';
  lazy?: boolean;
}
```
**Reusable because**: Restaurant photos, food images, location shots

### Page-Specific Components (Duplicate When Needed)

#### 1. Homepage Hero Section
- **Duplicate**: Unique layout, specific styling, one-off animations
- **Contains**: Custom background, specific CTA placement, unique typography

#### 2. Restaurant Detail Header
- **Duplicate**: Complex layout with restaurant-specific data arrangement
- **Contains**: Hero image, rating, pricing, quick facts, reservation button

#### 3. Category Page Intro
- **Duplicate**: Each category has unique messaging and imagery
- **Contains**: Category description, featured image, activity integration

## Phase 3: Content Strategy Implementation

### Data Structure
```json
{
  "restaurants": [
    {
      "id": "snake-river-brewing",
      "name": "Snake River Brewing",
      "slug": "snake-river-brewing",
      "categories": ["casual-dining", "post-hike-fuel", "local-favorite"],
      "priceLevel": 2,
      "location": {
        "address": "265 S Millward St, Jackson, WY 83001",
        "coordinates": [43.4799, -110.7624],
        "distanceFromPark": "5 miles"
      },
      "dining": {
        "cuisine": "American Brewpub",
        "dietaryOptions": ["vegetarian", "gluten-free"],
        "reservations": "recommended",
        "reservationLink": "https://...",
        "averageMeal": "$15-25"
      },
      "experience": {
        "atmosphere": "Casual, Local Hangout",
        "bestFor": ["Post-Hike Meals", "Casual Dinner", "Groups"],
        "specialties": ["Craft Beer", "Bison Burger", "Nachos"]
      },
      "practical": {
        "hours": {
          "monday": "11:00-22:00",
          "tuesday": "11:00-22:00"
        },
        "phone": "+1-307-739-2337",
        "website": "https://snakeriverbrewing.com"
      },
      "content": {
        "description": "After a long day hiking in Grand Teton, nothing beats...",
        "highlights": ["Locally brewed beer", "Hearty portions", "Patio seating"],
        "tips": ["Try the Zonker Stout", "Arrive early for patio seats"]
      },
      "images": [
        {
          "url": "/images/restaurants/snake-river-brewing/exterior.jpg",
          "alt": "Snake River Brewing exterior with mountain views",
          "caption": "Perfect spot after outdoor adventures"
        }
      ],
      "rating": {
        "overall": 4.2,
        "food": 4.0,
        "service": 4.3,
        "value": 4.5,
        "atmosphere": 4.1
      }
    }
  ]
}
```

### Content Categories (Activity-Based Organization)
1. **Post-Hike Fuel** (Casual, hearty meals)
2. **Celebration Dinners** (Special occasion, upscale)
3. **Quick Park Lunches** (Grab-and-go, picnic-friendly)
4. **Local Favorites** (Authentic Jackson experience)
5. **Adventure Breakfasts** (Early morning, fuel for activities)

## Phase 4: Performance Optimization

### Image Strategy
- **Cloudinary integration** for automatic optimization
- **WebP/AVIF formats** with fallbacks
- **Responsive images** with proper sizing
- **Lazy loading** for all non-critical images
- **Critical images** (hero, first restaurant cards) preloaded

### Data Loading
- **Static generation** for restaurant pages
- **Incremental Static Regeneration** for updating content
- **Client-side filtering** for category pages
- **Prefetching** for likely next pages

### Bundle Optimization
- **Tree shaking** for unused code
- **Code splitting** by routes
- **Critical CSS** inlined
- **Font optimization** with next/font

## Phase 5: Claude Code Integration Strategy

### Initial Setup Commands
```bash
# Project initialization
claude-code init jackson-hole-dining --template next-js-tailwind

# Component generation
claude-code generate component RestaurantCard --props restaurant,variant,showDistance
claude-code generate component PriceIndicator --props priceLevel,showText,size
claude-code generate page restaurant/[slug] --dynamic

# Data management
claude-code generate api restaurants --type json
claude-code generate script optimize-images --batch
```

### Iterative Development Workflow
1. **Generate base components** with Claude Code
2. **Refine styling** and interactions manually
3. **Add content** using Claude Code for data entry
4. **Test and optimize** performance
5. **Deploy and iterate**

### Content Creation Commands
```bash
# Bulk restaurant data entry
claude-code generate data restaurants --from-research "Jackson Hole restaurant research"

# Image optimization
claude-code optimize images --folder restaurants --quality 85 --formats webp,avif

# SEO optimization
claude-code generate meta --pages all --keywords "Jackson Hole dining,Grand Teton restaurants"
```

## Phase 6: Launch Strategy

### Pre-Launch Checklist
- [ ] 30-50 restaurants with complete data
- [ ] All images optimized and responsive
- [ ] Mobile-first design validated
- [ ] Core Web Vitals optimized
- [ ] Accessibility audit completed
- [ ] Analytics and monitoring setup

### Success Metrics
- **Page Load Speed**: < 2 seconds first contentful paint
- **Core Web Vitals**: All green scores
- **Mobile Usability**: 100% mobile-friendly
- **Content Depth**: Average 300+ words per restaurant
- **User Engagement**: 2+ minutes average session duration

### Maintenance Strategy
- **Monthly content updates** using Claude Code
- **Quarterly performance audits**
- **Seasonal menu/hours updates**
- **Annual competitive analysis refresh**

## Getting Started

### Step 1: Environment Setup
```bash
# Initialize project
npx create-next-app@latest jackson-hole-dining --typescript --tailwind --eslint --app

# Install additional dependencies
npm install @vercel/analytics lucide-react

# Setup Claude Code
claude-code setup --project jackson-hole-dining
```

### Step 2: Create Engineering Guidelines
Use Claude Code to generate initial component templates and establish coding standards.

### Step 3: Build Core Components
Start with RestaurantCard and PriceIndicator as your foundation components.

### Step 4: Add Content
Begin with 10-15 restaurants across different categories to validate the structure.

This plan balances rapid development with maintainable architecture, leveraging Claude Code for efficiency while maintaining engineering best practices.