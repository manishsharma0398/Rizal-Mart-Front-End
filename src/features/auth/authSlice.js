import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

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

export const logout = createAsyncThunk("auth/logout", async (thunkAPI) => {
  try {
    const response = await authService.logout();
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const checkTokenExpired = async (thunkAPI) => {
  try {
    const token = thunkAPI.getState()?.auth?.currentUser?.token;
    const decoded = jwt_decode(token);
    return decoded;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: () => {},
  extraReducers: (builder) => {
    builder
      // .addCase(checkTokenExpired.pending, (state) => {
      //   state.status = "logging";
      //   state.error = null;
      // })
      .addCase(checkTokenExpired.fulfilled, (state, action) => {
        console.log(action.payload);
        // state.currentUser = action.payload;
        // state.error = null;
        // state.status = "loggedIn";
      })
      .addCase(checkTokenExpired.rejected, (state, action) => {
        console.log(action.payload);
        // state.status = "rejected";
        // state.error = action.payload.message;
        // state.currentUser = null;
      })
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
      })
      .addCase(logout.pending, (state) => {
        state.status = "logging-out";
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.currentUser = null;
        state.error = null;
        state.status = "idle";
        localStorage.setItem("rizal_mart", "");
        localStorage.removeItem("rizal_mart");
      })
      .addCase(logout.rejected, (state, action) => {
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
