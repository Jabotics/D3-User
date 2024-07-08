import { APIEndPoints } from "@/APIEndpoint";
import { IPromo } from "@/interface/data"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery, FetchBaseQueryMeta } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/store";
interface IncomingData {
    data: IPromo[],
    message: string;
    status: string;
}

export const promoCodeApi = createApi({
    reducerPath: 'PromoCodeApi',
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
        getPromo: builder.query<IncomingData, object>({
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
                    url: APIEndPoints.fetch_promo,
                    method: "GET",
                    params: customParams,
                }
            }
        }),
        applyPromo: builder.mutation<IncomingData, object>({
            query: (body) => {
                const { ...rest } = body
                return {
                    url: APIEndPoints.apply_promo,
                    method: 'POST',
                    body: rest,
                }
            },
            transformResponse(
                Response: unknown,
                meta: FetchBaseQueryMeta | undefined
            ): IncomingData | Promise<IncomingData> {
                if (meta?.response?.headers.get('authorization')) {
                    localStorage.setItem(
                        'token',
                        String(meta?.response?.headers.get('authorization'))
                    )
                }
                return Response as IncomingData
            },
        }),
    })

});

interface InitialState {
    data: IPromo[];
    total: number | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | undefined;
    prev: IPromo[];
    newPrice: {
        amount: number,
        discount: number
    };
    selectedPromo: IPromo | null
}

const initialState: InitialState = {
    data: [],
    total: null,
    status: "idle",
    error: undefined,
    prev: [],
    newPrice: {
        amount: 0,
        discount: 0
    },
    selectedPromo: null
}

export const PromoSlice = createSlice({
    name: "PromoSlice",
    initialState,
    reducers: {
        setNewPrice: (state, action: PayloadAction<{ data: { amount: number, discount: number } }>) => {
            state.newPrice = action.payload.data;
        },
        setSelectedPromo: (state, action: PayloadAction<{ promo: IPromo }>) => {
            const newPromo = action.payload.promo;
            const currentPromo = state.selectedPromo;

            // Check if the new promo is the same as the current one
            const isSamePromo = currentPromo && newPromo && currentPromo.code === newPromo.code;

            if (!isSamePromo) {
                state.selectedPromo = newPromo;
            }
        },
        removeSelectedProomo: (state) => {
            state.selectedPromo = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(promoCodeApi.endpoints.getPromo.matchPending, (state) => {
                state.status = "loading";
            })
            .addMatcher(
                promoCodeApi.endpoints.getPromo.matchFulfilled,
                (state, action) => {
                    state.status = "succeeded";
                    state.data = action.payload.data;
                    state.prev = action.payload.data;
                }
            )
            .addMatcher(
                promoCodeApi.endpoints.getPromo.matchRejected,
                (state, action) => {
                    state.status = "failed";
                    state.error = action.error.message;
                }
            );
    },
});

export const { useGetPromoQuery, useApplyPromoMutation } = promoCodeApi;
export const { setNewPrice, setSelectedPromo, removeSelectedProomo } = PromoSlice.actions;
export default PromoSlice.reducer;