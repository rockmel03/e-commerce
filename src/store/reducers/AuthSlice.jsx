import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginStatus: false,
  currentUser: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state = { ...state, ...action.payload };
    },
  },
});

export const { setAuth } = AuthSlice.actions;

export default AuthSlice.reducer;
