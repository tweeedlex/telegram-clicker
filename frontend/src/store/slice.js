import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    telegramData: {},
    isAdmin: false,
  },
  reducers: {
    setTelegramData: (state, action) => {
      state.telegramData = action.payload;
    },
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
  },
});

export const {
  setTelegramData,
  setIsAdmin
} = dataSlice.actions;

export default dataSlice.reducer;