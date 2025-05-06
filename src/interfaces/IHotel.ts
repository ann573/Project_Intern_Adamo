export interface IHotel {
  id: number
  name: string
  location: string
  featured: boolean
  cost: number
  typeroom: number
  description: {
    overview: string
    amenities: string[]
    rules: {
      checkin: string
      checkout: string
      other: string[]
    }
    reviews: {
      avatar: string
      rating: number
      heading: string
      name: string
      time: number
      comments: string
    }[]
    room: {
      id: number
      name: string
      acreage: string
      beds: string
      guest: number
      description: string
      price: number
      price_discount: number
      isAvailable: boolean
      facilities: string[]
    }[]
    thumbnail: string
    image: string[]
  }
}

export interface IHotelApi {
  totalCount: number
  hotels: IHotel[]
}
