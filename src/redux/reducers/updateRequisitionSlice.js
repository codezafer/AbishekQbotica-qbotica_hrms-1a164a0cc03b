import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import updateRequisition from "../../api/updateRequisitionRequest";

const initialState ={
    isLoading: false,
    isError: false,
    isSuccess: false,
    message:'',
    update:[]
}

export const getJobs = createAsyncThunk(
  "api/getJobs" ,
  async (_, thunkAPI) => {
    try {
      return await updateRequisition.getRequisitionApi();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  });

  export const updateJobs = createAsyncThunk(
    "api/updateJobs",
    async(values,thunkAPI)=>{
        try{
            return await updateRequisition.updateRequisitionApi(values)
        }catch (error) {
            const message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            return thunkAPI.rejectWithValue(message);
          }
    }
  )

  const updateRequisitionSlice = createSlice({
    name: "updateRequisiton",
    initialState : initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
          .addCase(getJobs.pending, (state) => {
            state.isLoading = true
          })
          .addCase(getJobs.fulfilled, (state,action) =>{
            state.isLoading = false,
            state.isSuccess = true,
            state.update = action.payload
          })
          .addCase(getJobs.rejected, (state,action) =>{
            state.isLoading = false,
            state.isError = true,
            state.message = action.payload
          })
    }
  })

  export default updateRequisitionSlice.reducer
