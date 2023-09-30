import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginRes } from "../../../types";
import { RootState } from "../../app/store";
import { login } from "./auth-service";

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
    loginHandler: (
      state,
      action: PayloadAction<{ token: string; user: LoginRes }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logoutHandler: (state) => {
      state.token = "";
      state.user = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(login.matchFulfilled, (state, { payload }) => {
      state.token = payload.token;
      state.user = payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { loginHandler, logoutHandler } = authSlice.actions;

export const selectIsAuth = (state: RootState) => Boolean(state.auth.token);
export const selectToken = (state: RootState) => state.auth.token;
export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
