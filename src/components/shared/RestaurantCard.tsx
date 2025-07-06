import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Restaurant } from '@/types/restaurant'
import { PriceIndicator } from './PriceIndicator'
import styles from './RestaurantCard.module.css'

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
  const cardClass = `${styles.card} ${
    variant === 'featured' ? styles.cardFeatured : 
    variant === 'compact' ? styles.cardCompact : ''
  } ${className}`

  const imageClass = `${styles.image} ${
    variant === 'featured' ? styles.imageFeatured :
    variant === 'compact' ? styles.imageCompact : styles.imageList
  }`

  return (
    <div className={cardClass}>
      <Link href={`/restaurants/${restaurant.slug}`}>
        <div className={styles.imageContainer}>
          <Image
            src={restaurant.images[0]?.url || '/images/placeholder-restaurant.svg'}
            alt={restaurant.images[0]?.alt || `${restaurant.name} exterior`}
            width={variant === 'featured' ? 600 : 400}
            height={variant === 'featured' ? 400 : 300}
            className={imageClass}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className={styles.priceIndicator}>
            <PriceIndicator priceLevel={restaurant.priceLevel} />
          </div>
        </div>
        
        <div className={styles.content}>
          <div className={styles.header}>
            <h3 className={styles.title}>{restaurant.name}</h3>
            <div className={styles.rating}>
              <span className={styles.ratingIcon}>★</span>
              <span className={styles.ratingValue}>{restaurant.rating.overall}</span>
            </div>
          </div>
          
          <p className={styles.cuisine}>{restaurant.dining.cuisine}</p>
          
          {showDistance && (
            <p className={styles.distance}>
              📍 {restaurant.location.distanceFromPark} from Grand Teton
            </p>
          )}
          
          <p className={styles.description}>
            {restaurant.content.description}
          </p>
          
          <div className={styles.tags}>
            {restaurant.experience.bestFor.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className={styles.tag}
              >
                {tag}
              </span>
            ))}
          </div>
          
          {showReservationLink && restaurant.dining.reservationLink && (
            <button className={styles.reservationButton}>
              Make Reservation
            </button>
          )}
        </div>
      </Link>
    </div>
  )
}