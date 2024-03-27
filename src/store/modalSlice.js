import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: { activeuser: null },
  reducers: {
    activeUser: (state, action) => {
      return { activeuser: action.payload };
    },
  },
});

export default modalSlice.reducer;

export const { activeUser } = modalSlice.actions;
