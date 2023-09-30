import { Table } from "@tanstack/react-table";
import { Todo } from "../../types";
import DeleteAllTodosButton from "./delete-all-todos-button";

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
        <DeleteAllTodosButton ids={selectedIds} table={table} />
      )}
    </div>
  );
};

export default TodoActions;
