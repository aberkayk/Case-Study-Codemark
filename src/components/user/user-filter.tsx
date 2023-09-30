import { Table } from "@tanstack/react-table";
import { User } from "../../types";
import { Input } from "../ui/input";

interface Props {
  table: Table<User>;
}

const UserFilter = ({ table }: Props) => {
  return (
    <>
      <Input
        placeholder="Filter lastname..."
        value={(table.getColumn("lastName")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("lastName")?.setFilterValue(event.target.value)
        }
        className="h-8 w-[150px] lg:w-[250px]"
      />
    </>
  );
};

export default UserFilter;
