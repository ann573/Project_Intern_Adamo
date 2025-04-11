import { createSlice } from "@reduxjs/toolkit";
import { getDetailTour, getTours, getFilterTour } from "./tourAction";

const initialState = {
  tours: [],
  tour: null,
  isLoading: false,
  isError: false,
  error: "",
  total: 0,
  type: [],
  range: [0 , 1000]
};

const setLoading = (state) => {
  state.isLoading = true;
  state.error = null;
};

const setError = (state, action) => {
  state.isLoading = false;
  state.isError = true;
  state.error = action.payload || action.error.message || "Đã có lỗi xảy ra!";
};

const tourSlice = createSlice({
  name: "tour",
  initialState,
  reducers: {
    setType: (state, action) => {
      state.type = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTours.pending, setLoading)
      .addCase(getTours.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tours = action.payload?.data;
        state.total = action.payload.items;
        state.isError = false;
      })
      .addCase(getTours.rejected, setError)

      .addCase(getDetailTour.pending, setLoading)
      .addCase(getDetailTour.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tour = action.payload[0];
        state.isError = false;
      })
      .addCase(getDetailTour.rejected, setError)

      .addCase(getFilterTour.pending, setLoading)
      .addCase(getFilterTour.fulfilled, (state, action) => {
        state.isLoading = false;
        
        state.type = [...new Set(action.payload.map((t) => t.type))];
        const prices = action.payload.map((t) => t.cost);
        state.range[1] = Math.max(...prices) + 1100

        state.isError = false;
      })
      .addCase(getFilterTour.rejected, setError);
  },
});

export const { setType } = tourSlice.actions;

export default tourSlice.reducer;
