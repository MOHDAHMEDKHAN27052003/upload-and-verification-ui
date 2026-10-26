import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OtpState {
  email: string;
}

const initialState: OtpState = {
  email: "",
};

const otpSlice = createSlice({
  name: "otp",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    clearEmail: (state) => {
      state.email = "";
    },
  },
});

export const { setEmail, clearEmail } = otpSlice.actions;
export default otpSlice.reducer;