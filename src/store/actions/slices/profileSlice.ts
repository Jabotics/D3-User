
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  title: "Academy" | "My Booking" | "Memberships" | "Favorite" | "Logout";
}

const initialState: InitialState = {
  title: "My Booking",
};

export const ProfileSlice = createSlice({
  name: "ProfileSlice",
  initialState,
  reducers: {
    setTitle: (
      state,
      action: PayloadAction<
        "Academy" | "My Booking" | "Memberships" | "Favorite" | "Logout"
      >
    ) => {
      state.title = action.payload;
    },
  },
});

export const { setTitle } = ProfileSlice.actions;
export default ProfileSlice.reducer;
