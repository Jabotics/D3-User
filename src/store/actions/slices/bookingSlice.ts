import { APIEndPoints } from "@/APIEndpoint";
import { IBooking } from "@/interface/data";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IncomingData {
    data: {
        count: number,
        bookings: IBooking[];
    };
    message: string;
    status: boolean;
}

export const bookingApi = createApi({
    reducerPath: "BookingApi",
    baseQuery: fetchBaseQuery({
        baseUrl: APIEndPoints.BackendURL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token") || "";
            if (token) {
                headers.set("authorization", token);
                headers.set("type", "admin");
                return headers;
            }
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
    title: string;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | undefined;
    prev: IBooking[];
}

const initialState: InitialState = {
    bookings: [],
    total: null,
    title: 'My Booking',
    status: "idle",
    error: undefined,
    prev: [],
};

export const BookingSlice = createSlice({
    name: "BookingSlice",
    initialState,
    reducers: {

        setTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload;
        },
    },
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
export const { setTitle } = BookingSlice.actions;
export default BookingSlice.reducer;