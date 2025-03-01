import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  service: [],
};

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {},
});

export const {} = serviceSlice.actions;
export default serviceSlice.reducer;
