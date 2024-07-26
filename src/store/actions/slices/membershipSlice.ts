import { APIEndPoints } from "@/APIEndpoint";
import { IJoinedMemberships, IMembership } from "@/interface/data";
import { RootState } from "@/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IncomingData {
  data: {
    count: number;
    memberships: IMembership[];
  };
  message: string;
  status: boolean;
}

interface JoinedMembershipsIncomingData {
  data: IJoinedMemberships[];
  message: string;
  status: boolean;
}

export const membershipsApi = createApi({
  reducerPath: "MembershipsApi",
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
    fetchMemberships: builder.query<IncomingData, object>({
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
          url: APIEndPoints.fetch_memberships,
          method: "GET",
          params: customParams,
        };
      },
    }),
    joinMembership: builder.mutation<IncomingData, { formData: FormData }>({
      query: (body) => {
        const { formData } = body;
        return {
          url: APIEndPoints.join_membership,
          method: "POST",
          body: formData,
          formData: true,
        };
      },
    }),
    myMemberships: builder.query<JoinedMembershipsIncomingData, object>({
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
          url: APIEndPoints.my_memberships,
          method: "GET",
          params: customParams,
        };
      },
    }),
  }),
});

interface InitialState {
  memberships: IMembership[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
  count: number | null;

  limit: number;
  offset: number;

  locationArr: string[];

  selectedSportsStore: string | null;
  sortByText: string[];
  selectedVenue: string[];
  selectedGroundType: string[];
  selectedSlot: {
    batch: "Morning" | "Evening";
    slots: string[]
  } | null;

  registrationFormDetails: {
    first_name: string;
    last_name: string;
    guardian_name: string;
    guardian_mobile: string;
    email: string;
    address: string;
    membership: string;
    sport: string;
    shift?: "morning" | "evening";
    customer: string;
    ground: string;
    city: string;
    venue: string;
    membership_fee: number;
    subscription_type?:
      | "Monthly"
      | "Quarterly"
      | "Half_Yearly"
      | "Yearly"
      | null;
    joining_fee: number;
    profile?: File | null;
    doc?: File | null;
    mobile: string;
  };

  joinedMemberships: IJoinedMemberships[];
}

const initialState: InitialState = {
  memberships: [],
  status: "idle",
  error: undefined,
  count: null,

  limit: 4,
  offset: 0,

  locationArr: ["Home", "Membership"],

  selectedSportsStore: null,
  sortByText: [],
  selectedVenue: [],
  selectedGroundType: [],

  selectedSlot: null,

  registrationFormDetails: {
    guardian_mobile: "",
    guardian_name: "",
    address: "",
    membership: "",
    city: "",
    customer: "",
    email: "",
    first_name: "",
    ground: "",
    last_name: "",
    shift: "morning",
    sport: "",
    subscription_type: null,
    venue: "",
    membership_fee: 0,
    joining_fee: 0,
    profile: null,
    doc: null,
    mobile: "",
  },

  joinedMemberships: [],
};

export const MembershipsSlice = createSlice({
  name: "MembershipsSlice",
  initialState,
  reducers: {
    setSelectedSportsStore: (state, action: PayloadAction<string | null>) => {
      state.selectedSportsStore = action.payload;
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
      state.selectedSportsStore = null;
      state.sortByText = [];
      state.selectedVenue = [];
    },
    setSelectedVenue: (state, action: PayloadAction<string>) => {
      if (state.selectedVenue.includes(action.payload)) {
        state.selectedVenue = state.selectedVenue.filter(
          (item) => item !== action.payload
        );
      } else {
        state.selectedVenue.push(action.payload);
      }
    },
    setPagination: (
      state,
      action: PayloadAction<{ limit: number; offset: number }>
    ) => {
      const { limit, offset } = action.payload;

      state.limit = limit;
      state.offset = offset;
    },
    setLocationArr: (state, action: PayloadAction<string>) => {
      const x = new Set(state.locationArr);
      state.locationArr = Array.from(x.add(action.payload));
    },
    resetLocationArr: (state) => {
      state.locationArr = ["Home", "Membership"];
    },
    setSelectedSlots: (state, action: PayloadAction<{ batch: "Morning" | "Evening", slots: string[] } | null>) => {
      state.selectedSlot = action.payload;
      if (action.payload) {
        state.registrationFormDetails.shift = action.payload.batch.toLowerCase() as "morning" | "evening";
      }
    },

    setRegistrationMembership: (
      state,
      action: PayloadAction<InitialState["registrationFormDetails"]>
    ) => {
      state.registrationFormDetails = {
        ...state.registrationFormDetails,
        ...action.payload,
      };
    },

    setSubscriptionType: (
      state,
      action: PayloadAction<{
        type: "Monthly" | "Quarterly" | "Half_Yearly" | "Yearly";
        fee: number;
      }>
    ) => {
      const { type, fee } = action.payload;
      state.registrationFormDetails.subscription_type = type;
      state.registrationFormDetails.membership_fee = fee;
    },
  },
  extraReducers: (builder) => {
    // Handle the asynchronous fetchItems action
    builder
      .addMatcher(
        membershipsApi.endpoints.fetchMemberships.matchPending,
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        membershipsApi.endpoints.fetchMemberships.matchFulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.memberships = action.payload.data.memberships;
          state.count = action.payload.data.count;
        }
      )
      .addMatcher(
        membershipsApi.endpoints.fetchMemberships.matchRejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      )
      .addMatcher(
        membershipsApi.endpoints.myMemberships.matchFulfilled,
        (state, action) => {
          state.joinedMemberships = action.payload.data;
        },
      );
  },
});

export const { useFetchMembershipsQuery, useJoinMembershipMutation, useMyMembershipsQuery } = membershipsApi;
export const { resetFilters, resetLocationArr, setLocationArr, setPagination, setSelectedGroundType, setSelectedSportsStore, setSelectedVenue, setSortByText, setSelectedSlots, setRegistrationMembership, setSubscriptionType } = MembershipsSlice.actions;
export default MembershipsSlice.reducer;
