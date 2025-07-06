'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getRestaurants } from '@/lib/restaurants'
import { RestaurantCard } from '@/components/shared/RestaurantCard'
import { CategoryFilter } from '@/components/shared/CategoryFilter'
import { Restaurant } from '@/types/restaurant'
import categoriesData from '@/data/categories.json'
import styles from './page.module.css'

export default function HomePage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadRestaurants() {
      const data = await getRestaurants()
      setRestaurants(data)
      setFilteredRestaurants(data)
      setLoading(false)
    }
    loadRestaurants()
  }, [])

  useEffect(() => {
    if (selectedCategories.length === 0) {
      setFilteredRestaurants(restaurants)
    } else {
      const filtered = restaurants.filter(restaurant => 
        selectedCategories.some(category => 
          restaurant.categories.includes(category)
        )
      )
      setFilteredRestaurants(filtered)
    }
  }, [selectedCategories, restaurants])

  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories)
  }

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingContent}>
          <div className={styles.loadingSpinner}></div>
          <p className={styles.loadingText}>Loading restaurants...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroImageContainer}>
          <Image
            src="/images/tetons-summer.jpg"
            alt="Jackson Hole mountain landscape with outdoor dining"
            fill
            className={styles.heroImage}
            priority
          />
          <div className={styles.heroOverlay}></div>
        </div>
        
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Fuel Your
            <br />
            <span className={styles.heroTitleAccent}>Adventure</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Discover Jackson Hole&apos;s best restaurants, from post-hike fuel to fine dining. 
            Every meal is part of your mountain adventure.
          </p>
          <div className={styles.heroButtons}>
            <Link
              href="#restaurants"
              className={styles.heroButtonPrimary}
            >
              Explore Restaurants
            </Link>
            <Link
              href="#categories"
              className={styles.heroButtonSecondary}
            >
              Find Your Vibe
            </Link>
          </div>
        </div>
        
        <div className={styles.heroScrollIndicator}>
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Adventure Dining Positioning */}
      <section className={styles.aboutSection}>
        <div className={styles.aboutContainer}>
          <div className={styles.aboutHeader}>
            <h2 className={styles.aboutTitle}>
              Where Adventure Meets Exceptional Dining
            </h2>
            <p className={styles.aboutSubtitle}>
              Jackson Hole isn&apos;t just about world-class skiing and hiking—it&apos;s home to an incredible culinary scene 
              that perfectly complements your outdoor adventures.
            </p>
          </div>
          
          <div className={styles.aboutGrid}>
            <div className={styles.aboutCard}>
              <div className={styles.aboutIcon}>🥾</div>
              <h3 className={styles.aboutCardTitle}>Post-Adventure Fuel</h3>
              <p className={styles.aboutCardText}>
                Hearty meals and craft beers to refuel after a day on the mountain or trail.
              </p>
            </div>
            <div className={styles.aboutCard}>
              <div className={styles.aboutIcon}>🍷</div>
              <h3 className={styles.aboutCardTitle}>Elevated Experiences</h3>
              <p className={styles.aboutCardText}>
                Fine dining that rivals any major city, with mountain views as your backdrop.
              </p>
            </div>
            <div className={styles.aboutCard}>
              <div className={styles.aboutIcon}>🏔️</div>
              <h3 className={styles.aboutCardTitle}>Local Flavors</h3>
              <p className={styles.aboutCardText}>
                Authentic Western cuisine and local favorites that capture the spirit of Jackson Hole.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section id="categories" className={styles.categoriesSection}>
        <div className={styles.categoriesContainer}>
          <h2 className={styles.categoriesTitle}>
            Find Your Perfect Dining Experience
          </h2>
          <div className={styles.categoriesFilter}>
            <CategoryFilter
              categories={categoriesData}
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
              layout="horizontal"
            />
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section id="restaurants" className={styles.restaurantsSection}>
        <div className={styles.restaurantsContainer}>
          <div className={styles.restaurantsHeader}>
            <h2 className={styles.restaurantsTitle}>
              {selectedCategories.length > 0 ? 'Filtered Restaurants' : 'Featured Restaurants'}
            </h2>
            <p className={styles.restaurantsSubtitle}>
              {selectedCategories.length > 0 
                ? `Found ${filteredRestaurants.length} restaurants matching your preferences`
                : 'Hand-picked dining experiences that perfectly complement your Jackson Hole adventure'
              }
            </p>
          </div>
          
          {filteredRestaurants.length === 0 ? (
            <div className={styles.noResults}>
              <p className={styles.noResultsText}>
                No restaurants match your selected categories. Try adjusting your filters.
              </p>
            </div>
          ) : (
            <div className={styles.restaurantsGrid}>
              {filteredRestaurants.slice(0, 8).map((restaurant, index) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  variant={index === 0 ? 'featured' : 'list'}
                  showDistance={true}
                  className={index === 0 ? styles.featuredCard : ''}
                />
              ))}
            </div>
          )}
          
          {filteredRestaurants.length > 8 && (
            <div className={styles.viewAllButton}>
              <Link
                href="/restaurants"
                className={styles.viewAllLink}
              >
                View All Restaurants ({filteredRestaurants.length})
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContainer}>
          <h2 className={styles.ctaTitle}>
            Ready to Fuel Your Next Adventure?
          </h2>
          <p className={styles.ctaSubtitle}>
            Whether you&apos;re planning a post-hike meal or celebrating a special occasion, 
            we&apos;ll help you find the perfect dining experience in Jackson Hole.
          </p>
          <div className={styles.ctaButtons}>
            <Link
              href="/restaurants"
              className={styles.ctaButtonPrimary}
            >
              Browse All Restaurants
            </Link>
            <Link
              href="/about"
              className={styles.ctaButtonSecondary}
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}