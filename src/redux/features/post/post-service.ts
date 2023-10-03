import { GetList, GetPostsRes, Post } from "../../../types";
import dataProvider from "../../app/data-provider";

export const postProvider = dataProvider.injectEndpoints({
  endpoints: (build) => ({
    getPosts: build.query<GetPostsRes, GetList>({
      query: ({ limit, skip }) => `posts?limit=${limit}&skip=${skip}`,
    }),
    getPostByUserId: build.query<Post, number>({
      query: (id) => `posts/${id}`,
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetPostsQuery } = postProvider;

export const {
  endpoints: { getPosts },
} = postProvider;
