import ITour from "@/interfaces/ITour";
import { instance } from "@/service";
import { TResponse } from "@/types/TResponse";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

type RejectWithValue = (value: string) => void;

const handleError = (
  error: ErrorResponse,
  rejectWithValue: RejectWithValue
): never => {
  const message =
    error?.response?.data?.message || error?.message || "Đã có lỗi xảy ra!";
  throw rejectWithValue(message);
};

export const getTours = createAsyncThunk<
  TResponse,
  { page: number; limit?: number; request: string },
  { rejectValue: string }
>(
  "tour/getTours",
  async ({ page = 1, limit = 9, request = "" }, { rejectWithValue }) => {
    try {
      const data: TResponse = await instance.get(
        `tours?_page=${page}&_per_page=${limit}&${request}`
      );
      return data;
    } catch (error) {
      return handleError(error as ErrorResponse, rejectWithValue);
    }
  }
);

export const getDetailTour = createAsyncThunk<ITour[], { id: string }>(
  "tour/getDetailTour",
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const data: ITour[] = await instance.get(`tours?id=${id}`);
      return data;
    } catch (error) {
      return handleError(error as ErrorResponse, rejectWithValue);
    }
  }
);

export const getFilterTour = createAsyncThunk<
  ITour[],
  void,
  { rejectValue: string }
>("tour/getFilterTour", async (_, { rejectWithValue }) => {
  try {
    const data: ITour[] = await instance.get("tours");
    return data;
  } catch (error) {
    return handleError(error as ErrorResponse, rejectWithValue);
  }
});
