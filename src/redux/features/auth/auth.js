import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiCall, readToken } from "../../../config/api";

export const requestCode = createAsyncThunk(
  "auth/requestCode",
  async (email, { rejectWithValue }) => {
    const result = await apiCall("/auth/request-code", { body: { email } });
    
    if (!result.ok) return rejectWithValue(result.message);
    return { message: result.data.message };
  },
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }, { rejectWithValue }) => {
    const result = await apiCall("/auth/login", { body: { email, password } });
    if (!result.ok) return rejectWithValue(result.message);
    return result.data;
  },
);

export const setNewPassword = createAsyncThunk(
  "auth/setNewPassword",
  async ({ resetToken, password }, { rejectWithValue }) => {
    const result = await apiCall("/auth/set-password", {
      body: { resetToken, password },
    });
    if (!result.ok) return rejectWithValue(result.message);
    return result.data;
  },
);

const initialFlow = {
  step: "login",
  resetToken: null,
  info: "",
  sentAt: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: readToken(),
    user: null,
    loading: false,
    sending: false,
    error: "",
    ...initialFlow,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.loading = false;
      state.sending = false;
      state.error = "";
      Object.assign(state, initialFlow);
    },
    clearError: (state) => {
      state.error = "";
    },
    restartFlow: (state) => {
      state.loading = false;
      state.error = "";
      state.step = "login";
      state.resetToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestCode.pending, (state) => {
        state.sending = true;
        state.error = "";
        state.info = "";
      })
      .addCase(requestCode.fulfilled, (state, action) => {
        state.sending = false;
        state.info = action.payload.message;
        state.sentAt = Date.now();
      })
      .addCase(requestCode.rejected, (state, action) => {
        state.sending = false;
        state.error = action.payload || "Something went wrong. Try again.";
      })
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.requiresPasswordChange) {
          state.step = "password";
          state.resetToken = action.payload.resetToken;
        } else {
          state.token = action.payload.token;
          state.user = action.payload.user;
          Object.assign(state, initialFlow);
        }
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong. Try again.";
      })
      .addCase(setNewPassword.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(setNewPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        Object.assign(state, initialFlow);
      })
      .addCase(setNewPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong. Try again.";
      });
  },
});

export const { logout, clearError, restartFlow } = authSlice.actions;
export default authSlice.reducer;
