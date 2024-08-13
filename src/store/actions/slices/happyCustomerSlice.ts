import { APIEndPoints } from "@/APIEndpoint";
import { IHappyCustomers } from "@/interface/data";
import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IncomingData {
  status: string;
  message: string;
  data: IHappyCustomers[];
}

export const happyCustomersApi = createApi({
  reducerPath: "HappyCustomersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: APIEndPoints.BackendURL,
  }),
  endpoints: (builder) => ({
    getHappyCustomers: builder.query<IncomingData, void>({
      query: () => ({
        url: APIEndPoints.happy_customers,
        method: "GET",
      }),
    }),
  }),
});

interface InitialState {
  happyCustomers: IHappyCustomers[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
}

const initialState: InitialState = {
  happyCustomers: [],
  status: "idle",
  error: undefined,
}

export const HappyCustomerSlice = createSlice({
  name: "HappyCustomerSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(happyCustomersApi.endpoints.getHappyCustomers.matchPending, (state) => { state.status = "loading" })
      .addMatcher(happyCustomersApi.endpoints.getHappyCustomers.matchFulfilled, (state, action) => { state.status = "succeeded"; state.happyCustomers = action.payload.data })
      .addMatcher(happyCustomersApi.endpoints.getHappyCustomers.matchPending, (state) => { state.status = "failed" })
  }
})

export const { useGetHappyCustomersQuery } = happyCustomersApi
export default HappyCustomerSlice.reducer
