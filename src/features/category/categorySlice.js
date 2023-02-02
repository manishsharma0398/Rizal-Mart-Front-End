import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoryService from "./categoryService";

const initialState = {
  categories: [],
  status: "idle",
  error: null,
};

export const getAllCategories = createAsyncThunk(
  "category/get-all",
  async (thunkAPI) => {
    try {
      const response = await categoryService.getCategories();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addNewCategory = createAsyncThunk(
  "category/add",
  async (newCoupon, thunkAPI) => {
    try {
      const response = await categoryService.addCategory(newCoupon);
      return response.data;
    } catch (error) {
      // return thunkAPI.rejectWithValue(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    resetReducer: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.status = "success";
        state.categories = action.payload;
        state.error = null;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.message;
      })
      .addCase(addNewCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addNewCategory.fulfilled, (state, action) => {
        state.status = "succeed";
        state.error = null;
        state.categories = action.payload;
      })
      .addCase(addNewCategory.rejected, (state, action) => {
        console.log(action);
        state.status = "rejected";
        state.error = action.payload.message;
      });
  },
});

export const selectCategoriesData = (state) => state.categories.categories;
export const selectCategoriesError = (state) => state.categories.error;
export const selectCategoriesStatus = (state) => state.categories.status;

export const { resetReducer } = categorySlice.actions;

export default categorySlice.reducer;
