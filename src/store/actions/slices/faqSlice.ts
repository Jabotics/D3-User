import { APIEndPoints } from "@/APIEndpoint"
import { IFaq } from "@/interface/data"
import { createSlice } from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface IncomingData {
  status: string
  message: string
  data: IFaq[]
}

export const faqsApi = createApi({
  reducerPath: "FaqsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: APIEndPoints.BackendURL,
  }),
  endpoints: (builder) => ({
    fetchFaqs: builder.query<IncomingData, { type?: "Booking" | "Academy" | "Membership" | "Others" }>({
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
          url: APIEndPoints.fetch_faqs,
          method: "GET",
          params: customParams,
        };
      },
    })
  })
})

interface InitialState {
  faqs: IFaq[]
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
}

const initialState: InitialState = {
  faqs: [],
  status: "idle",
  error: undefined,
}

export const FaqsSlice = createSlice({
  name: "FaqsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // asynchronous task
    builder.addMatcher(
      faqsApi.endpoints.fetchFaqs.matchPending,
      (state) => {
        state.status = "loading"
      } 
    )
    .addMatcher(
      faqsApi.endpoints.fetchFaqs.matchFulfilled,
      (state, action) => {
        state.status = "succeeded";
        state.faqs = action.payload.data;
      }
    )
    .addMatcher(
      faqsApi.endpoints.fetchFaqs.matchRejected,
      (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      }
    )
  }
})

export const { useFetchFaqsQuery } = faqsApi
export default FaqsSlice.reducer;