import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser, logoutUser, refreshUser } from "./operations";
import { handlePending, handleError } from "../../utils/reduxUtils";

const initialState = {
  user: { name: null, email: null },
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = {
          name: action.payload.name,
          email: action.payload.email,
        };
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, handleError)
      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = {
          name: action.payload.name,
          email: action.payload.email,
        };
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, handleError)
      .addCase(logoutUser.pending, handlePending)
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = { name: null, email: null };
        state.isLoggedIn = false;
        state.isLoading = false;
      })
      .addCase(logoutUser.rejected, handleError)
      .addCase(refreshUser.pending, handlePending)
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload
          ? {
              name: action.payload.displayName || null,
              email: action.payload.email,
            }
          : { name: null, email: null };
        state.isLoggedIn = !!action.payload;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, handleError);
  },
});

export default authSlice.reducer;
