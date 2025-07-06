import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Restaurant } from '@/types/restaurant'
import { PriceIndicator } from './PriceIndicator'

interface RestaurantCardProps {
  restaurant: Restaurant
  variant?: 'featured' | 'list' | 'compact'
  showDistance?: boolean
  showReservationLink?: boolean
  className?: string
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  variant = 'list',
  showDistance = false,
  showReservationLink = false,
  className = ''
}) => {
  const cardClasses = {
    featured: 'bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300',
    list: 'bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200',
    compact: 'bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200'
  }

  const imageClasses = {
    featured: 'w-full h-64 object-cover',
    list: 'w-full h-48 object-cover',
    compact: 'w-full h-32 object-cover'
  }

  return (
    <div className={`${cardClasses[variant]} ${className}`}>
      <Link href={`/restaurants/${restaurant.slug}`}>
        <div className="relative">
          <Image
            src={restaurant.images[0]?.url || '/images/placeholder-restaurant.svg'}
            alt={restaurant.images[0]?.alt || `${restaurant.name} exterior`}
            width={variant === 'featured' ? 600 : 400}
            height={variant === 'featured' ? 400 : 300}
            className={imageClasses[variant]}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-4 left-4">
            <PriceIndicator priceLevel={restaurant.priceLevel} />
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-900">{restaurant.name}</h3>
            <div className="flex items-center">
              <span className="text-yellow-500">★</span>
              <span className="ml-1 text-sm text-gray-600">{restaurant.rating.overall}</span>
            </div>
          </div>
          
          <p className="text-gray-600 mb-2">{restaurant.dining.cuisine}</p>
          
          {showDistance && (
            <p className="text-sm text-gray-500 mb-2">
              📍 {restaurant.location.distanceFromPark} from Grand Teton
            </p>
          )}
          
          <p className="text-gray-700 mb-4 line-clamp-2">
            {restaurant.content.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {restaurant.experience.bestFor.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {showReservationLink && restaurant.dining.reservationLink && (
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Make Reservation
            </button>
          )}
        </div>
      </Link>
    </div>
  )
}