import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customersService from "./customersService";

const initialState = {
  customers: [],
  status: "idle",
  error: null,
};

export const getAllUsers = createAsyncThunk(
  "customers/get-all",
  async (thunkAPI) => {
    try {
      const response = await customersService.getUsers();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: () => {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.status = "success";
        state.customers = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.message;
      });
  },
});

export const selectCustomerData = (state) => state.customer.customers;
export const selectCustomerError = (state) => state.customer.error;
export const selectCustomerStatus = (state) => state.customer.status;

export default customerSlice.reducer;
