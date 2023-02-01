import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const initialState = {
  currentUser: localStorage.getItem("rizal_mart")
    ? JSON.parse(localStorage.getItem("rizal_mart"))
    : [],
  status: "idle",
  error: null,
};

export const adminLogin = createAsyncThunk(
  "auth/admin-login",
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
      .addCase(adminLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.status = "success";
        state.currentUser = action.payload;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.message;
      });
  },
});

export const selectAuthData = (state) => state.user.currentUser;
export const selectCurrentUser = (state) => state.user.currentUser._id;
export const selectAuthError = (state) => state.user.error;
export const selectAuthStatus = (state) => state.user.status;

export default authSlice.reducer;
