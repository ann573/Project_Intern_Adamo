import { IHotel } from "@/interfaces/IHotel";
import { instance } from ".";

type Data = {
    data: IHotel[]
    items: string
}

export const hotelApi = {
  getHotels: (page: number, limit: number, query?: string) =>
    instance.get<Data>(`hotels?_page=${page}&_per_page=${limit}&${query}`),
};
