import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import createRequisitionApi from "../../api/createRequisitonRequest";

const initialState = {
    isLoading:false,
    isError:false,
    isSuccess:false,
    message:"",
    postJob: null,
    cityData: [],
    clientData: [],
    jobData:[],
    countryData:[],
    stateData:[],
    titleData:[]
}

export const createJobs = createAsyncThunk(
    "api/createRequisition",
    async (createData, thunkAPI) => {
      console.log('createData', createData)
      try {
        return await createRequisitionApi.createRequisition(createData);
      }
      catch (error) {
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
  export const getCityDetails = createAsyncThunk(
    "api/getCityDetails",
    async (_, thunkAPI) => {
      try {
        return await createRequisitionApi.getCity();
      } catch (error) {
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    });

    export const getClientDetails = createAsyncThunk(
      "api/getClientDetails",
      async (_, thunkAPI) => {
        try {
          return await createRequisitionApi.getClient();
        } catch (error) {
          const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
          return thunkAPI.rejectWithValue(message);
        }
      });

      export const getJobDetails = createAsyncThunk(
        "api/getJobDetails",
        async (_, thunkAPI) => {
          try {
            return await createRequisitionApi.getJobType();
          } catch (error) {
            const message =
              (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
            return thunkAPI.rejectWithValue(message);
          }
        });

        export const getStateDetails = createAsyncThunk(
          "api/getStateDetails",
          async (_, thunkAPI) => {
            try {
              return await createRequisitionApi.getState();
            } catch (error) {
              const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
              return thunkAPI.rejectWithValue(message);
            }
          });

          export const getTitleDetails = createAsyncThunk(
            "api/getTitleDetails",
            async (_, thunkAPI) => {
              try {
                return await createRequisitionApi.getJobTitle();
              } catch (error) {
                const message =
                  (error.response && error.response.data && error.response.data.message) ||
                  error.message ||
                  error.toString();
                return thunkAPI.rejectWithValue(message);
              }
            });

            export const getCountryDetails = createAsyncThunk(
              "api/getCountryDetails",
              async (_, thunkAPI) => {
                try {
                  return await createRequisitionApi.getCountry();
                } catch (error) {
                  const message =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString();
                  return thunkAPI.rejectWithValue(message);
                }
              });

  const createRequisitionSlice = createSlice({
    name: "createRequisiton",
    initialState: initialState,
    reducers: {
      RESET(state) {
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      },
    },
    extraReducers: (builder) => {
      // createJobs 
      builder
        .addCase(createJobs.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(createJobs.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.postJob = action.payload;
          console.log("postJob", action.payload)
        })
        .addCase(createJobs.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          state.user = null;
        })
        // getCity 
        .addCase(getCityDetails.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getCityDetails.fulfilled, (state, action) => {
          state.isLoading = false;
          state.cityData = action.payload;
          console.log("city", action.payload)
        })
        .addCase(getCityDetails.rejected, (state) => {
          state.isError =  true;
          state.isLoading = false;
          state.message = action.payload;
        })
        // getClient 
        .addCase(getClientDetails.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getClientDetails.fulfilled, (state, action) => {
          state.isLoading = false;
          state.clientData = action.payload;
          console.log("client", action.payload)
        })
        .addCase(getClientDetails.rejected, (state) => {
          state.isError =  true;
          state.isLoading = false;
          state.message = action.payload;
        })
        // getCountry
        .addCase(getCountryDetails.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getCountryDetails.fulfilled, (state, action) => {
          state.isLoading = false;
          state.countryData = action.payload;
          console.log("country", action.payload)
        })
        .addCase(getCountryDetails.rejected, (state) => {
          state.isError =  true;
          state.isLoading = false;
          state.message = action.payload;
        })
        // getJob 
        .addCase(getJobDetails.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getJobDetails.fulfilled, (state, action) => {
          state.isLoading = false;
          state.jobData = action.payload;
          console.log("jobrole", action.payload)
        })
        .addCase(getJobDetails.rejected, (state) => {
          state.isError =  true;
          state.isLoading = false;
          state.message = action.payload;
        })
        // getState 
        .addCase(getStateDetails.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getStateDetails.fulfilled, (state, action) => {
          state.isLoading = false;
          state.stateData = action.payload;
          console.log("state", action.payload)
        })
        .addCase(getStateDetails.rejected, (state) => {
          state.isError =  true;
          state.isLoading = false;
          state.message = action.payload;
        })
        // gettitle
        .addCase(getTitleDetails.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getTitleDetails.fulfilled, (state, action) => {
          state.isLoading = false;
          state.titleData = action.payload;
          console.log("title", action.payload)
        })
        .addCase(getTitleDetails.rejected, (state) => {
          state.isError =  true;
          state.isLoading = false;
          state.message = action.payload;
        })
        
    }
  })
  export const { RESET } =
 createRequisitionSlice.actions
  
  export default createRequisitionSlice.reducer;