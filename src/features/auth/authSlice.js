import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import authService from "./authService";

const initialState = {
  currentUser: localStorage.getItem("rizal_mart")
    ? JSON.parse(localStorage.getItem("rizal_mart"))
    : [],
  status: "idle",
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (loginData, thunkAPI) => {
    try {
      const response = await authService.login(loginData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: () => {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "logging";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.error = null;
        state.status = "loggedIn";
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.message;
        state.currentUser = null;
      });
  },
});

export const selectAuthError = (state) => state?.auth?.error;
export const selectAuthStatus = (state) => state?.auth?.status;
export const selectUserData = (state) => state?.auth?.currentUser?.user;
export const selectUserToken = (state) => state?.auth?.currentUser?.token;
// export const selectUserId = (state) => state?.auth?.currentUser?.user?._id;

export default authSlice.reducer;
