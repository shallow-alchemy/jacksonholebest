import { Restaurant } from '@/types/restaurant'
import restaurantsData from '@/data/restaurants.json'

export async function getRestaurants(): Promise<Restaurant[]> {
  // Parse and validate the restaurant data
  return restaurantsData.restaurants.map(restaurant => ({
    ...restaurant,
    priceLevel: restaurant.priceLevel as 1 | 2 | 3 | 4,
    location: {
      ...restaurant.location,
      coordinates: restaurant.location.coordinates as [number, number]
    }
  })) as Restaurant[]
}
  
  export async function getRestaurant(slug: string): Promise<Restaurant | null> {
    const restaurants = await getRestaurants()
    return restaurants.find(r => r.slug === slug) || null
  }
  
  export async function getRestaurantsByCategory(category: string): Promise<Restaurant[]> {
    const restaurants = await getRestaurants()
    return restaurants.filter(r => r.categories.includes(category))
  }