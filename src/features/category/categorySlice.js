import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoryService from "./categoryService";

const initialState = {
  categories: [],
  status: "idle",
  error: null,
  singleCategory: {
    category: null,
    status: "idle",
    error: null,
  },
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

export const getACategory = createAsyncThunk(
  "category/get-one",
  async (id, thunkAPI) => {
    try {
      const response = await categoryService.getACategory(id);
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
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/update",
  async (data, thunkAPI) => {
    try {
      const response = await categoryService.updateCategory(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (id, thunkAPI) => {
    try {
      const response = await categoryService.deleteCategory(id);
      return response.data;
    } catch (error) {
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
    clearSingleCategory: (state) => {
      state.singleCategory.category = null;
      state.singleCategory.status = "idle";
      state.singleCategory.error = null;
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
      .addCase(getACategory.pending, (state) => {
        state.singleCategory.status = "loading";
      })
      .addCase(getACategory.fulfilled, (state, action) => {
        state.singleCategory.status = "success";
        state.singleCategory.category = action.payload;
        state.singleCategory.error = null;
      })
      .addCase(getACategory.rejected, (state, action) => {
        state.singleCategory.status = "rejected";
        state.singleCategory.error = action.payload.message;
      })
      .addCase(updateCategory.pending, (state) => {
        state.singleCategory.status = "loading";
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.singleCategory.status = "success";
        state.singleCategory.category = action.payload;
        state.singleCategory.error = null;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.singleCategory.status = "rejected";
        state.singleCategory.error = action.payload.message;
      })
      .addCase(addNewCategory.pending, (state) => {
        state.singleCategory.status = "loading";
      })
      .addCase(addNewCategory.fulfilled, (state, action) => {
        state.singleCategory.status = "succeed";
        state.singleCategory.error = null;
        state.singleCategory.category = action.payload;
      })
      .addCase(addNewCategory.rejected, (state, action) => {
        state.singleCategory.status = "rejected";
        state.singleCategory.error = action.payload.message;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.status = "deleting";
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (cat) => action.payload.id !== cat._id
        );
        state.error = null;
        state.status = "succeed";
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.message;
      });
  },
});

export const selectCategoriesData = (state) => state.categories.categories;
export const selectCategoriesError = (state) => state.categories.error;
export const selectCategoriesStatus = (state) => state.categories.status;

export const selectSingleCategoryError = (state) =>
  state.categories.singleCategory.error;
export const selectSingleCategoryStatus = (state) =>
  state.categories.singleCategory.status;
export const selectSingleCategoryData = (state) =>
  state.categories.singleCategory.category;

export const { resetReducer, clearSingleCategory } = categorySlice.actions;

export default categorySlice.reducer;
