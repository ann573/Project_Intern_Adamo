import { useQuery } from "@tanstack/react-query";
import { hotelApi } from "@/service/apiHotel";

export const useHotels = (page = 1, limit = 9, query = "") => {
  return useQuery({
    queryKey: ["hotels"],
    queryFn: () => hotelApi.getHotels(page, limit, query),
  });
};
