import { APIEndPoints } from "@/APIEndpoint";
import { ISlot } from "@/interface/data";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IncomingData {
  data: {
    available_slots: ISlot[];
  };
  message: string;
  status: boolean;
}

export const slotsApi = createApi({
  reducerPath: "SlotsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: APIEndPoints.BackendURL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token") || "";
      if (token) {
        headers.set("authorization", token);
        headers.set("type", "admin");
        return headers;
      }
    },
  }),
  endpoints: (builder) => ({
    getAllSlots: builder.query<IncomingData, object>({
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
          url: APIEndPoints.get_slot,
          method: "GET",
          params: customParams,
        };
      },
    }),
  }),
});

interface InitialState {
  allSlots: ISlot[];
  total: number | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
  selectedGroundId: string;
  selectedSlots: string[];

  listOfPrices: {
    id: string;
    value: number;
  }[];
  totalPrice: number;

  prev: ISlot[];
}

const initialState: InitialState = {
  allSlots: [],
  total: null,
  status: "idle",
  error: undefined,
  selectedGroundId: "",
  selectedSlots: [],

  listOfPrices: [],
  totalPrice: 0,

  prev: [],
};

export const SlotsSlice = createSlice({
  name: "SlotsSlice",
  initialState,
  reducers: {
    setSelectedGroundId: (state, action: PayloadAction<string>) => {
      state.selectedGroundId = action.payload;
    },
    setSelectedSlots: (state, action: PayloadAction<string>) => {
      const slotPrice = state.allSlots.find(
        (i) => i.id === action.payload
      )?.price;

      if (state.selectedSlots.includes(action.payload)) {
        state.selectedSlots = state.selectedSlots.filter(
          (slot) => slot !== action.payload
        );

        state.listOfPrices = state.listOfPrices.filter(
          (price) => price.id !== action.payload
        );

        if (slotPrice) {
          state.totalPrice =
            state.totalPrice !== null
              ? Math.max(state.totalPrice - slotPrice, 0)
              : 0;
        }
      } else {
        state.selectedSlots.push(action.payload);
        state.listOfPrices.push({
          id: action.payload,
          value: slotPrice || 0,
        });
        if (slotPrice) {
          state.totalPrice =
            state.totalPrice !== null
              ? state.totalPrice + slotPrice
              : slotPrice;
        }
      }
    },
    resetSlots: (state) => {
      state.selectedSlots = []
      state.listOfPrices = []
      state.totalPrice = 0
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(slotsApi.endpoints.getAllSlots.matchPending, (state) => {
        state.status = "loading";
      })
      .addMatcher(
        slotsApi.endpoints.getAllSlots.matchFulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.allSlots = action.payload.data.available_slots;
          state.prev = action.payload.data.available_slots;
        }
      )
      .addMatcher(
        slotsApi.endpoints.getAllSlots.matchRejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      );
  },
});

export const { useGetAllSlotsQuery } = slotsApi;
export const { setSelectedGroundId, setSelectedSlots, resetSlots } = SlotsSlice.actions;
export default SlotsSlice.reducer;
