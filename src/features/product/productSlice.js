import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productsService from "./productService";

const initialState = {
  products: [],
  status: "idle",
  error: null,
  singleProduct: {
    product: null,
    status: "idle",
    error: null,
  },
  bannerProducts: {
    products: [],
    status: "idle",
    error: null,
  },
};

export const getAllProducts = createAsyncThunk(
  "products/get-all",
  async (queries, thunkAPI) => {
    try {
      const response = await productsService.getProducts(queries);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getAProduct = createAsyncThunk(
  "products/get-one",
  async (id, thunkAPI) => {
    try {
      const response = await productsService.getAProduct(id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addNewProduct = createAsyncThunk(
  "products/add",
  async (productData, thunkAPI) => {
    const { images, ...other } = productData;
    console.log(other);

    try {
      const formData = new FormData();
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        formData.append("images", image);
      }

      for (const [key, value] of Object.entries(other)) {
        formData.append(key, value);
      }

      const response = await productsService.addProduct(formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id, thunkAPI) => {
    try {
      const response = await productsService.deleteProduct(id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getBannerProducts = createAsyncThunk(
  "products/get-banner-products",
  async (thunkAPI) => {
    try {
      const response = await productsService.getBannerProducts();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearSingleProduct: (state) => {
      state.singleProduct.product = null;
      state.singleProduct.status = "idle";
      state.singleProduct.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBannerProducts.pending, (state) => {
        state.bannerProducts.status = "loading";
        state.bannerProducts.error = null;
      })
      .addCase(getBannerProducts.fulfilled, (state, action) => {
        state.bannerProducts.status = "success";
        state.bannerProducts.products = action.payload;
        state.bannerProducts.error = null;
      })
      .addCase(getBannerProducts.rejected, (state, action) => {
        state.bannerProducts.status = "rejected";
        state.bannerProducts.error = action.payload.message;
        state.bannerProducts.products = null;
      })
      .addCase(getAProduct.pending, (state) => {
        state.singleProduct.status = "loading";
        state.singleProduct.error = null;
      })
      .addCase(getAProduct.fulfilled, (state, action) => {
        state.singleProduct.status = "success";
        state.singleProduct.product = action.payload;
        state.singleProduct.error = null;
      })
      .addCase(getAProduct.rejected, (state, action) => {
        state.singleProduct.status = "rejected";
        state.singleProduct.error = action.payload.message;
        state.singleProduct.product = null;
      })
      .addCase(getAllProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.products = action.payload;
        state.status = "done";
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.message;
        state.products = null;
      })
      .addCase(addNewProduct.pending, (state) => {
        state.singleProduct.status = "loading";
        state.singleProduct.error = null;
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.singleProduct.status = "added";
        state.singleProduct.error = null;
        state.singleProduct.product = action.payload;
      })
      .addCase(addNewProduct.rejected, (state, action) => {
        state.singleProduct.product = null;
        state.singleProduct.status = "rejected";
        state.singleProduct.error = action.payload.message;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.status = "deleting";
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (prod) => action.payload.id !== prod._id
        );
        state.error = null;
        state.status = "deleted";
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = "rejected";
        // state.error = action.payload.message;
        state.products = null;
      });
  },
});

export const selectProductsError = (state) => state.products.error;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsData = (state) => state.products.products;

export const selectSingleProduct = (state) =>
  state.products.singleProduct.product;
export const selectSingleProductError = (state) =>
  state.products.singleProduct.error;
export const selectSingleProductStatus = (state) =>
  state.products.singleProduct.status;

export const selectBannerProducts = (state) =>
  state.products.bannerProducts.products;
export const selectBannerProductsError = (state) =>
  state.products.bannerProducts.error;
export const selectBannerProductsStatus = (state) =>
  state.products.bannerProducts.status;

export const { clearSingleProduct } = productSlice.actions;

export default productSlice.reducer;
