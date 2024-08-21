import { APIEndPoints } from "@/APIEndpoint";
import { IAuth } from "@/interface";
import { RootState } from "@/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IncomingData {
  status: string;
  message: string;
  data: IAuth;
}

interface ProfileUpdateIncomingData {
  status: string;
  message: string;
  data: {
    id: string;
  };
}

export const authApi = createApi({
  reducerPath: "AuthApi",
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
    verifySession: builder.query<IncomingData, object>({
      query: () => {
        return {
          url: APIEndPoints.verify_session,
          method: "GET",
        };
      },
    }),

    updateProfile: builder.mutation<
      ProfileUpdateIncomingData,
      { formData: FormData }
    >({
      query: (body) => {
        const { formData } = body;
        return {
          url: APIEndPoints.update_profile,
          method: "POST",
          body: formData,
          formData: true,
        };
      },
    }),
  }),
});

const initialState: IAuth = {
  status: "idle",
  error: undefined,
  userData: null,
  token: null,
  hasToken: false,

  info_memberships: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ status?: "idle" | "loading" | "succeeded" | "failed"; token?: string }>
    ) => {
      if (action.payload.status !== undefined) {
        state.status = action.payload.status;
      }
      if (action.payload.token !== undefined) {
        state.token = action.payload.token;
        state.hasToken = true;
      }
    },
    setAuth: (state, action: PayloadAction<Partial<IAuth>>) => {
      if (action.payload.userData !== undefined) {
        state.userData = action.payload.userData;
      }
    },
    setProfile: (
      state,
      action: PayloadAction<{
        first_name: string;
        last_name: string;
        email: string;
        profile_img: string;
      }>
    ) => {
      state.userData = { ...state.userData, ...action.payload };
    },
    logout: (state) => {
      state.status = "idle";
      state.userData = null;
      state.token = null;
      state.hasToken = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.verifySession.matchPending,
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        authApi.endpoints.verifySession.matchFulfilled,
        (state, action) => {
          if (action.payload.status) {
            state.status = "succeeded";
            state.userData = { ...state.userData, ...action.payload.data };
            state.hasToken = true;
          }
        }
      )
      .addMatcher(
        authApi.endpoints.verifySession.matchRejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      );
  },
});

export const { useVerifySessionQuery, useUpdateProfileMutation } = authApi;
export const {
  login,
  setAuth,
  setProfile,
  logout,
} = authSlice.actions;
export default authSlice.reducer;
