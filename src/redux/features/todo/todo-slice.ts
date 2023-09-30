import { RootState } from "../../app/store";
import { Todo } from "../../../types";
import {
  createSlice,
  createSelector,
  createEntityAdapter,
  EntityState,
} from "@reduxjs/toolkit";
import {
  createTodo,
  deleteTodo,
  getTodos,
  getTodosByUserId,
  updateTodo,
} from "./todo-service";

const todosAdapter = createEntityAdapter<Todo>({
  selectId: (todo) => todo.id,
  sortComparer: (a, b) => b.id - a.id,
});

interface InitialState {
  defaultData: Todo[];
  limit: number;
  skip: number;
  total: number;
  modal: {
    isOpen: boolean;
    todoId: number | null;
  };
}

const initialState: EntityState<Todo> & InitialState =
  todosAdapter.getInitialState({
    defaultData: [],
    limit: 0,
    skip: 0,
    total: 0,
    modal: {
      isOpen: false,
      todoId: null,
    },
  });

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setDefaultTodos(state) {
      todosAdapter.setMany(state, state.defaultData);
    },
    toggleTodoModal(state, action) {
      state.modal.isOpen = action.payload;
    },
    setSelectedTodoId(state, action) {
      state.modal.todoId = action.payload;
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
    builder.addMatcher(createTodo.matchFulfilled, (state, action) => {
      todosAdapter.addOne(state, action.payload);
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

export const { setDefaultTodos, toggleTodoModal, setSelectedTodoId } =
  todosSlice.actions;

export const {
  selectAll: selectAllTodos,
  selectById: selectTodoById,
  selectIds: selectTodoIds,
} = todosAdapter.getSelectors((state: RootState) => state.todos);

export const selectTodosByUserId = createSelector(
  [selectAllTodos, (state, userId) => userId],
  (todos, userId) => todos.filter((todo) => todo.userId === userId)
);

export const selectTodoModal = (state: RootState) => state.todos.modal;
