import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "../redux/app/hooks";
import {
  useGetTodosByUserIdQuery,
  useGetTodosQuery,
} from "../redux/features/todo/todo-service";
import { selectAllTodos } from "../redux/features/todo/todo-slice";

export const useTodos = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const isFiltered = Boolean(userId);

  const todos = useAppSelector(selectAllTodos);

  const { isLoading: isTodosFetching } = useGetTodosQuery(
    { limit: "0", skip: "0" },
    { skip: Boolean(userId) }
  );

  const { isLoading: isTodoByUserFetching } = useGetTodosByUserIdQuery(
    Number(userId),
    {
      skip: !Boolean(userId),
      refetchOnMountOrArgChange: true,
    }
  );

  return {
    todos,
    isLoading: isTodosFetching || isTodoByUserFetching,
    isFiltered,
    userId,
  };
};
