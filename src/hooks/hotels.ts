import { IHotel } from "@/interfaces/IHotel";
import { hotelApi } from "@/service/apiHotel";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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

export const useDetailHotels = (id: string) => {
  return useQuery<IHotel>({
    queryKey: ["hotel", id],
    queryFn: () => hotelApi.getDetailHotel(id),
  });
};

export const useRelatedHotels = (star: number) => {
  return useQuery<IHotel[]>({
    queryKey: ["hotelStar", star],
    queryFn: () => hotelApi.getRelatedHotel(star),
  });
};

export function useUpdateData() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IHotel) => hotelApi.updateData(data),
    onSuccess: (updatedData: IHotel) => {
      queryClient.invalidateQueries({ queryKey: ["hotel", updatedData.id] });
      
      return toast.success("Review submitted successfully", {
        style: {
          background: "#008000",
          color: "white",
        },
      });; 
    },
    onError: (error) => {
      console.error("Update failed:", error);
      return toast.error("Error!!!!!", {
        style: {
          background: "red",
          color: "white"
        }
      })
    },
  });
}
