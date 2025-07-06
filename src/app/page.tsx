'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getRestaurants } from '@/lib/restaurants'
import { RestaurantCard } from '@/components/shared/RestaurantCard'
import { CategoryFilter } from '@/components/shared/CategoryFilter'
import { Restaurant } from '@/types/restaurant'
import categoriesData from '@/data/categories.json'

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading restaurants...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-jackson-hole.jpg"
            alt="Jackson Hole mountain landscape with outdoor dining"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl px-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Fuel Your
            <br />
            <span className="text-orange-400">Adventure</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover Jackson Hole's best restaurants, from post-hike fuel to fine dining. 
            Every meal is part of your mountain adventure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#restaurants"
              className="bg-orange-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              Explore Restaurants
            </Link>
            <Link
              href="#categories"
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
            >
              Find Your Vibe
            </Link>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Adventure Dining Positioning */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Where Adventure Meets Exceptional Dining
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Jackson Hole isn't just about world-class skiing and hiking—it's home to an incredible culinary scene 
              that perfectly complements your outdoor adventures.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🥾</div>
              <h3 className="text-xl font-semibold mb-2">Post-Adventure Fuel</h3>
              <p className="text-gray-600">
                Hearty meals and craft beers to refuel after a day on the mountain or trail.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🍷</div>
              <h3 className="text-xl font-semibold mb-2">Elevated Experiences</h3>
              <p className="text-gray-600">
                Fine dining that rivals any major city, with mountain views as your backdrop.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🏔️</div>
              <h3 className="text-xl font-semibold mb-2">Local Flavors</h3>
              <p className="text-gray-600">
                Authentic Western cuisine and local favorites that capture the spirit of Jackson Hole.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section id="categories" className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            Find Your Perfect Dining Experience
          </h2>
          <div className="flex justify-center">
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
      <section id="restaurants" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {selectedCategories.length > 0 ? 'Filtered Restaurants' : 'Featured Restaurants'}
            </h2>
            <p className="text-xl text-gray-600">
              {selectedCategories.length > 0 
                ? `Found ${filteredRestaurants.length} restaurants matching your preferences`
                : 'Hand-picked dining experiences that perfectly complement your Jackson Hole adventure'
              }
            </p>
          </div>
          
          {filteredRestaurants.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No restaurants match your selected categories. Try adjusting your filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRestaurants.slice(0, 8).map((restaurant, index) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  variant={index === 0 ? 'featured' : 'list'}
                  showDistance={true}
                  className={index === 0 ? 'md:col-span-2 lg:col-span-1' : ''}
                />
              ))}
            </div>
          )}
          
          {filteredRestaurants.length > 8 && (
            <div className="text-center mt-12">
              <Link
                href="/restaurants"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                View All Restaurants ({filteredRestaurants.length})
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Fuel Your Next Adventure?
          </h2>
          <p className="text-xl text-white mb-8 opacity-90">
            Whether you're planning a post-hike meal or celebrating a special occasion, 
            we'll help you find the perfect dining experience in Jackson Hole.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/restaurants"
              className="bg-white text-orange-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Browse All Restaurants
            </Link>
            <Link
              href="/about"
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-orange-500 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}