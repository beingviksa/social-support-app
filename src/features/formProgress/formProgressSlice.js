import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step1Completed: false,
  step2Completed: false,
  step3Completed: false,
  formStarted: false,
  formCompleted: false,
};

const formProgressSlice = createSlice({
  name: "formProgress",
  initialState,
  reducers: {
    startForm: (state) => {
      state.formStarted = true;
    },
    completeStep: (state, action) => {
      const step = action.payload;
      state[`${step}Completed`] = true;
    },
    completeForm: (state) => {
      state.formCompleted = true;
    },
    resetFormProgress: () => initialState,
  },
});

export const { startForm, completeStep, completeForm, resetFormProgress } =
  formProgressSlice.actions;

export default formProgressSlice.reducer;
