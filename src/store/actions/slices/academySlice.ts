import { APIEndPoints } from "@/APIEndpoint";
import { IAcademy } from "@/interface/data"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IncomingData {
  data: {
    academies: IAcademy[]
    count: number | null
  }
  message: string;
  status: boolean;
}

export const academiesApi = createApi({
  reducerPath: 'AcademiesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: APIEndPoints.BackendURL,
  }),
  endpoints: (builder) => ({
    fetchAcademies: builder.query<IncomingData, object>({
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
          url: APIEndPoints.fetch_academies,
          method: "GET",
          params: customParams,
        };
      },
    })
  })
})

interface InitialState {
  academies: IAcademy[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
  count: number | null;

  limit: number;
  offset: number;

  locationArr: string[];

  selectedSportsStore: string | null
  sortByText: string[]
  selectedVenue: string[]
  selectedGroundType: string[]
  selectedSlot: string | null

  registrationFormDetails: {
    first_name: string
    last_name: string
    guardian_name: string
    guardian_mobile: string
    email: string
    address: string
    academy: string
    sport: string
    slot?: string
    customer: string
    ground: string
    city: string
    venue: string
    academy_fee: number
    subscription_type?: 'Monthly' | 'Quarterly' | 'Half_Yearly' | 'Yearly'
    admission_fee?: number
    profile?: File | null
    doc?: File | null
    mobile: string
  }
}

const initialState: InitialState = {
  academies: [],
  status: "idle",
  error: undefined,
  count: null,

  limit: 4,
  offset: 0,

  locationArr: ["Home", "Academy"],

  selectedSportsStore: null,
  sortByText: [],
  selectedVenue: [],
  selectedGroundType: [],

  selectedSlot: null,
  
  registrationFormDetails: {
    guardian_mobile: '',
    guardian_name: '',
    address: '',
    academy: '',
    city: '',
    customer: '',
    email: '',
    first_name: '',
    ground: '',
    last_name: '',
    slot: '',
    sport: '',
    subscription_type: 'Monthly',
    venue: '',
    academy_fee: 0,
    admission_fee: 0,
    profile: null,
    doc: null,
    mobile: '',
  }
}

export const AcademiesSlice = createSlice({
  name: "AcademiesSlice",
  initialState,
  reducers: {
    setSelectedSportsStore: (state, action: PayloadAction<string | null>) => {
      state.selectedSportsStore = action.payload
    },
    setSelectedGroundType: (state, action: PayloadAction<string>) => {
      if (state.selectedGroundType.includes(action.payload)) {
        state.selectedGroundType = state.selectedGroundType.filter(item => item !== action.payload);
      } else {
        state.selectedGroundType.push(action.payload);
      }
    },
    setSortByText: (state, action: PayloadAction<string>) => {
      if (state.sortByText.includes(action.payload)) {
        state.sortByText = state.sortByText.filter(item => item !== action.payload);
      } else {
        state.sortByText.push(action.payload);
      }
    },
    resetFilters: (state) => {
      state.selectedSportsStore = null
      state.sortByText = []
      state.selectedVenue = []
    },
    setSelectedVenue: (state, action: PayloadAction<string>) => {
      if (state.selectedVenue.includes(action.payload)) {
        state.selectedVenue = state.selectedVenue.filter(item => item !== action.payload);
      } else {
        state.selectedVenue.push(action.payload);
      }
    },
    setPagination: (state, action: PayloadAction<{ limit: number, offset: number }>) => {
      const { limit, offset } = action.payload
      
      state.limit = limit
      state.offset = offset
    },
    setLocationArr: (state, action: PayloadAction<string>) => {
      state.locationArr.push(action.payload)
    },
    resetLocationArr: (state) => {
      state.locationArr = ["Home", "Academy"];
    },
    setSelectedSlots: (state, action: PayloadAction<string | null>) => {
      state.selectedSlot = action.payload
      if (action.payload) {
        state.registrationFormDetails.slot = action.payload
      }
    },

    setRegistrationAcademy: (state, action: PayloadAction<InitialState['registrationFormDetails']>) => {
      state.registrationFormDetails = action.payload;
    }
  },
  extraReducers: (builder) => {
    // Handle the asynchronous fetchItems action
    builder
      .addMatcher(academiesApi.endpoints.fetchAcademies.matchPending, (state) => {
        state.status = "loading";
      })
      .addMatcher(
        academiesApi.endpoints.fetchAcademies.matchFulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.academies = action.payload.data.academies;
          state.count = action.payload.data.count;
        }
      )
      .addMatcher(
        academiesApi.endpoints.fetchAcademies.matchRejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      );
  },
})

export const { useFetchAcademiesQuery } = academiesApi
export const { setSelectedSportsStore, setSortByText, resetFilters, setSelectedVenue, setSelectedGroundType, setPagination, setLocationArr, resetLocationArr, setSelectedSlots, setRegistrationAcademy } = AcademiesSlice.actions
export default AcademiesSlice.reducer