import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import loginApi from '../../api/loginRequest'
import postLogin from '../../api/postLogin'

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  user: null,
  isLoggedIn: false
};


// Login User
export const login = createAsyncThunk(
  "api/login",
  async (email, password, thunkAPI) => {
    try {
      return await postLogin(email, password,);
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

const loginSlice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    RESET(state) {
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    // Login User
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true,
          state.user = action.payload;
        console.log(action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
  }
})

export const { RESET } =
  loginSlice.actions;

export default loginSlice.reducer;