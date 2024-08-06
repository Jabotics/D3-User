import { APIEndPoints } from "@/APIEndpoint";
import { RootState } from "@/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IncomingData {
  message: string;
  status: boolean;
}

export const contactApi = createApi({
  reducerPath: "ContactApi",
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
    submitInquiries: builder.mutation<IncomingData, object>({
      query: (body) => {
        const { ...rest } = body;
        return {
          url: APIEndPoints.submit_inquiry,
          method: "POST",
          body: rest,
        };
      },
    }),
  }),
});

export const { useSubmitInquiriesMutation } = contactApi