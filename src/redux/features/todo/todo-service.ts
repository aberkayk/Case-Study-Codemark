import { CreateTodoBody, UpdateTodoBody } from "../../../types";
import dataProvider from "../../app/data-provider";

interface GetList {
  limit: string;
  skip: string;
}

export const todoProvider = dataProvider.injectEndpoints({
  endpoints: (build) => ({
    getTodos: build.query<any, GetList>({
      query: ({ limit, skip }) => `todos?limit=${limit}&skip=${skip}`,
    }),
    getTodosByUserId: build.query<any, number>({
      query: (userId) => `todos/user/${userId}`,
    }),
    createTodo: build.mutation<any, CreateTodoBody>({
      query: (body) => ({
        url: `todos/add`,
        method: "POST",
        body: body,
      }),
    }),
    updateTodo: build.mutation<any, { todoId: number; body: UpdateTodoBody }>({
      query: ({ todoId, body }) => ({
        url: `todos/${todoId}`,
        method: "PUT",
        body: body,
      }),
    }),
    deleteTodo: build.mutation<any, number>({
      query: (todoId) => ({
        url: `todos/${todoId}`,
        method: "Delete",
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetTodosQuery,
  useGetTodosByUserIdQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoProvider;

export const {
  endpoints: { getTodos, getTodosByUserId, createTodo, updateTodo, deleteTodo },
} = todoProvider;
