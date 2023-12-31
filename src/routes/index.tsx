import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/shared/layout";
import ErrorPage from "../pages/error-page";
import LoginPage from "../pages/login-page";
import TodosPage from "../pages/todos-page";
import UsersPage from "../pages/users-page";
import ProtectedRoute from "./protected-route";
import PostsPage from "../pages/posts-page";

export const routes = [
  { path: "/users", label: "Users" },
  { path: "/todos", label: "Todos" },
  { path: "/posts", label: "Posts" },
];

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        children: [
          // Resources
          {
            path: "users",
            element: <UsersPage />,
          },
          {
            path: "todos",
            element: <TodosPage />,
          },
          {
            path: "posts",
            element: <PostsPage />,
          },
        ],
      },
    ],
  },
]);
