import ITour from '@/interfaces/ITour'
import { instance } from '@/service'
import { createAsyncThunk } from '@reduxjs/toolkit'

interface ErrorResponse {
  response?: {
    data?: {
      message?: string
    }
  }
  message?: string
}

type RejectWithValue = (value: string) => void

const handleError = (error: ErrorResponse, rejectWithValue: RejectWithValue): never => {
  const message = error?.response?.data?.message || error?.message || 'Đã có lỗi xảy ra!'
  throw rejectWithValue(message)
}

export const getTours = createAsyncThunk<
  { data: ITour[]; total: number },
  { page: number; limit?: number; request: string },
  { rejectValue: string }
>('tour/getTours', async ({ page = 1, limit = 9, request = '' }, { rejectWithValue }) => {
  try {
    const res = await instance.get(`tours?_page=${page}&_limit=${limit}&${request}`)
    return {
      data: res.data,
      total: res.headers['x-total-count']
    }
  } catch (error) {
    return handleError(error as ErrorResponse, rejectWithValue)
  }
})

export const getDetailTour = createAsyncThunk<ITour[], { id: string }>(
  'tour/getDetailTour',
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const { data }: { data: ITour[] } = await instance.get(`tours?id=${id}`)
      return data
    } catch (error) {
      return handleError(error as ErrorResponse, rejectWithValue)
    }
  }
)

export const getFilterTour = createAsyncThunk<ITour[], AbortSignal, { rejectValue: string }>(
  'tour/getFilterTour',
  async (signal, { rejectWithValue }) => {
    try {
      const { data } = await instance.get('tours', { signal })
      return data
    } catch (error) {
      if ((error as ErrorResponse)?.message === 'canceled') {
        return rejectWithValue('Request canceled')
      }
      return handleError(error as ErrorResponse, rejectWithValue)
    }
  }
)

export const addCommentTour = createAsyncThunk<ITour, ITour, { rejectValue: string }>(
  'tour/addCommentTour',
  async (dataBody, { rejectWithValue }) => {
    try {
      const { data }: { data: ITour } = await instance.patch(`tours/${dataBody.id}`, dataBody)
      return data
    } catch (error) {
      return handleError(error as ErrorResponse, rejectWithValue)
    }
  }
)
