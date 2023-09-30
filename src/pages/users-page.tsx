import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../components/ui/data-table";
import UserFilter from "../components/user/user-filter";
import { useUsers } from "../hooks/use-users";
import { User } from "../types";

const UsersPage = () => {
  const { users, isLoading } = useUsers();

  if (isLoading) return <div>Loading..</div>;
  return (
    <div className="py-4 px-10">
      <DataTable data={users} columns={columns} filter={UserFilter} />
    </div>
  );
};

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <img src={row.getValue("image")} alt="pp" width={40} height={40} />
    ),
  },
  {
    accessorKey: "firstName",
    header: "Fullname",
    cell: ({ row }) => (
      <div className="capitalize">{`${row.original.firstName} ${row.original.lastName}`}</div>
    ),
  },
  {
    enableHiding: false,
    accessorKey: "lastName",
  },
  {
    accessorKey: "age",
    header: "Age",
    cell: ({ row }) => <div className="capitalize">{row.getValue("age")}</div>,
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("gender")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("phone")}</div>
    ),
  },
  {
    accessorKey: "birthDate",
    header: "Birth date",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("birthDate")}</div>
    ),
  },
];

export default UsersPage;
