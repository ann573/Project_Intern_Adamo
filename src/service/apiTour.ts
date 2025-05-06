import ITour from '@/interfaces/ITour'
import { instance } from '.'

const apiTour = {
  getTour: async (page = 1, limit = 9, request = '') => {
    return await instance.get(`tours?_page=${page}&_limit=${limit}&${request}`)
  },
  getDetailTour: async (id: string) => {
    return await instance.get(`tours?id=${id}`)
  },
  getFilterTour: async (signal: AbortSignal) => {
    return await instance.get('tours', { signal })
  },
  addCommentTour: async (dataBody: ITour) => {
    return await instance.patch(`tours/${dataBody.id}`, dataBody)
  }
}

export default apiTour
