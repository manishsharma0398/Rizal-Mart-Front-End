import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import couponService from "./couponService";

const initialState = {
  coupons: [],
  status: "idle",
  error: null,
};

export const getAllCoupons = createAsyncThunk(
  "coupon/get-all",
  async (thunkAPI) => {
    try {
      const response = await couponService.getCoupons();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: () => {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCoupons.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllCoupons.fulfilled, (state, action) => {
        state.status = "success";
        state.coupons = action.payload;
      })
      .addCase(getAllCoupons.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.message;
      });
  },
});

export const selectCouponsData = (state) => state.coupons.coupons;
export const selectCouponsError = (state) => state.coupons.error;
export const selectCouponsStatus = (state) => state.coupons.status;

export default couponSlice.reducer;
