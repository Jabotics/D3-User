import { APIEndPoints } from "@/APIEndpoint";
import { ICity } from "@/interface/data"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IncomingData {
  data: {
    cities: ICity[]
  },
  message: string;
  status: string;
}

export const citiesApi = createApi({
  reducerPath: 'CitiesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: APIEndPoints.BackendURL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token") || "";
      if (token) {
        headers.set("authorization", token);
        headers.set("type", "admin");
        return headers;
      }
    }
  }),
  endpoints: (builder) => ({
    getCities: builder.query<IncomingData, object>({
      query: (params) => {
        const customParams = { ...params }
        Object.keys(customParams).forEach((key) => {
          if (
            customParams[key as keyof object] === null ||
            customParams[key as keyof object] === undefined ||
            customParams[key as keyof object] === "" ||
            customParams[key as keyof object] === "[]"
          ) {
            delete customParams[key as keyof object]
          }
        });
        return {
          url: APIEndPoints.fetch_cities,
          method: "GET",
          params: customParams,
        }
      }
    })
  })
});

interface InitialState {
  cities: ICity[];
  total: number | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;

  selectedCity: string;

  prev: ICity[];
}

const initialState: InitialState = {
  cities: [],
  total: null,
  status: "idle",
  error: undefined,

  selectedCity: "",

  prev: []
}

export const CitySlice = createSlice({
  name: "CitySlice",
  initialState,
  reducers: {
    setSelectedCity: (state, action: PayloadAction<string>) => {
      state.selectedCity = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(citiesApi.endpoints.getCities.matchPending, (state) => {
        state.status = "loading";
      })
      .addMatcher(
        citiesApi.endpoints.getCities.matchFulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.cities = action.payload.data.cities;
          state.prev = action.payload.data.cities;
        }
      )
      .addMatcher(
        citiesApi.endpoints.getCities.matchRejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      );
  },
});

export const { useGetCitiesQuery } = citiesApi;
export const { setSelectedCity } = CitySlice.actions;
export default CitySlice.reducer;