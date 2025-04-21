import { IHotel } from "@/interfaces/IHotel";
import { instance } from ".";

export const hotelApi = {
  getHotels: async (
    page: number,
    limit: number,
    query?: string
  ): Promise<IHotel[]> => {
    const response = await instance.get<IHotel[]>(
      `hotels?_page=${page}&_limit=${limit}&${query}`
    );
    return response.data;
  },

  getFullHotel : async () => {
    const res = await instance.get("hotels")
    return res.data
  },

  getDetailHotel : async (id:string) => {
    const res = await instance.get(`hotels/${id}`)
    return res.data
  }
};
