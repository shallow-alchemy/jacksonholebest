'use client'

import { useState, useEffect } from 'react'
import { getRestaurants } from '@/lib/restaurants'
import { RestaurantCard } from '@/components/shared/RestaurantCard'
import { CategoryFilter } from '@/components/shared/CategoryFilter'
import { Restaurant } from '@/types/restaurant'
import categoriesData from '@/data/categories.json'
import styles from './page.module.css'

export default function RestaurantsPage() {
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
      // Expand group selections to individual categories
      const expandedCategories: string[] = []
      selectedCategories.forEach(category => {
        // Check if it's a group or individual category
        const group = categoriesData.categoryGroups.find(g => g.id === category)
        if (group) {
          expandedCategories.push(...group.categories)
        } else {
          expandedCategories.push(category)
        }
      })

      const filtered = restaurants.filter(restaurant => 
        expandedCategories.some(category => 
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
      {/* Hero Header Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}>
          <div className={styles.heroOverlay}></div>
        </div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>All Restaurants</h1>
          <p className={styles.heroSubtitle}>
            Discover {restaurants.length} amazing dining experiences in Jackson Hole
          </p>
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{restaurants.length}</span>
              <span className={styles.statLabel}>Restaurants</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{categoriesData.categoryGroups.length}</span>
              <span className={styles.statLabel}>Categories</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>5</span>
              <span className={styles.statLabel}>Neighborhoods</span>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.filterSection}>
        <CategoryFilter
          categories={categoriesData}
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoryChange}
          layout="horizontal"
        />
      </div>

      {filteredRestaurants.length === 0 ? (
        <div className={styles.noResults}>
          <p className={styles.noResultsText}>
            No restaurants match your selected categories. Try adjusting your filters.
          </p>
        </div>
      ) : (
        <div className={styles.resultsSection}>
          <p className={styles.resultsCount}>
            Showing {filteredRestaurants.length} {filteredRestaurants.length === 1 ? 'restaurant' : 'restaurants'}
            {selectedCategories.length > 0 && ' matching your filters'}
          </p>
          <div className={styles.restaurantsGrid}>
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                variant="list"
                showDistance={true}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}