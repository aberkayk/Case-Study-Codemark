import {
  CreateTodoBody,
  DeleteTodoRes,
  GetList,
  GetTodoRes,
  Todo,
  UpdateTodoBody,
} from "../../../types";
import dataProvider from "../../app/data-provider";

export const todoProvider = dataProvider.injectEndpoints({
  endpoints: (build) => ({
    getTodos: build.query<GetTodoRes, GetList>({
      query: ({ limit, skip }) => `todos?limit=${limit}&skip=${skip}`,
    }),
    getTodosByUserId: build.query<GetTodoRes, number>({
      query: (userId) => `todos/user/${userId}`,
    }),
    createTodo: build.mutation<Todo, CreateTodoBody>({
      query: (body) => ({
        url: `todos/add`,
        method: "POST",
        body: body,
      }),
    }),
    updateTodo: build.mutation<Todo, { todoId: number; body: UpdateTodoBody }>({
      query: ({ todoId, body }) => ({
        url: `todos/${todoId}`,
        method: "PUT",
        body: body,
      }),
    }),
    deleteTodo: build.mutation<DeleteTodoRes, number>({
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
