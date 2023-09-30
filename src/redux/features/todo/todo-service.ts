import dataProvider from "../../app/data-provider";

interface GetList {
  limit: string;
  skip: string;
}

interface UpdateBody {
  completed: boolean;
}

export const todoProvider = dataProvider.injectEndpoints({
  endpoints: (build) => ({
    getTodos: build.query<any, GetList>({
      query: ({ limit, skip }) => `todos?limit=${limit}&skip=${skip}`,
    }),
    getTodosByUserId: build.query<any, number>({
      query: (userId) => `todos/user/${userId}`,
    }),
    updateTodo: build.mutation<any, { todoId: number; body: UpdateBody }>({
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
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoProvider;

export const {
  endpoints: { getTodos, getTodosByUserId, updateTodo, deleteTodo },
} = todoProvider;
