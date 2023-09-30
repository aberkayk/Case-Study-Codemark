import { LoginRes } from "../../../types";
import dataProvider from "../../app/data-provider";

export const authProvider = dataProvider.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginRes, { username: string; password: string }>({
      query(body) {
        return {
          url: `auth/login`,
          method: "POST",
          body,
        };
      },
    }),
    logout: build.mutation({
      query() {
        return {
          url: `logout`,
          method: "GET",
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components
export const { useLoginMutation } = authProvider;

export const {
  endpoints: { login, logout },
} = authProvider;
