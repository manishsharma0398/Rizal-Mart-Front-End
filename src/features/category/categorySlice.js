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

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: () => {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.status = "success";
        state.categories = action.payload;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.message;
      });
  },
});

export const selectCategoriesData = (state) => state.categories.categories;
export const selectCategoriesError = (state) => state.categories.error;
export const selectCategoriesStatus = (state) => state.categories.status;

export default categorySlice.reducer;
