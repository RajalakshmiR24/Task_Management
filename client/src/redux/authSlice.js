import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

const initialState = {
  token: localStorage.getItem("token") || null,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
    registerSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  registerSuccess,
} = authSlice.actions;

export const login =
  (email, password, showSuccess, showError, onSuccess) => async (dispatch) => {
    dispatch(loginStart());
    try {
      const response = await axiosInstance.post("/api/users/login", {
        email,
        password,
      });
      const { token, user, message } = response.data;

      localStorage.setItem("token", token);
      dispatch(loginSuccess({ token, user }));
      showSuccess(message);
      if (onSuccess) onSuccess();
    } catch (error) {
      const msg = error.response?.data?.message || "Login failed!";
      dispatch(loginFailure(msg));
      showError(msg);
    }
  };

export const register =
  (email, password, showSuccess, showError, onSuccess) => async (dispatch) => {
    dispatch(loginStart());
    try {
      const response = await axiosInstance.post("/api/users/register", {
        email,
        password,
      });

      const status = response.status;
      const message = response.data?.message || "Registration successful!";

      if (status === 201 || status === 200) {
        dispatch(registerSuccess());
        showSuccess(message);
        if (onSuccess) onSuccess();
      } else {
        showError("Unexpected response. Please try again.");
        dispatch(loginFailure("Unexpected response."));
      }
    } catch (error) {
      const status = error.response?.status;
      const msg = error.response?.data?.message || "Registration failed!";

      if (status === 400) {
        showError(msg || "User already exists.");
      } else if (status === 500) {
        showError("Server error. Please try again later.");
      } else {
        showError(msg);
      }

      dispatch(loginFailure(msg));
    }
  };

export default authSlice.reducer;
