import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "@/store";
import {  createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIEndPoints } from "@/APIEndpoint";

export const logoutApi = createApi({
  reducerPath: "LogoutApi",
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
      console.log(headers.get("authorization"))
      return headers;
    },
  }),
  endpoints: (builder) => ({
    logout: builder.query({
      query: () => {
        return {
          url: APIEndPoints.logout,
          method: "GET",
        };
      },
    })
  })
})

interface IOTP {
  startTimer: boolean
  remainingTime: number
  lastOtpRequestTime: string | null
}

const initialState: IOTP = {
  startTimer: true,
  remainingTime: 30,
  lastOtpRequestTime: null,
}

export const otpSlice = createSlice({
  name: "otp",
  initialState,
  reducers: {
    setStartTimer: (state, action: PayloadAction<boolean>) => {
      state.startTimer = action.payload
    },
    setRemainingTime: (state, action: PayloadAction<{ time: number }>) => {
      state.remainingTime = action.payload.time
    },
    setRequestTime: (state, action: PayloadAction<{ time: string | null }>) => {
      state.lastOtpRequestTime = action.payload.time;
    },
  }
});

export const { useLogoutQuery } = logoutApi
export const { setStartTimer, setRemainingTime, setRequestTime } = otpSlice.actions
export default otpSlice.reducer