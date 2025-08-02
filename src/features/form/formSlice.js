import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("formData")) || {
  personal: { isVerified: false },
  financial: {},
  situation: {},
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    savePersonal: (state, action) => {
      state.personal = { ...state.personal, ...action.payload };
      localStorage.setItem("formData", JSON.stringify(state));
    },
    saveFinancial: (state, action) => {
      state.financial = { ...state.financial, ...action.payload };
      localStorage.setItem("formData", JSON.stringify(state));
    },
    saveSituation: (state, action) => {
      state.situation = { ...state.situation, ...action.payload };
      localStorage.setItem("formData", JSON.stringify(state));
    },
    resetForm: () => {
      localStorage.removeItem("formData");
      return {
        personal: {},
        financial: {},
        situation: {},
      };
    },
  },
});

export const { savePersonal, saveFinancial, saveSituation, resetForm } =
  formSlice.actions;

export default formSlice.reducer;
