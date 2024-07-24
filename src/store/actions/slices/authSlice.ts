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
      // const stateAuth = localStorage.getItem("persist:d3-root")
      // console.log(Object.keys(JSON.parse(JSON.stringify(stateAuth))))
      // console.log(state.auth)
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
  status: false,
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
      action: PayloadAction<{ status?: boolean; token?: string }>
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
    // setAuthAcademies: (state, action: PayloadAction<string>) => {
    //   if (state.userData && state.userData.joined_academies) {
    //     state.userData.joined_academies?.push(action.payload);
    //   }
    // },
    // setAuthMemberships: (state, action: PayloadAction<string>) => {
    //   if (state.userData && state.userData.joined_memberships) {
    //     state.userData.joined_memberships?.push(action.payload);
    //   }
    // },
    // setFavorites: (state, action: PayloadAction<string>) => {
    //   if (state.userData && state.userData.favorites === undefined)
    //     state.userData.favorites = [];

    //   if (state.userData && state.userData.favorites) {
    //     if (state.userData.favorites.includes(action.payload)) {
    //       state.userData.favorites = state.userData.favorites.filter(
    //         (item) => item !== action.payload
    //       );
    //     } else {
    //       state.userData.favorites.push(action.payload);
    //     }
    //   }
    // },
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
      state.status = false;
      state.userData = null;
      state.token = null;
      state.hasToken = false;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.verifySession.matchFulfilled,
      (state, action) => {
        if (action.payload.status) {
          state.status = true;
          state.userData = { ...state.userData, ...action.payload.data };
          state.hasToken = true;
        }
      }
    );
  },
});

export const { useVerifySessionQuery, useUpdateProfileMutation } = authApi;
export const {
  login,
  setAuth,
  // setAuthAcademies,
  // setAuthMemberships,
  // setFavorites,
  setProfile,
  logout,
} = authSlice.actions;
export default authSlice.reducer;
