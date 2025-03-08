import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginRes } from "../../../types";
import { RootState } from "../../app/store";
import { login, logout } from "./auth-service";

export interface AuthState {
  token: string;
  user: LoginRes | undefined;
}

const initialState: AuthState = {
  token: "",
  user: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Add a manual setCredentials action to update auth state
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; user: LoginRes }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    clearCredentials: (state) => {
      state.token = "";
      state.user = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(login.matchFulfilled, (state, { payload }) => {
      state.token = payload.token;
      state.user = payload;
    });
    builder.addMatcher(logout.matchFulfilled, (state) => {
      state.token = "";
      state.user = undefined;
    });
  },
});

// Export the new action creators
export const { setCredentials, clearCredentials } = authSlice.actions;

export const selectIsAuth = (state: RootState) =>
  Boolean(state.auth.token);
export const selectToken = (state: RootState) => state.auth.token;
export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
