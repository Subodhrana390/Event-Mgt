import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;
const refreshToken = localStorage.getItem("refreshToken");

export const fetchUserProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const response = await axios.get(`${API_URL}/user/profile`, {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch profile");
    }
  }
);

export const refreshTokenThunk = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) throw new Error("No refresh token available");

      const response = await axios.post(`${API_URL}/auth/refresh-token`, {
        refreshToken,
      });

      const { accessToken } = response.data?.data;
      localStorage.setItem("refreshToken", response.data?.data?.refreshToken);
      return { accessToken, refreshToken };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Token refresh failed");
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { getState }) => {
    const { auth } = getState();
    await axios.post(
      `${API_URL}/auth/logout`,
      { refreshToken },
      {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      }
    );
    localStorage.removeItem("refreshToken");
    return null;
  }
);

const initialState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      localStorage.setItem("refreshToken", action.payload.refreshToken);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(refreshTokenThunk.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
      })
      .addCase(refreshTokenThunk.rejected, (state) => {
        state.isAuthenticated = false;
        state.accessToken = null;
        state.user = null;
        s;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.isAuthenticated = false;
        storage.removeItem("persist:root");
      });
  },
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
