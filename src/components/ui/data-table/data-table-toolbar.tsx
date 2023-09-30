import { Table } from "@tanstack/react-table";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filter: ({ table }: { table: Table<TData> }) => JSX.Element;
}

export function DataTableToolbar<TData>({
  table,
  filter: Filter,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between my-4">
      <div className="flex flex-1 items-center space-x-2">
        <Filter table={table} />
      </div>
    </div>
  );
}
