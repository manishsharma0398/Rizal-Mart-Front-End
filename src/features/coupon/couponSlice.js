import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import couponService from "./couponService";

const initialState = {
  coupons: [],
  singleCoupon: {
    coupon: null,
    status: "init",
    error: null,
  },
  status: "init",
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

export const addNewCoupon = createAsyncThunk(
  "coupon/add",
  async (newCoupon, thunkAPI) => {
    try {
      const response = await couponService.addCoupon(newCoupon);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteCoupon = createAsyncThunk(
  "coupon/delete",
  async (id, thunkAPI) => {
    try {
      const response = await couponService.deleteCoupon(id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateCoupon = createAsyncThunk(
  "coupon/update",
  async (data, thunkAPI) => {
    try {
      const response = await couponService.updateCoupon(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getACoupon = createAsyncThunk(
  "coupon/get-one",
  async (id, thunkAPI) => {
    try {
      const response = await couponService.getACoupon(id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    clearSingleCoupon: (state) => {
      state.singleCoupon.coupon = null;
      state.singleCoupon.status = "init";
      state.singleCoupon.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCoupons.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllCoupons.fulfilled, (state, action) => {
        state.status = "success";
        state.coupons = action.payload;
        state.error = null;
      })
      .addCase(getAllCoupons.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.message;
      })
      .addCase(getACoupon.pending, (state) => {
        state.singleCoupon.status = "loading";
      })
      .addCase(getACoupon.fulfilled, (state, action) => {
        state.singleCoupon.status = "success";
        state.singleCoupon.coupon = action.payload;
        state.singleCoupon.error = null;
      })
      .addCase(getACoupon.rejected, (state, action) => {
        state.singleCoupon.status = "rejected";
        state.singleCoupon.error = action.payload.message;
      })
      .addCase(addNewCoupon.pending, (state) => {
        state.singleCoupon.status = "loading";
      })
      .addCase(addNewCoupon.fulfilled, (state, action) => {
        state.singleCoupon.status = "succeed";
        state.singleCoupon.error = null;
        state.singleCoupon.coupon = action.payload;
      })
      .addCase(addNewCoupon.rejected, (state, action) => {
        state.singleCoupon.status = "rejected";
        state.singleCoupon.error = action.payload.message;
      })
      .addCase(deleteCoupon.pending, (state) => {
        state.status = "deleting";
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.coupons = state.coupons.filter(
          (coupon) => action.payload.id !== coupon._id
        );
        state.error = null;
        state.status = "succeed";
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.message;
      })
      .addCase(updateCoupon.pending, (state) => {
        state.singleCoupon.status = "updating";
      })
      .addCase(updateCoupon.fulfilled, (state, action) => {
        state.singleCoupon.status = "updated";
        state.singleCoupon.error = null;
        state.singleCoupon.coupon = action.payload;
      })
      .addCase(updateCoupon.rejected, (state, action) => {
        state.singleCoupon.status = "rejected";
        state.singleCoupon.error = action.payload.message;
      });
  },
});

export const selectCouponsData = (state) => state.coupons.coupons;
export const selectCouponsError = (state) => state.coupons.error;
export const selectCouponsStatus = (state) => state.coupons.status;

export const selectSingleCoupon = (state) => state.coupons.singleCoupon.coupon;
export const selectSingleCouponError = (state) =>
  state.coupons.singleCoupon.error;
export const selectSingleCouponStatus = (state) =>
  state.coupons.singleCoupon.status;

export const { clearSingleCoupon } = couponSlice.actions;

export default couponSlice.reducer;
