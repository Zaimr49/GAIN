import { createSlice } from "@reduxjs/toolkit";

export const unpersisted_counterSlice = createSlice({
  initialState: 0,
  name: "unpersisted_counter",
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
  },
});

export const { decrement, increment } = unpersisted_counterSlice.actions;
export default unpersisted_counterSlice.reducer;
