import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    setTelegramData: {}
  },
  reducers: {
    setTelegramData: (state, action) => {
      state.telegramData = action.payload;
    }
  },
});

export const {
  setTelegramData,
} = dataSlice.actions;

export default dataSlice.reducer;