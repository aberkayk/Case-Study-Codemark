import { Table } from "@tanstack/react-table";
import { Todo } from "../../types";
import DeleteTodoByIdsButton from "./delete-todo-by-ids-button.tsx";

interface Props {
  table: Table<Todo>;
}

const TodoActions = ({ table }: Props) => {
  const selectedIds = table
    .getSelectedRowModel()
    .rows.map((item) => item.original.id);

  return (
    <div>
      {selectedIds.length > 0 && (
        <DeleteTodoByIdsButton ids={selectedIds} table={table} />
      )}
    </div>
  );
};

export default TodoActions;
