import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import enquiryService from "./enquiryService";

const initialState = {
  enquiries: [],
  status: "idle",
  error: null,
};

export const getAllEnquiries = createAsyncThunk(
  "enquiries/get-all",
  async (thunkAPI) => {
    try {
      const response = await enquiryService.getEnquiries();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const enquiriesSlice = createSlice({
  name: "enquiries",
  initialState,
  reducers: () => {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllEnquiries.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllEnquiries.fulfilled, (state, action) => {
        state.status = "success";
        state.enquiries = action.payload;
      })
      .addCase(getAllEnquiries.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.message;
      });
  },
});

export const selectEnquiriesData = (state) => state.enquiries.enquiries;
export const selectEnquiriesError = (state) => state.enquiries.error;
export const selectEnquiriesStatus = (state) => state.enquiries.status;

export default enquiriesSlice.reducer;
