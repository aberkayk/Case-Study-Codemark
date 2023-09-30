import { Table } from "@tanstack/react-table";
import { ReactElement } from "react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filter: ({ table }: { table: Table<TData> }) => JSX.Element;
  actions?: ({ table }: { table: Table<TData> }) => JSX.Element;
  create?: () => ReactElement;
}

export function DataTableToolbar<TData>({
  table,
  filter: Filter,
  create: Create = () => <></>,
  actions: Actions = () => <></>,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between my-4">
      <div className="flex flex-1 items-center space-x-2">
        <Filter table={table} />
      </div>
      <div className="flex items-center space-x-2">
        <Actions table={table} />
        <Create />
      </div>
    </div>
  );
}
