import { IAuth } from "@/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IAuth = {
  status: false,
  userData: null,
  token: null,
  hasToken: false,
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
        state.hasToken = true
      }
    },
    setAuth: (state, action: PayloadAction<Partial<IAuth>>) => {
      // console.log(action.payload)
      if (action.payload.userData !== undefined) {
        state.userData = action.payload.userData;
      }
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
      state.token = null;
      state.hasToken = false;
    },
  },
});

export const { login, setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
