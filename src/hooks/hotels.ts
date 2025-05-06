import { IHotel, IHotelApi } from '@/interfaces/IHotel'
import { hotelApi } from '@/service/apiHotel'
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { toast } from 'sonner'

export const useHotels = (page = 1, limit = 9, query = '', enabled = true) => {
  return useQuery<IHotel[]>({
    queryKey: ['hotels', page, query],
    queryFn: () => hotelApi.getHotels(page, limit, query),
    staleTime: 5000,
    enabled
  })
}

export const useInfiniteHotels = (query = '') => {
  return useInfiniteQuery<IHotelApi>({
    queryKey: ['hotelsInfinity'],
    queryFn: ({ pageParam }) => hotelApi.getInfinityHotels(Number(pageParam), 6, query),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // Kiểm tra nếu lastPage không có dữ liệu (trống)
      if (!lastPage || lastPage.hotels.length === 0) {
        return undefined // Không có trang tiếp theo
      }
      return allPages.length + 1 // Trang tiếp theo
    },
    staleTime: 5000
  })
}

export const useFullHotels = (open: boolean) => {
  return useQuery<IHotel[]>({
    queryKey: ['hotelsFull'],
    queryFn: () => hotelApi.getFullHotel(),
    enabled: open,
    staleTime: Infinity
  })
}

export const useDetailHotels = (id: string) => {
  const fetchHotelDetail = useCallback(() => hotelApi.getDetailHotel(id), [id])
  return useQuery<IHotel>({
    queryKey: ['hotel', id],
    queryFn: fetchHotelDetail,
    enabled: !!id,
    staleTime: 1000 * 60 * 10
  })
}

export const useRelatedHotels = (star: number) => {
  return useQuery<IHotel[]>({
    queryKey: ['hotelStar', star],
    queryFn: () => hotelApi.getRelatedHotel(star)
  })
}

export function useUpdateData() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: IHotel) => hotelApi.updateData(data),
    onSuccess: (updatedData: IHotel) => {
      queryClient.invalidateQueries({ queryKey: ['hotel', updatedData.id] })

      return toast.success('Review submitted successfully', {
        style: {
          background: '#008000',
          color: 'white'
        }
      })
    },
    onError: (error) => {
      return toast.error((error as Error).message, {
        style: {
          background: 'red',
          color: 'white'
        }
      })
    }
  })
}
