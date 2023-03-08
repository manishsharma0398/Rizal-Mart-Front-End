import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login } from "../auth/authSlice";
import cartService from "./cartService";

const initialState = {
  showCart: false,
  cartProducts: [],
  status: "idle",
  error: null,
};

export const addToCart = createAsyncThunk(
  "cart/add-product",
  async (data, thunkAPI) => {
    try {
      const response = await cartService.addToCart(data);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteFromCart = createAsyncThunk(
  "cart/delete-product",
  async (data, thunkAPI) => {
    try {
      const response = await cartService.deleteFromCart(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getCartItems = createAsyncThunk(
  "cart/get-products",
  async (thunkAPI) => {
    try {
      const response = await cartService.getCartItems();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartToggler(state, action) {
      state.showCart = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.cartProducts = action.payload.user.userCart;
      })
      .addCase(addToCart.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.error = null;
        state.cartProducts = action.payload;
        state.status = "added";
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "add-to-cart-error";
        state.error = action.payload.message;
      })
      .addCase(deleteFromCart.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteFromCart.fulfilled, (state, action) => {
        state.error = null;
        state.cartProducts = action.payload;
        state.status = "deleted";
      })
      .addCase(deleteFromCart.rejected, (state, action) => {
        state.status = "delete-from-cart-error";
        state.error = action.payload.message;
      })
      .addCase(getCartItems.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.error = null;
        state.cartProducts = action.payload;
        state.status = "fetched";
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.status = "get-from-cart-error";
        state.error = action.payload.message;
      });
  },
});

export const selectCartItems = (state) => state.cart.cartProducts;
export const selectShowCart = (state) => state.cart.showCart;

export const { cartToggler } = cartSlice.actions;

export default cartSlice.reducer;
