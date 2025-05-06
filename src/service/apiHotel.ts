import { IHotel, IHotelApi } from '@/interfaces/IHotel'
import { instance } from '.'

export const hotelApi = {
  getHotels: async (page: number, limit: number, query?: string): Promise<IHotel[]> => {
    const response = await instance.get(`hotels?_page=${page}&_limit=${limit}&${query}`)
    return response.data
  },

  getInfinityHotels: async (page: number, limit: number, query?: string): Promise<IHotelApi> => {
    const response = await instance.get<IHotel[]>(`hotels?_page=${page}&_limit=${limit}&${query}`)
    const data = {
      totalCount: Number(response.headers['x-total-count']),
      hotels: response.data
    }
    return data
  },

  getFullHotel: async () => {
    const res = await instance.get('hotels')
    return res.data
  },

  getDetailHotel: async (id: string) => {
    const res = await instance.get(`hotels/${id}`)
    return res.data
  },

  getRelatedHotel: async (star: number) => {
    const res = await instance.get(`hotels?_page=1&_limit=3&typeroom=${star}`)
    return res.data
  },

  updateData: async (data: IHotel) => {
    const res = await instance.patch(`hotels/${data.id}`, data)
    return res.data
  }
}
