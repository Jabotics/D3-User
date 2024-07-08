import { APIEndPoints } from "@/APIEndpoint";
import { IGround } from "@/interface/data";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
interface IncomingData {
  data: {
    count: number;
    grounds: IGround[];
  };
  message: string;
  status: boolean;
}

export const groundApi = createApi({
  reducerPath: "GroundApi",
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
    getGround: builder.query<IncomingData, object>({
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
          url: APIEndPoints.fetch_ground,
          method: "GET",
          params: customParams,
        };
      },
    }),
  }),
});

interface IParams {
  isFilter: boolean;
  grounds: IGround[];
  total: number | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
  params: { [key: string]: string[] };

  selectedSportsStore: string[];
  sortByText: string[];
  selectedVenue: string[];
  selectedGroundType: string[];
}
const initialState: IParams = {
  isFilter: true,
  grounds: [],
  total: null,
  status: "idle",
  error: undefined,
  params: {},

  selectedSportsStore: [],
  sortByText: [],
  selectedVenue: [],
  selectedGroundType: [],
};

export const GroundSlice = createSlice({
  name: "GroundSlice",
  initialState,
  reducers: {
    setParams: (
      state,
      action: PayloadAction<{ key: string; data: string[] }>
    ) => {
      if (action.payload.data.length !== 0) {
        state.params[action.payload.key] = action.payload.data;
      } else if (
        action.payload.data.length == 0 &&
        Object.keys(state.params).length > 1
      ) {
        delete state.params[action.payload.key];
      } else {
        state.params = {};
      }
      // console.log(JSON.parse(JSON.stringify(state.params)));
    },

    setSortByText: (state, action: PayloadAction<string>) => {
      if (state.sortByText.includes(action.payload)) {
        state.sortByText = state.sortByText.filter(
          (item) => item !== action.payload
        );
      } else {
        state.sortByText.push(action.payload);
      }
    },

    resetFilters: (state) => {
      state.selectedSportsStore = [];
      state.sortByText = [];
      state.selectedVenue = [];
      state.selectedGroundType = [];
    },
    setSelectedVenueInGround: (state, action: PayloadAction<string>) => {
      if (state.selectedVenue.includes(action.payload)) {
        state.selectedVenue = state.selectedVenue.filter(
          (item) => item !== action.payload
        );
      } else {
        state.selectedVenue.push(action.payload);
      }
    },

    setSelectedGroundType: (state, action: PayloadAction<string>) => {
      if (state.selectedGroundType.includes(action.payload)) {
        state.selectedGroundType = state.selectedGroundType.filter(
          (item) => item !== action.payload
        );
      } else {
        state.selectedGroundType.push(action.payload);
      }
    },
    setSelectedSportsStore: (state, action: PayloadAction<string>) => {
      if (state.selectedSportsStore.includes(action.payload)) {
        state.selectedSportsStore = state.selectedSportsStore.filter(
          (item) => item !== action.payload
        );
      } else {
        state.selectedSportsStore.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    // Handle the asynchronous fetchItems action
    builder
      .addMatcher(groundApi.endpoints.getGround.matchPending, (state) => {
        state.status = "loading";
      })
      .addMatcher(
        groundApi.endpoints.getGround.matchFulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.grounds = action.payload.data.grounds;
          state.total = action.payload.data.count;
        }
      )
      .addMatcher(
        groundApi.endpoints.getGround.matchRejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      );
  },
});

export const { useGetGroundQuery } = groundApi;
export const {
  setParams,
  setSortByText,
  resetFilters,
  setSelectedVenueInGround,
  setSelectedGroundType,
  setSelectedSportsStore,
} = GroundSlice.actions;
export default GroundSlice.reducer;
