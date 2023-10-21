//for diff purpose/api
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const studentData = createSlice({
  name: "studentData",
  initialState,
  reducers: {
    addData: (state, action) => {
      state.data = [...state.data, action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addData } = studentData.actions;

export default studentData.reducer;
