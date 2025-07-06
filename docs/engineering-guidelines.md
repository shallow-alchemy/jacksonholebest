# Engineering Guidelines for Claude Code Development

## Core Principles

### 1. Component Reusability Decision Tree
```
Is this UI pattern used in 3+ places?
├── YES → Create reusable component
└── NO → Is the logic complex and identical?
    ├── YES → Create reusable component
    └── NO → Duplicate and customize
```

### 2. File Naming Conventions
```
components/
├── shared/
│   ├── Button.tsx           # PascalCase for components
│   ├── RestaurantCard.tsx   # Descriptive names
│   └── index.ts             # Export barrel
├── restaurant/
│   ├── RestaurantHero.tsx   # Context-specific
│   └── RestaurantMenu.tsx
└── layout/
    ├── Header.tsx
    └── Footer.tsx
```

### 3. Claude Code Command Standards

#### Component Generation
```bash
# Good: Specific and descriptive
claude-code generate component RestaurantCard --props "restaurant: Restaurant, variant: 'featured' | 'list'"

# Bad: Vague or overly generic
claude-code generate component Card --props "data: any"
```

#### Page Generation
```bash
# Good: Clear route structure
claude-code generate page restaurants/[slug] --dynamic --props "restaurant: Restaurant"

# Good: Static pages
claude-code generate page about --static
```

#### Data Management
```bash
# Good: Structured data with validation
claude-code generate api restaurants --validation --typescript

# Good: Batch operations
claude-code generate script validate-restaurant-data --input "src/data/restaurants.json"
```

### 4. Performance Guidelines

#### Image Optimization
```typescript
// Always use Next.js Image component
import Image from 'next/image'

// Good: Responsive with proper sizing
<Image
  src="/restaurants/snake-river-brewing/hero.jpg"
  alt="Snake River Brewing exterior"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="rounded-lg"
  priority={isCritical}
/>

// Bad: No optimization
<img src="/restaurants/snake-river-brewing/hero.jpg" alt="Restaurant" />
```

#### Data Fetching
```typescript
// Good: Static generation for restaurant pages
export async function generateStaticParams() {
  const restaurants = await getRestaurants()
  return restaurants.map((restaurant) => ({
    slug: restaurant.slug,
  }))
}

// Good: ISR for content that updates
export const revalidate = 3600 // 1 hour
```

### 5. TypeScript Standards

#### Define Clear Interfaces
```typescript
interface Restaurant {
  id: string
  name: string
  slug: string
  categories: string[]
  priceLevel: 1 | 2 | 3 | 4
  location: {
    address: string
    coordinates: [number, number]
    distanceFromPark: string
  }
  dining: {
    cuisine: string
    dietaryOptions: string[]
    reservations: 'required' | 'recommended' | 'not-accepted'
    reservationLink?: string
    averageMeal: string
  }
  // ... other properties
}
```

#### Component Props
```typescript
interface RestaurantCardProps {
  restaurant: Restaurant
  variant: 'featured' | 'list' | 'compact'
  showDistance?: boolean
  showReservationLink?: boolean
  className?: string
}
```

### 6. Styling Guidelines

#### Tailwind CSS Standards
```tsx
// Good: Consistent spacing and responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
  <RestaurantCard 
    className="hover:shadow-lg transition-shadow duration-200"
    {...props}
  />
</div>

// Good: Custom CSS for complex animations
<div className="restaurant-card-animate">
  {/* Use CSS modules for complex animations */}
</div>
```

#### Component Styling
```tsx
// Good: Flexible styling with defaults
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  className = '',
  ...props 
}) => {
  const baseClasses = "font-medium rounded-lg transition-colors"
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
  }
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  }
  
  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    />
  )
}
```

### 7. Content Management

#### Restaurant Data Structure
```json
{
  "restaurants": [
    {
      "id": "unique-identifier",
      "name": "Display Name",
      "slug": "url-friendly-name",
      "categories": ["post-hike-fuel", "local-favorite"],
      "content": {
        "description": "Engaging description with adventure context",
        "highlights": ["Key feature 1", "Key feature 2", "Key feature 3"],
        "tips": ["Insider tip 1", "Insider tip 2"]
      },
      "seo": {
        "title": "Restaurant Name | Jackson Hole Dining Guide",
        "description": "Brief description for search results",
        "keywords": ["jackson hole", "dining", "restaurant name"]
      }
    }
  ]
}
```

