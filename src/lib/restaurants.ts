import { Restaurant } from '@/types/restaurant'

export const mockRestaurants: Restaurant[] = [
    {
      id: 'snake-river-brewing',
      name: 'Snake River Brewing',
      slug: 'snake-river-brewing',
      categories: ['post-hike-fuel', 'local-favorite'],
      priceLevel: 2,
      location: {
        address: '265 S Millward St, Jackson, WY 83001',
        coordinates: [43.4799, -110.7624],
        distanceFromPark: '5 miles'
      },
      dining: {
        cuisine: 'American Brewpub',
        dietaryOptions: ['vegetarian', 'gluten-free'],
        reservations: 'recommended',
        reservationLink: 'https://snakeriverbrewing.com/reservations',
        averageMeal: '$15-25'
      },
      experience: {
        atmosphere: 'Casual, Local Hangout',
        bestFor: ['Post-Hike Meals', 'Casual Dinner', 'Groups'],
        specialties: ['Craft Beer', 'Bison Burger', 'Nachos']
      },
      practical: {
        hours: {
          monday: '11:00-22:00',
          tuesday: '11:00-22:00',
          wednesday: '11:00-22:00',
          thursday: '11:00-22:00',
          friday: '11:00-23:00',
          saturday: '11:00-23:00',
          sunday: '11:00-22:00'
        },
        phone: '+1-307-739-2337',
        website: 'https://snakeriverbrewing.com'
      },
      content: {
        description: 'After a long day hiking in Grand Teton, nothing beats settling into Snake River Brewing\'s cozy atmosphere. This local favorite has been serving up hearty American fare and craft beer since 1994, making it the perfect spot to refuel and share stories from the trail.',
        highlights: ['Locally brewed beer', 'Hearty portions perfect for hungry hikers', 'Patio seating with mountain views'],
        tips: ['Try the Zonker Stout - it\'s a local favorite', 'Arrive early for patio seats during peak season', 'The bison burger is a must-try Jackson experience']
      },
      images: [
        {
          url: '/images/placeholder-restaurant.svg',
          alt: 'Snake River Brewing exterior with mountain views',
          caption: 'Perfect spot after outdoor adventures'
        }
      ],
      rating: {
        overall: 4.2,
        food: 4.0,
        service: 4.3,
        value: 4.5,
        atmosphere: 4.1
      }
    }
  ]
  
  export async function getRestaurants(): Promise<Restaurant[]> {
    // In production, this would fetch from your data source
    return mockRestaurants
  }
  
  export async function getRestaurant(slug: string): Promise<Restaurant | null> {
    const restaurants = await getRestaurants()
    return restaurants.find(r => r.slug === slug) || null
  }
  
  export async function getRestaurantsByCategory(category: string): Promise<Restaurant[]> {
    const restaurants = await getRestaurants()
    return restaurants.filter(r => r.categories.includes(category))
  }