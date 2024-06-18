import { APIEndPoints } from "@/APIEndpoint";
import { IVenue } from "@/interface/data";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
    createApi,
    fetchBaseQuery,

} from '@reduxjs/toolkit/query/react'

interface IncomingData {
    data: IVenue[]
    message: string
    status: boolean
}

export const venueApi = createApi({
    reducerPath: 'VenueApi',
    baseQuery: fetchBaseQuery({
        baseUrl: APIEndPoints.BackendURL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token')
                ? localStorage.getItem('token')
                : ''
            if (token) {
                headers.set('authorization', token)
                return headers
            }
        },
    }),
    endpoints: (builder) => ({
        getVenue: builder.query<IncomingData, object>({
            query: (params) => {
                const customParams = { ...params }
                Object.keys(customParams).forEach((key) => {
                    if (
                        customParams[key as keyof object] === null ||
                        customParams[key as keyof object] === undefined ||
                        customParams[key as keyof object] === '' ||
                        customParams[key as keyof object] === '[]'
                    ) {
                        delete customParams[key as keyof object]
                    }
                })
                return {
                    url: APIEndPoints.fetch_venue,
                    method: 'GET',
                    params: customParams,
                }
            },
        }),


    }),
})


interface IInitialState {
    isFilter: boolean
    venues: IVenue[]
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | undefined
    prev: IVenue[]
    selectedVenue: string[]
}
const initialState: IInitialState = {
    isFilter: true,
    venues: [],
    status: 'idle',
    error: undefined,
    prev: [],
    selectedVenue: []
};


export const VenueSlice = createSlice({
    name: "VenueSlice",
    initialState,
    reducers: {

        setSelectedVenue: (state, action: PayloadAction<{ venueId: string }>) => {
            const { venueId } = action.payload;
            if (venueId) {
                if (state.selectedVenue.includes(venueId)) {
                    state.selectedVenue = state.selectedVenue.filter((id) => id !== venueId);

                } else {
                    state.selectedVenue.push(venueId);
                }
            }
            else {
                state.selectedVenue = []
            }

        },

    },

    extraReducers: (builder) => {
        // Handle the asynchronous fetchItems action
        builder
            .addMatcher(venueApi.endpoints.getVenue.matchPending, (state) => {
                state.status = 'loading'
            })
            .addMatcher(
                venueApi.endpoints.getVenue.matchFulfilled,
                (state, action) => {
                    state.status = 'succeeded'
                    state.venues = action.payload.data
                    state.prev = action.payload.data

                }
            )
            .addMatcher(
                venueApi.endpoints.getVenue.matchRejected,
                (state, action) => {
                    state.status = 'failed'
                    state.error = action.error.message
                }
            )
    },
});

export const { useGetVenueQuery } = venueApi
export const { setSelectedVenue } = VenueSlice.actions
export default VenueSlice.reducer