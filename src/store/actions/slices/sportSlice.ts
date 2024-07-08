import { APIEndPoints } from "@/APIEndpoint";
import { ISport } from "@/interface/data";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IncomingData {
  data: ISport[];
  message: string;
  status: boolean;
}

export const sportApi = createApi({
  reducerPath: "SportApi",
  baseQuery: fetchBaseQuery({
    baseUrl: APIEndPoints.BackendURL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token")
        ? localStorage.getItem("token")
        : "";
      if (token) {
        headers.set("authorization", token);
        return headers;
      }
    },
  }),
  endpoints: (builder) => ({
    getSport: builder.query<IncomingData, object>({
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
          url: APIEndPoints.fetch_sport,
          method: "GET",
          params: customParams,
        };
      },
    }),
  }),
});

interface IInitialState {
  isFilter: boolean;
  sports: ISport[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
  prev: ISport[];
  selectedSports: string[];
}
const initialState: IInitialState = {
  isFilter: true,
  sports: [],
  status: "idle",
  error: undefined,
  prev: [],
  selectedSports: [],
};

export const SportSlice = createSlice({
  name: "SportSlice",
  initialState,
  reducers: {
    setSelectedSports: (state, action: PayloadAction<{ sportId: string }>) => {
      const { sportId } = action.payload;
      if (sportId) {
        if (state.selectedSports.includes(sportId)) {
          state.selectedSports = state.selectedSports.filter(
            (id) => id !== sportId
          );
        } else {
          state.selectedSports.push(sportId);
        }
      } else {
        state.selectedSports = [];
      }
    },
  },

  extraReducers: (builder) => {
    // Handle the asynchronous fetchItems action
    builder
      .addMatcher(sportApi.endpoints.getSport.matchPending, (state) => {
        state.status = "loading";
      })
      .addMatcher(
        sportApi.endpoints.getSport.matchFulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.sports = action.payload.data;
          state.prev = action.payload.data;
        }
      )
      .addMatcher(
        sportApi.endpoints.getSport.matchRejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      );
  },
});

export const { useGetSportQuery } = sportApi;
export const { setSelectedSports } = SportSlice.actions;
export default SportSlice.reducer;
