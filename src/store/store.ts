import { configureStore } from '@reduxjs/toolkit'

import tourReducer from '@/features/tour/tourSlice'

export const store = configureStore({
    reducer: {
      tours: tourReducer
    },
  })