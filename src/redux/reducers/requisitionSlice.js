import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requisitionApi from "../../api/requistionRequest";



const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  jobs: []
}

export const getRequisition = createAsyncThunk(
  "api/getRequistion",
  async (_, thunkAPI) => {
    try {
      return await requisitionApi.getRequisitionApi();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  });

  export const deleteRequisition = createAsyncThunk(
    "api/deleteRequsition",
    async (id, thunkAPI) => {
      try {
        return await requisitionApi.deleteRequisitionData(id);
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );



const requisitionSlice = createSlice({
  name: "requisitionData",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRequisition.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRequisition.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.jobs = action.payload;
      })
      .addCase(getRequisition.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // delete
      .addCase(deleteRequisition.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteRequisition.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(deleteRequisition.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  }
})

export default requisitionSlice.reducer;