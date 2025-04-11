import { instance } from "@/service";
import { createAsyncThunk } from "@reduxjs/toolkit";

const handleError = (error, rejectWithValue) => {
  const message =
    error?.response?.data?.message || error?.message || "Đã có lỗi xảy ra!";
  return rejectWithValue(message);
};

export const getTours = createAsyncThunk(
  "tour/getTours",
  async ({ page = 1, query = "" }, { rejectWithValue }) => {
    try {
      const data = await instance.get(
        `tours?_page=${page}&_per_page=9&${query}`
      );
      return data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const getDetailTour = createAsyncThunk(
  "tour/getDetailTour",
  async ({ id }, { rejectWithValue }) => {
    try {
      const data = await instance.get(`tours?id=${id}`);
      return data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const getFilterTour = createAsyncThunk(
  "tour/getFilterTour",
  async (_, { rejectWithValue }) => {
    try {
      const data = await instance.get(`tours`);
      return data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);
