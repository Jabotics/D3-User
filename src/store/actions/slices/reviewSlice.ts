import { APIEndPoints } from "@/APIEndpoint";
import { RootState } from "@/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IncomingData {
  message: string;
  status: boolean;
}

export const reviewApi = createApi({
  reducerPath: "ReviewApi",
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
    submitReviews: builder.mutation<IncomingData, object>({
      query: (body) => {
        const { ...rest } = body;
        return {
          url: APIEndPoints.feedback,
          method: "POST",
          body: rest,
        };
      },
    }),
  }),
});

export const { useSubmitReviewsMutation } = reviewApi