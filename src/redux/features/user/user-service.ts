import { GetList, GetUsersRes, User } from "../../../types";
import dataProvider from "../../app/data-provider";

export const userProvider = dataProvider.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<GetUsersRes, GetList>({
      query: ({ limit, skip }) => `users?limit=${limit}&skip=${skip}`,
    }),
    getUserById: build.query<User, number>({
      query: (id) => `users/${id}`,
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetUsersQuery, useGetUserByIdQuery } = userProvider;

export const {
  endpoints: { getUsers, getUserById },
} = userProvider;
