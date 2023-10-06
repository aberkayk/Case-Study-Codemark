import { number } from "zod";
import {
  CreatePostBody,
  GetList,
  GetPostsRes,
  Post,
  UpdatePostBody,
} from "../../../types";
import dataProvider from "../../app/data-provider";

export const postProvider = dataProvider.injectEndpoints({
  endpoints: (build) => ({
    getPosts: build.query<GetPostsRes, GetList>({
      query: ({ limit, skip }) => `posts?limit=${limit}&skip=${skip}`,
    }),
    getPostsByUserId: build.query<GetPostsRes, number>({
      query: (id) => `posts/user/${id}`,
    }),
    createPost: build.mutation<Post, CreatePostBody>({
      query: (body) => ({
        url: `posts/add`,
        method: "POST",
        body: body,
      }),
    }),
    updatePost: build.mutation<Post, { postId: number; body: UpdatePostBody }>({
      query: ({ postId, body }) => ({
        url: `posts/${postId}`,
        method: "PUT",
        body: body,
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetPostsQuery,
  useGetPostsByUserIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
} = postProvider;

export const {
  endpoints: { getPosts, createPost, updatePost, getPostsByUserId },
} = postProvider;
