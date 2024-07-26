import { APIEndPoints } from "@/APIEndpoint";
import { IHomeBanner } from "@/interface/data";
import { RootState } from "@/store";
import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IncomingData {
  status: string;
  message: string;
  data: {
    count: number;
    banners: IHomeBanner[];
  };
}

export const homeBannerApi = createApi({
  reducerPath: "HomeBannerApi",
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
    fetchBanners: builder.query<IncomingData, object>({
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
          url: APIEndPoints.fetch_banner,
          method: "GET",
          params: customParams,
        };
      },
    }),
  }),
});

interface InitialState {
  banners: IHomeBanner[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
  count: number | null;
}

const initialState: InitialState = {
  banners: [],
  status: "idle",
  error: undefined,
  count: null,
};

export const HomeBannerSlice = createSlice({
  name: "HomeBannerSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle the asynchronous fetchItems action
    builder
      .addMatcher(
        homeBannerApi.endpoints.fetchBanners.matchPending,
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        homeBannerApi.endpoints.fetchBanners.matchFulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.banners = action.payload.data.banners;
          state.count = action.payload.data.count;
        }
      )
      .addMatcher(
        homeBannerApi.endpoints.fetchBanners.matchRejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      );
  },
});

export const { useFetchBannersQuery } = homeBannerApi;
// export const {
// } = HomeBannerSlice.actions;
export default HomeBannerSlice.reducer;
