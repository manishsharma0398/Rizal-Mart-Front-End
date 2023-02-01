import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import colourService from "./colourService";

const initialState = {
  colours: [],
  status: "idle",
  error: null,
};

export const getAllColours = createAsyncThunk(
  "colours/get-all",
  async (thunkAPI) => {
    try {
      const response = await colourService.getColors();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const categorySlice = createSlice({
  name: "colours",
  initialState,
  reducers: () => {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllColours.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllColours.fulfilled, (state, action) => {
        state.status = "success";
        state.colours = action.payload;
      })
      .addCase(getAllColours.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.message;
      });
  },
});

export const selectColoursData = (state) => state.colours.colours;
export const selectColoursError = (state) => state.colours.error;
export const selectColoursStatus = (state) => state.colours.status;

export default categorySlice.reducer;
