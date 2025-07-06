import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getRestaurant, getRestaurants } from '@/lib/restaurants'
import { PriceIndicator } from '@/components/shared/PriceIndicator'
import styles from './page.module.css'

interface RestaurantPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const restaurants = await getRestaurants()
  
  return restaurants.map((restaurant) => ({
    slug: restaurant.slug,
  }))
}

export async function generateMetadata({ params }: RestaurantPageProps) {
  const { slug } = await params
  const restaurant = await getRestaurant(slug)
  
  if (!restaurant) {
    return {
      title: 'Restaurant Not Found',
    }
  }

  return {
    title: `${restaurant.name} | Jackson Hole Dining Guide`,
    description: restaurant.content.description,
  }
}

export default async function RestaurantPage({ params }: RestaurantPageProps) {
  const { slug } = await params
  const restaurant = await getRestaurant(slug)

  if (!restaurant) {
    notFound()
  }

  return (
    <div className={styles.container}>
      <div className={styles.heroSection}>
        <Image
          src={restaurant.images[0]?.url || '/images/placeholder-restaurant.svg'}
          alt={restaurant.images[0]?.alt || `${restaurant.name} exterior`}
          fill
          className={styles.heroImage}
          priority
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <div className={styles.heroHeader}>
            <h1 className={styles.heroTitle}>{restaurant.name}</h1>
            <PriceIndicator priceLevel={restaurant.priceLevel} />
          </div>
          <p className={styles.heroCuisine}>{restaurant.dining.cuisine}</p>
        </div>
      </div>

      <div className={styles.content}>
        <Link href="/" className={styles.backLink}>
          <span className={styles.backIcon}>←</span>
          Back to restaurants
        </Link>

        <div className={styles.grid}>
          <div className={styles.mainContent}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>About</h2>
              <p className={styles.description}>
                {restaurant.content.description}
              </p>
              
              {restaurant.content.highlights && restaurant.content.highlights.length > 0 && (
                <ul className={styles.highlights}>
                  {restaurant.content.highlights.map((highlight, index) => (
                    <li key={index} className={styles.highlight}>
                      {highlight}
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {restaurant.content.tips && restaurant.content.tips.length > 0 && (
              <section className={styles.section}>
                <div className={styles.tips}>
                  <h3 className={styles.tipsTitle}>Insider Tips</h3>
                  <ul className={styles.tipsList}>
                    {restaurant.content.tips.map((tip, index) => (
                      <li key={index} className={styles.tip}>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}
          </div>

          <div className={styles.sidebar}>
            <div className={styles.infoCard}>
              <h3 className={styles.sectionTitle}>Restaurant Info</h3>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <div className={styles.infoLabel}>Cuisine</div>
                  <div className={styles.infoValue}>{restaurant.dining.cuisine}</div>
                </div>
                
                <div className={styles.infoItem}>
                  <div className={styles.infoLabel}>Price Range</div>
                  <div className={styles.infoValue}>{restaurant.dining.averageMeal}</div>
                </div>
                
                <div className={styles.infoItem}>
                  <div className={styles.infoLabel}>Location</div>
                  <div className={styles.infoValue}>
                    {restaurant.location.address}
                    <br />
                    <small>{restaurant.location.distanceFromPark} from Grand Teton</small>
                  </div>
                </div>
                
                <div className={styles.infoItem}>
                  <div className={styles.infoLabel}>Best For</div>
                  <div className={styles.infoValue}>
                    {restaurant.experience.bestFor.join(', ')}
                  </div>
                </div>
                
                <div className={styles.infoItem}>
                  <div className={styles.infoLabel}>Atmosphere</div>
                  <div className={styles.infoValue}>{restaurant.experience.atmosphere}</div>
                </div>
                
                <div className={styles.infoItem}>
                  <div className={styles.infoLabel}>Reservations</div>
                  <div className={styles.infoValue}>
                    {restaurant.dining.reservations === 'required' ? 'Required' :
                     restaurant.dining.reservations === 'recommended' ? 'Recommended' :
                     'Not accepted'}
                  </div>
                </div>
                
                {restaurant.practical?.phone && (
                  <div className={styles.infoItem}>
                    <div className={styles.infoLabel}>Phone</div>
                    <div className={styles.infoValue}>
                      <a href={`tel:${restaurant.practical.phone}`}>
                        {restaurant.practical.phone}
                      </a>
                    </div>
                  </div>
                )}
              </div>
              
              {restaurant.dining.reservationLink && (
                <a
                  href={restaurant.dining.reservationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.reservationButton}
                >
                  Make Reservation
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}