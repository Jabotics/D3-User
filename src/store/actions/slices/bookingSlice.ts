import { APIEndPoints } from "@/APIEndpoint";
import { IBooking } from "@/interface/data";
import { RootState } from "@/store";
import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IncomingData {
  data: {
    count: number;
    bookings: IBooking[];
  };
  message: string;
  status: boolean;
}

export const bookingApi = createApi({
  reducerPath: "BookingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: APIEndPoints.BackendURL,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.token || localStorage.getItem("token") || "";
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getBookings: builder.query<IncomingData, object>({
      query: (params) => {
        const customParams = { ...params };
        Object.keys(customParams).forEach((key) => {
          if (
            customParams[key as keyof object] === null ||
            customParams[key as keyof object] === undefined ||
            customParams[key as keyof object] === "" ||
            customParams[key as keyof object] === "[]"
          ) {
            delete customParams[key as keyof object];
          }
        });
        return {
          url: APIEndPoints.get_booking,
          method: "GET",
          params: customParams,
        };
      },
    }),
  }),
});

interface InitialState {
  bookings: IBooking[];
  total: number | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
  prev: IBooking[];
}

const initialState: InitialState = {
  bookings: [],
  total: null,
  status: "idle",
  error: undefined,
  prev: [],
};

export const BookingSlice = createSlice({
  name: "BookingSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(bookingApi.endpoints.getBookings.matchPending, (state) => {
        state.status = "loading";
      })
      .addMatcher(
        bookingApi.endpoints.getBookings.matchFulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.bookings = action.payload.data.bookings;
          state.prev = action.payload.data.bookings;
        }
      )
      .addMatcher(
        bookingApi.endpoints.getBookings.matchRejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      );
  },
});

export const { useGetBookingsQuery } = bookingApi;
// export const {} = BookingSlice.actions;
export default BookingSlice.reducer;
