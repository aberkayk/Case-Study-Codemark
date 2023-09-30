import {
  createSlice,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { User } from "../../../types";
import { getUsers } from "./user-service";

const usersAdapter = createEntityAdapter<User>({
  selectId: (user) => user.id,
  sortComparer: (a, b) => b.firstName.localeCompare(a.firstName),
});

const initialState = usersAdapter.getInitialState({
  limit: 0,
  skip: 0,
  total: 0,
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(getUsers.matchFulfilled, (state, action) => {
      const { limit, users, total, skip } = action.payload;
      usersAdapter.setMany(state, users);
      state.limit = limit;
      state.skip = skip;
      state.total = total;
    });
  },
});

export default usersSlice.reducer;

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = usersAdapter.getSelectors((state: RootState) => state.users);

export const selectUsersByUser = createSelector(
  [selectAllUsers, (state, userId) => userId],
  (users, userId) => users.filter((user) => user.id === userId)
);
