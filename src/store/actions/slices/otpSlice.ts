import { createSlice, PayloadAction } from "@reduxjs/toolkit"

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

export const { setStartTimer, setRemainingTime, setRequestTime } = otpSlice.actions
export default otpSlice.reducer