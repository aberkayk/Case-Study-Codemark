import { ColumnDef } from "@tanstack/react-table";
import DeleteTodoButton from "../components/todo/delete-todo-button";
import TodoCompletedField from "../components/todo/todo-completed-field";
import UserReferenceField from "../components/user/user-reference-field";
import { DataTable } from "../components/ui/data-table";
import { useTodos } from "../hooks/use-todos";
import { Todo } from "../types";
import TodoFilter from "../components/todo/todo-filter";
import TodoCreate from "../components/todo/todo-create";
import EditTodoButton from "../components/todo/edit-todo-button";
import { Checkbox } from "../components/ui/checkbox";
import TodoActions from "../components/todo/todo-actions";

const TodosPage = () => {
  const { todos } = useTodos();

  return (
    <div className="py-4 px-10">
      <DataTable
        data={todos}
        columns={columns}
        filter={TodoFilter}
        create={TodoCreate}
        actions={TodoActions}
      />
    </div>
  );
};

const columns: ColumnDef<Todo>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value: boolean) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: (props) => {
      return (
        <Checkbox
          checked={props.row.getIsSelected()}
          onCheckedChange={(value: boolean) =>
            props.row.toggleSelected(!!value)
          }
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "todo",
    header: "Todo",
    cell: ({ row }) => <div className="capitalize">{row.getValue("todo")}</div>,
  },
  {
    accessorKey: "userId",
    header: "User",
    cell: ({ row }) => <UserReferenceField userId={row.getValue("userId")} />,
  },
  {
    accessorKey: "completed",
    header: "Is Completed",
    cell: ({ row }) => {
      return (
        <TodoCompletedField
          todoId={row.original.id}
          isCompleted={row.getValue("completed")}
        />
      );
    },
  },
  {
    id: "edit",
    enableHiding: false,
    cell: ({ row }) => {
      return <EditTodoButton todoId={row.original.id} />;
    },
  },
  {
    id: "delete",
    enableHiding: false,
    cell: ({ row }) => {
      return <DeleteTodoButton row={row} />;
    },
  },
];

export default TodosPage;
