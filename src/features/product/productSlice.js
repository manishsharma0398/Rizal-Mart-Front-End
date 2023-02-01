import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productsService from "./productService";

const initialState = {
  products: [],
  status: "idle",
  error: null,
};

export const getAllProducts = createAsyncThunk(
  "products/get-all",
  async (thunkAPI) => {
    try {
      const response = await productsService.getProducts();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addNewProduct = createAsyncThunk(
  "products/add",
  async (productData, thunkAPI) => {
    try {
      const response = await productsService.addProduct(productData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: () => {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.message;
      })
      .addCase(addNewProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.status = "success";
        state.products.push(action.payload);
      })
      .addCase(addNewProduct.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.message;
      });
  },
});

export const selectProductsData = (state) => state.products.products;
export const selectProductsError = (state) => state.products.error;
export const selectProductsStatus = (state) => state.products.status;

export default productSlice.reducer;
