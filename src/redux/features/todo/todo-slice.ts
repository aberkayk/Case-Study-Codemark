import { RootState } from "../../app/store";
import { Todo } from "../../../types";
import {
  createSlice,
  createSelector,
  createEntityAdapter,
  EntityState,
} from "@reduxjs/toolkit";
import {
  deleteTodo,
  getTodos,
  getTodosByUserId,
  updateTodo,
} from "./todo-service";

const todosAdapter = createEntityAdapter<Todo>({
  selectId: (todo) => todo.id,
  sortComparer: (a, b) => b.todo.localeCompare(a.todo),
});

interface InitialState {
  defaultData: Todo[];
  limit: number;
  skip: number;
  total: number;
}

const initialState: EntityState<Todo> & InitialState =
  todosAdapter.getInitialState({
    defaultData: [],
    limit: 0,
    skip: 0,
    total: 0,
  });

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setDefaultTodos(state) {
      todosAdapter.setMany(state, state.defaultData);
    },
  },
  extraReducers(builder) {
    builder.addMatcher(getTodos.matchFulfilled, (state, action) => {
      const { limit, todos, total, skip } = action.payload;
      todosAdapter.setMany(state, todos);
      state.defaultData = todos;
      state.limit = limit;
      state.skip = skip;
      state.total = total;
    });
    builder.addMatcher(updateTodo.matchFulfilled, (state, action) => {
      todosAdapter.upsertOne(state, action.payload);
    });
    builder.addMatcher(deleteTodo.matchFulfilled, (state, action) => {
      todosAdapter.removeOne(state, action.payload.id);
    });
    builder.addMatcher(getTodosByUserId.matchFulfilled, (state, action) => {
      const { limit, todos, total, skip } = action.payload;
      todosAdapter.setAll(state, todos);
      state.limit = limit;
      state.skip = skip;
      state.total = total;
    });
  },
});

export default todosSlice.reducer;

export const { setDefaultTodos } = todosSlice.actions;

export const {
  selectAll: selectAllTodos,
  selectById: selectTodoById,
  selectIds: selectTodoIds,
} = todosAdapter.getSelectors((state: RootState) => state.todos);

export const selectTodosByUserId = createSelector(
  [selectAllTodos, (state, userId) => userId],
  (todos, userId) => todos.filter((todo) => todo.userId === userId)
);

export const selectAllTodoOwners = (state: RootState) => state.todos.entities;
