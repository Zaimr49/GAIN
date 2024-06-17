// src/redux/slices/User_Slice.js
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    email: null,
    _id: null
  },
  reducers: {
    setUserData: (state, action) => {
      const { email, _id } = action.payload;
      state.email = email;
      state._id = _id;
    },
    clearUserData: (state) => {
      state.email = null;
      state._id = null;
    },
  },
});

export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
