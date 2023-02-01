import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import uploadServices from "./uploadService";

const initialState = {
  images: [],
  status: "idle",
  error: null,
};

export const uploadImages = createAsyncThunk(
  "upload/product-image",
  async (images, thunkAPI) => {
    try {
      const formData = new FormData();
      console.log(images);
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        formData.append("images", image);
      }

      const response = await uploadServices.uploadProductImages(formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: () => {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(uploadImages.fulfilled, (state, action) => {
        state.status = "success";
        state.images = action.payload;
      })
      .addCase(uploadImages.rejected, (state, action) => {
        console.log(action.payload);
        state.status = "rejected";
        state.error = action.payload.message;
      });
  },
});

export const selectUploadImagesData = (state) => state.upload.images;
export const selectUploadImagesError = (state) => state.upload.error;
export const selectUploadImagesStatus = (state) => state.upload.status;

export default uploadSlice.reducer;
