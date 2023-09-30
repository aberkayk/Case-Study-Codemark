import { Table } from "@tanstack/react-table";
import { Todo } from "../../types";
import DeleteTodoByIdsButton from "./delete-todo-by-ids-button.tsx";

interface Props {
  table: Table<Todo>;
}

const TodoActions = ({ table }: Props) => {
  return (
    <div>
      <DeleteTodoByIdsButton table={table} />
    </div>
  );
};

export default TodoActions;
