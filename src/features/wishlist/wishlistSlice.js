import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import wishlistService from "./wishlistService";

const initialState = {
  products: [],
  status: "idle",
  error: null,
};

export const getWishlistProducts = createAsyncThunk(
  "wishlist/get-products",
  async (thunkAPI) => {
    try {
      const response = await wishlistService.getWishlist();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addToWishlist = createAsyncThunk(
  "wishlist/add-products",
  async (prodId, thunkAPI) => {
    try {
      const response = await wishlistService.addToWishlist(prodId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: () => {},
  extraReducers: (builder) => {
    builder
      .addCase(getWishlistProducts.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getWishlistProducts.fulfilled, (state, action) => {
        state.status = "fetched";
        state.error = null;
        state.products = action.payload;
      })
      .addCase(getWishlistProducts.rejected, (state, action) => {
        state.status = "fetch-error";
        state.error = action.payload.message;
        state.products = [];
      })
      .addCase(addToWishlist.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.status = "added";
        state.error = null;
        state.products = action.payload;
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.status = "adding-error";
        state.error = action.payload.message;
        state.products = [];
      });
  },
});

export const selectWishListProducts = (state) => state.wishlist.products;
export const selectWishListError = (state) => state.wishlist.error;
export const selectWishListStatus = (state) => state.wishlist.status;

export default wishlistSlice.reducer;
