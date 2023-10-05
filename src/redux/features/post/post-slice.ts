import {
  createSlice,
  createEntityAdapter,
  EntityState,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Post } from "../../../types";
import {
  createPost,
  getPosts,
  getPostsByUserId,
  updatePost,
} from "./post-service";

const postsAdapter = createEntityAdapter<Post>({
  selectId: (post) => post.id,
  sortComparer: (a, b) => b.id - a.id,
});

interface InitialState {
  defaultData: Post[];
  limit: number;
  skip: number;
  total: number;
  modal: {
    isOpen: boolean;
    postId: number | null;
  };
}

const initialState: EntityState<Post> & InitialState =
  postsAdapter.getInitialState({
    defaultData: [],
    limit: 0,
    skip: 0,
    total: 0,
    modal: {
      isOpen: false,
      postId: null,
    },
  });

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setDefaultPosts(state) {
      postsAdapter.setMany(state, state.defaultData);
    },
    togglePostModal(state, action) {
      state.modal.isOpen = action.payload;
    },
    setSelectedPostId(state, action) {
      state.modal.postId = action.payload;
    },
    setPost(state, action) {
      postsAdapter.updateOne(state, action.payload);
    },
  },
  extraReducers(builder) {
    builder.addMatcher(getPosts.matchFulfilled, (state, action) => {
      const { limit, posts, total, skip } = action.payload;
      postsAdapter.setMany(state, posts);
      state.limit = limit;
      state.skip = skip;
      state.total = total;
    });
    builder.addMatcher(createPost.matchFulfilled, (state, action) => {
      postsAdapter.addOne(state, action.payload);
    });
    builder.addMatcher(updatePost.matchFulfilled, (state, action) => {
      postsAdapter.upsertOne(state, action.payload);
    });
    // builder.addMatcher(getPostsByUserId.matchFulfilled, (state, action) => {
    //   const { limit, posts, total, skip } = action.payload;
    //   postsAdapter.setAll(state, posts);
    //   state.limit = limit;
    //   state.skip = skip;
    //   state.total = total;
    // });
  },
});

export default postsSlice.reducer;

export const { setDefaultPosts, togglePostModal, setSelectedPostId, setPost } =
  postsSlice.actions;

export const {
  selectAll: selecAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state: RootState) => state.posts);

// export const selectPostsByUserId = createSelector(
//   [selecAllPosts, (state, userId) => userId],
//   (users, userId) => users.filter((user) => user.id === userId)
// );
