export interface Restaurant {
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
      reservations: string
      reservationLink?: string
      averageMeal: string
    }
    experience: {
      atmosphere: string
      bestFor: string[]
      specialties: string[]
    }
    practical: {
      hours: Record<string, string>
      phone: string
      website: string
    }
    content: {
      description: string
      highlights: string[]
      tips: string[]
    }
    images: Array<{
      url: string
      alt: string
      caption?: string
    }>
    rating: {
      overall: number
      food: number
      service: number
      value: number
      atmosphere: number
    }
  }