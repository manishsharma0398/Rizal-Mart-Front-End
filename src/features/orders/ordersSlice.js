import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orderService from "./ordersService";

const initialState = {
  orders: [],
  orderProducts: [],
  status: "idle",
  error: null,
  addressState: {
    address: [],
    status: "idle",
    error: null,
  },
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

export const getAddress = createAsyncThunk(
  "orders/get-address",
  async (thunkAPI) => {
    try {
      const response = await orderService.getAddress();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addAddress = createAsyncThunk(
  "orders/add-address",
  async (data, thunkAPI) => {
    try {
      const response = await orderService.addNewAddress(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrdersFromCart: (state, action) => {
      state.orderProducts = action.payload;
      state.error = null;
      state.status = "added-from-cart";
    },
    updateProductCount: (state, action) => {
      state.orderProducts = state.orderProducts
        .map((order) => {
          if (order._id === action.payload._id) {
            return action.payload;
          } else {
            return order;
          }
        })
        .filter((product) => product.count > 0);
    },
    removeProductFromOrders: (state, action) => {
      state.orderProducts = state.orderProducts.filter(
        (product) => product.product._id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.status = "success";
        state.orderProducts = action.payload;
        state.error = null;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.message;
      })
      .addCase(getAddress.pending, (state) => {
        state.addressState.status = "loading";
      })
      .addCase(getAddress.fulfilled, (state, action) => {
        state.addressState.status = "success";
        state.addressState.address = action.payload;
      })
      .addCase(getAddress.rejected, (state, action) => {
        state.addressState.status = "rejected";
        state.addressState.error = action.payload.message;
      })
      .addCase(addAddress.pending, (state) => {
        state.addressState.status = "adding";
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.addressState.status = "success";
        state.addressState.address = action.payload;
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.addressState.status = "rejected";
        state.addressState.error = action.payload.message;
      });
  },
});

export const selectOrdersData = (state) => state.orders.orders;
export const selectOrdersError = (state) => state.orders.error;
export const selectOrdersStatus = (state) => state.orders.status;

export const selectUserAddresses = (state) => state.orders.addressState;

export const selectOrderProducts = (state) => state.orders.orderProducts;

export const {
  setOrdersFromCart,
  updateProductCount,
  removeProductFromOrders,
} = orderSlice.actions;

export default orderSlice.reducer;
