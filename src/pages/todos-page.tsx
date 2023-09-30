import { ColumnDef } from "@tanstack/react-table";
import DeleteTodoButton from "../components/todo/delete-todo-button";
import TodoCompletedField from "../components/todo/todo-completed-field";
import UserReferenceField from "../components/user/user-reference-field";
import { DataTable } from "../components/ui/data-table";
import { useTodos } from "../hooks/use-todos";
import { Todo } from "../types";
import TodoFilter from "../components/todo/todo-filter";

const TodosPage = () => {
  const { todos } = useTodos();

  return (
    <div className="py-4 px-10">
      <DataTable data={todos} columns={columns} filter={TodoFilter} />
    </div>
  );
};

const columns: ColumnDef<Todo>[] = [
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
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <DeleteTodoButton todoId={row.original.id} />;
    },
  },
];

export default TodosPage;