#### Content Quality Standards
- **Descriptions**: 150-300 words per restaurant
- **Adventure Context**: Connect to outdoor activities
- **Practical Information**: Include pricing, hours, reservations
- **Local Insights**: Add tips only locals would know

### 8. Testing Strategy

#### Component Testing
```typescript
// Good: Test component behavior
import { render, screen } from '@testing-library/react'
import RestaurantCard from './RestaurantCard'

test('displays restaurant name and price level', () => {
  const mockRestaurant = {
    name: 'Snake River Brewing',
    priceLevel: 2,
    // ... other required props
  }
  
  render(<RestaurantCard restaurant={mockRestaurant} variant="list" />)
  
  expect(screen.getByText('Snake River Brewing')).toBeInTheDocument()
  expect(screen.getByText('$$')).toBeInTheDocument()
})
```

#### Integration Testing
```typescript
// Good: Test user flows
test('user can filter restaurants by category', async () => {
  render(<RestaurantList />)
  
  fireEvent.click(screen.getByText('Post-Hike Fuel'))
  
  await waitFor(() => {
    expect(screen.getByText('Snake River Brewing')).toBeInTheDocument()
    expect(screen.queryByText('Fine Dining Restaurant')).not.toBeInTheDocument()
  })
})
```

### 9. SEO Guidelines

#### Meta Tags
```tsx
// Good: Dynamic meta tags
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const restaurant = await getRestaurant(params.slug)
  
  return {
    title: `${restaurant.name} | Jackson Hole Dining Guide`,
    description: `${restaurant.content.description.substring(0, 155)}...`,
    keywords: ['jackson hole', 'dining', restaurant.cuisine.toLowerCase()],
    openGraph: {
      title: restaurant.name,
      description: restaurant.content.description,
      images: [restaurant.images[0]?.url],
    },
  }
}
```

#### Structured Data
```tsx
// Good: Restaurant schema
const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": restaurant.name,
  "address": restaurant.location.address,
  "telephone": restaurant.practical.phone,
  "priceRange": "$".repeat(restaurant.priceLevel),
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": restaurant.rating.overall,
    "ratingCount": restaurant.rating.reviewCount
  }
}
```

### 10. Deployment & Monitoring

#### Environment Variables
```env
# Development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
CLOUDINARY_CLOUD_NAME=your-cloud-name

# Production
NEXT_PUBLIC_SITE_URL=https://jacksonholedining.com
CLOUDINARY_CLOUD_NAME=your-cloud-name
VERCEL_ANALYTICS_ID=your-analytics-id
```

#### Performance Monitoring
```typescript
// Good: Monitor Core Web Vitals
export function reportWebVitals(metric: any) {
  switch (metric.name) {
    case 'CLS':
    case 'FID':
    case 'FCP':
    case 'LCP':
    case 'TTFB':
      // Send to analytics
      break
  }
}
```

## Claude Code Best Practices

### 1. Iterative Development
```bash
# Start with basic structure
claude-code generate component RestaurantCard --basic

# Add functionality iteratively
claude-code enhance RestaurantCard --add-props "showDistance: boolean"
claude-code enhance RestaurantCard --add-styling "hover effects"
claude-code enhance RestaurantCard --add-accessibility "keyboard navigation"
```

### 2. Content Generation
```bash
# Generate restaurant data from research
claude-code generate data restaurants --from-file "research/jackson-hole-restaurants.md"

# Optimize images in batch
claude-code optimize images --folder "public/restaurants" --quality 85

# Generate SEO content
claude-code generate seo --pages "restaurants/*" --keywords "jackson hole dining"
```

### 3. Quality Assurance
```bash
# Validate data structure
claude-code validate data --schema "src/types/restaurant.ts"

# Check accessibility
claude-code audit accessibility --pages "all"

# Performance check
claude-code audit performance --critical-path
```

## Getting Started Checklist

- [ ] Set up Next.js 14 with TypeScript and Tailwind
- [ ] Create component library with shared components
- [ ] Implement restaurant data structure
- [ ] Set up image optimization with Cloudinary
- [ ] Configure SEO and meta tags
- [ ] Add analytics and monitoring
- [ ] Test on mobile devices
- [ ] Optimize Core Web Vitals
- [ ] Deploy to Vercel
- [ ] Set up automated testing

This foundation will ensure your Claude Code development is efficient, maintainable, and high-performing.