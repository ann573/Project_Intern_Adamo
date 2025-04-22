import { useQuery } from "@tanstack/react-query";
import { hotelApi } from "@/service/apiHotel";
import { IHotel } from "@/interfaces/IHotel";

export const useHotels = (page = 1, limit = 9, query = "") => {
  return useQuery<IHotel[]>({
    queryKey: ["hotels", page, query],
    queryFn: () => hotelApi.getHotels(page, limit, query),
    staleTime: 5000,
  });
};

export const useFullHotels = () => {
  return useQuery<IHotel[]>({
    queryKey: ["hotelsFull"],
    queryFn: () => hotelApi.getFullHotel(),
  });
};

export const useDetailHotels = (id:string) => {
  return useQuery<IHotel>({
    queryKey: ["hotel", id],
    queryFn: () => hotelApi.getDetailHotel(id),
  });
};

export const useRelatedHotels = (star:number) => {
  return useQuery<IHotel[]>({
    queryKey: ["hotelStar", star],
    queryFn: () => hotelApi.getRelatedHotel(star),
  });
};
