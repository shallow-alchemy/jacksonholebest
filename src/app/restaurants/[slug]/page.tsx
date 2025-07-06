import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getRestaurant, getRestaurants } from '@/lib/restaurants'
import { PriceIndicator } from '@/components/shared/PriceIndicator'

interface RestaurantPageProps {
  params: {
    slug: string
  }
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
    title: `${restaurant.name} - Jackson Hole Dining`,
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
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-96 mb-8">
        <Image
          src={restaurant.images[0]?.url || '/images/placeholder-restaurant.svg'}
          alt={restaurant.images[0]?.alt || `${restaurant.name} exterior`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-30" />
        <div className="absolute bottom-6 left-6 text-white">
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-4xl font-bold">{restaurant.name}</h1>
            <PriceIndicator priceLevel={restaurant.priceLevel} />
          </div>
          <p className="text-xl">{restaurant.dining.cuisine}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">About</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {restaurant.content.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Highlights</h3>
                  <ul className="text-gray-700 space-y-1">
                    {restaurant.content.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Insider Tips</h3>
                  <ul className="text-gray-700 space-y-1">
                    {restaurant.content.tips.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2">💡</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Specialties</h2>
              <div className="flex flex-wrap gap-2">
                {restaurant.experience.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Perfect For</h2>
              <div className="flex flex-wrap gap-2">
                {restaurant.experience.bestFor.map((occasion, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {occasion}
                  </span>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-semibold">Rating</span>
                  <div className="flex items-center">
                    <span className="text-yellow-500 text-xl">★</span>
                    <span className="ml-1 text-lg font-bold">{restaurant.rating.overall}</span>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Food:</span>
                    <span>{restaurant.rating.food}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service:</span>
                    <span>{restaurant.rating.service}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Value:</span>
                    <span>{restaurant.rating.value}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Atmosphere:</span>
                    <span>{restaurant.rating.atmosphere}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Average Meal:</span>
                    <span>{restaurant.dining.averageMeal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Reservations:</span>
                    <span className="capitalize">{restaurant.dining.reservations}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Distance:</span>
                    <span>{restaurant.location.distanceFromPark}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Dietary Options</h3>
                <div className="flex flex-wrap gap-1">
                  {restaurant.dining.dietaryOptions.map((option, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs"
                    >
                      {option}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                {restaurant.dining.reservationLink && (
                  <a
                    href={restaurant.dining.reservationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Make Reservation
                  </a>
                )}
                
                <a
                  href={restaurant.practical.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full border border-gray-300 text-gray-700 text-center py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Visit Website
                </a>
                
                <a
                  href={`tel:${restaurant.practical.phone}`}
                  className="block w-full border border-gray-300 text-gray-700 text-center py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Call {restaurant.practical.phone}
                </a>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h3 className="font-semibold mb-2">Location</h3>
                <p className="text-sm text-gray-600 mb-2">{restaurant.location.address}</p>
                <div className="text-xs text-gray-500">
                  📍 {restaurant.location.distanceFromPark} from Grand Teton National Park
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            ← Back to All Restaurants
          </Link>
        </div>
      </div>
    </div>
  )
}