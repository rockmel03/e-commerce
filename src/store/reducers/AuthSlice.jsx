import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginStatus: false,
  userData: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.loginStatus = true;
      state.userData = action.payload;
    },
    logout: (state, action) => {
      state.loginStatus = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = AuthSlice.actions;

export default AuthSlice.reducer;
