import ITour from '@/interfaces/ITour'
import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit'
import { addCommentTour, getDetailTour, getFilterTour, getTours } from './tourAction'

type TInitialState = {
  tours: ITour[]
  tour: ITour | null
  isLoading: boolean
  isLoadingComment: boolean
  isError: boolean
  error: string
  total: number
  type: string[]
  range: number[]
}

const initialState: TInitialState = {
  tours: [],
  tour: null,
  isLoading: false,
  isLoadingComment: false,
  isError: false,
  error: '',
  total: 0,
  type: [],
  range: [0, 1000]
}

const setLoading = (state: TInitialState) => {
  state.isLoading = true
  state.error = ''
}

const setError = (state: TInitialState, action: PayloadAction<unknown> & { error: SerializedError }) => {
  state.isLoading = false
  state.isError = true
  state.error = (action.payload as string) || action.error.message || 'Đã có lỗi xảy ra!'
}

const tourSlice = createSlice({
  name: 'tour',
  initialState,
  reducers: {
    setType: (state, action) => {
      state.type = action.payload
    },
    addComment: (state, action) => {
      state.tour?.rating.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTours.pending, setLoading)
      .addCase(getTours.fulfilled, (state: TInitialState, action: PayloadAction<{ data: ITour[]; total: number }>) => {
        state.isLoading = false
        state.tours = action.payload?.data
        state.total = action.payload.total
        state.isError = false
      })
      .addCase(getTours.rejected, setError)

      .addCase(getDetailTour.pending, setLoading)
      .addCase(getDetailTour.fulfilled, (state, action: PayloadAction<ITour[]>) => {
        state.isLoading = false
        state.tour = action.payload[0]
        state.isError = false
      })
      .addCase(getDetailTour.rejected, setError)

      .addCase(getFilterTour.pending, setLoading)
      .addCase(getFilterTour.fulfilled, (state: TInitialState, action: PayloadAction<ITour[]>) => {
        state.isLoading = false

        state.type = [...new Set(action.payload.map((t: ITour) => t.type))]
        const prices = action.payload.map((t) => t.cost)
        state.range[1] = Math.max(...prices) + 1100

        state.isError = false
      })
      .addCase(getFilterTour.rejected, setError)

      .addCase(addCommentTour.pending, (state: TInitialState) => {
        state.isLoadingComment = true
      })
      .addCase(addCommentTour.fulfilled, (state: TInitialState, action: PayloadAction<ITour>) => {
        state.isLoadingComment = false

        state.tour = action.payload

        state.isError = false
      })
      .addCase(addCommentTour.rejected, setError)
  }
})

export const { setType, addComment } = tourSlice.actions

export default tourSlice.reducer
