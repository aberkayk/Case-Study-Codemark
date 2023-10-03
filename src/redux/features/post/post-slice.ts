import {
  createSlice,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Post } from "../../../types";
import { getPosts } from "./post-service";

const postsAdapter = createEntityAdapter<Post>({
  selectId: (post) => post.id,
  sortComparer: (a, b) => b.id - a.id,
});

const initialState = postsAdapter.getInitialState({
  limit: 0,
  skip: 0,
  total: 0,
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(getPosts.matchFulfilled, (state, action) => {
      const { limit, posts, total, skip } = action.payload;
      postsAdapter.setMany(state, posts);
      state.limit = limit;
      state.skip = skip;
      state.total = total;
    });
  },
});

export default postsSlice.reducer;

export const {
  selectAll: selecAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state: RootState) => state.posts);

// export const selectPostsByUserId = createSelector(
//   [selecAllPosts, (state, userId) => userId],
//   (users, userId) => users.filter((user) => user.id === userId)
// );
