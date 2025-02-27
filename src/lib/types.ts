export interface Tour {
    id: string
    slug: string
    heading1: string
    heading2: string
    imageURL?: string
    location: string
    duration: string
    category: string
    price: number
    rating: number
    keywords: string
  }
  
export interface TourPackage {
    whatIncluded: any
    whatNotIncluded: any
    _id: string
    slug: string
    heading1: string
    heading2: string
    description: string
    imageURL: string
    price: number
    rating: number
    duration: string
    location: string
    keywords: string
  }
  