import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orderService from "./ordersService";

const initialState = {
  orders: [],
  status: "idle",
  error: null,
};

export const getAllOrders = createAsyncThunk(
  "orders/get-all",
  async (thunkAPI) => {
    try {
      const response = await orderService.getOrders();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: () => {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.status = "success";
        state.orders = action.payload;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.message;
      });
  },
});

export const selectOrdersData = (state) => state.orders.orders;
export const selectOrdersError = (state) => state.orders.error;
export const selectOrdersStatus = (state) => state.orders.status;

export default orderSlice.reducer;
