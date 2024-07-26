import { APIEndPoints } from "@/APIEndpoint";
import { IEvent } from "@/interface/data";
import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery, FetchBaseQueryMeta } from "@reduxjs/toolkit/query/react";

interface IncomingData {
  data: {
    count: number;
    events: IEvent[];
  };
  message: string;
  status: boolean;
}

export const eventsApi = createApi({
  reducerPath: "EventsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: APIEndPoints.BackendURL,
  }),
  endpoints: (builder) => ({
    fetchEvents: builder.query<IncomingData, object>({
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
          url: APIEndPoints.fetch_events,
          method: "GET",
          params: customParams,
        };
      },
    }),
    addEventRequest: builder.mutation<IncomingData, object>({
      query: (body) => {
        const { ...rest } = body;
        return {
          url: APIEndPoints.add_event_request,
          method: "POST",
          body: rest,
        };
      },
      transformResponse(
        Response: unknown,
        meta: FetchBaseQueryMeta | undefined
      ): IncomingData | Promise<IncomingData> {
        if (meta?.response?.headers.get("authorization")) {
          localStorage.setItem(
            "token",
            String(meta?.response?.headers.get("authorization"))
          );
        }
        return Response as IncomingData;
      },
    }),
  }),
});

interface InitialState {
  total: number | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
  events: IEvent[];
}

const initialState: InitialState = {
  total: null,
  status: "idle",
  error: undefined,
  events: [],
};

export const EventsSlice = createSlice({
  name: "EventsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle the asynchronous fetchItems action
    builder
      .addMatcher(eventsApi.endpoints.fetchEvents.matchPending, (state) => {
        state.status = "loading";
      })
      .addMatcher(
        eventsApi.endpoints.fetchEvents.matchFulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.events = action.payload.data.events;
          state.total = action.payload.data.count;
        }
      )
      .addMatcher(
        eventsApi.endpoints.fetchEvents.matchRejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      );
  },
});

export const { useFetchEventsQuery, useAddEventRequestMutation } = eventsApi
// export const {} = EventsSlice.actions
export default EventsSlice.reducer
