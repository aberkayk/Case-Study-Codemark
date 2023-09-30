import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "reduxjs-toolkit-persist/lib/storage"; // defaults to localStorage for web
import authSlice from "../features/auth/auth-slice";
import todoSlice from "../features/todo/todo-slice";
import userSlice from "../features/user/user-slice";
import dataProvider from "./data-provider";

const persistConfig = {
  key: "root",
  storage: storage,
};

const authReducer = persistReducer(persistConfig, authSlice);

const rootReducer = combineReducers({
  [dataProvider.reducerPath]: dataProvider.reducer,
  auth: authReducer,
  users: userSlice,
  todos: todoSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      dataProvider.middleware,
    ]),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
