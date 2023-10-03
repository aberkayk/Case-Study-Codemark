import { Table } from "@tanstack/react-table";
import { XIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { completeOptions } from "../../constants/data";
import { useTodos } from "../../hooks/use-todos";
import { useUsers } from "../../hooks/use-users";
import { useAppDispatch } from "../../redux/app/hooks";
import { setDefaultTodos } from "../../redux/features/todo/todo-slice";
import { Todo } from "../../types";
import { Button } from "../ui/button";
import { DataTableFacetedFilter } from "../ui/data-table/data-table-faceted-filter";
import { Input } from "../ui/input";
import { usePosts } from "../../hooks/use-posts";

interface Props {
  table: Table<Todo>;
}

const PostFilter = ({ table }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userOptions } = useUsers();
  const { userId, isFiltered } = usePosts();

  const onReset = () => {
    dispatch(setDefaultTodos());
    table.resetColumnFilters();
    navigate("/posts");
  };

  const onUserChange = (selectedUserId: number | undefined) => {
    if (selectedUserId && Number(userId) !== selectedUserId) {
      navigate({
        pathname: "/todos",
        search: `?userId=${selectedUserId}`,
      });
    } else onReset();
  };

  return (
    <>
      {/* <Input
        placeholder="Filter post..."
        value={(table.getColumn("post")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("post")?.setFilterValue(event.target.value)
        }
        className="h-8 w-[150px] lg:w-[250px]"
      />
      {table.getColumn("userId") && (
        <DataTableFacetedFilter
          title="User"
          options={userOptions}
          onChange={onUserChange}
          selectedValue={userId}
          onReset={onReset}
          selectedLabel={
            userId
              ? userOptions.find((item) => item.value === userId)?.label
              : ""
          }
        />
      )}
      {table.getColumn("completed") && (
        <DataTableFacetedFilter
          title="Is Completed"
          options={completeOptions}
          onChange={(value: any) => {
            table.getColumn("completed")?.setFilterValue(value);
          }}
          selectedValue={
            table.getColumn("completed")?.getFilterValue() as string
          }
          selectedLabel={
            table.getColumn("completed")?.getFilterValue()
              ? completeOptions.find(
                  (item) =>
                    item.value ===
                    table.getColumn("completed")?.getFilterValue()
                )?.label
              : ""
          }
          onReset={() =>
            table.getColumn("completed")?.setFilterValue(undefined)
          }
        />
      )}
      {isFiltered && (
        <Button variant="ghost" onClick={onReset} className="h-8 px-2 lg:px-3">
          Reset
          <XIcon className="ml-2 h-4 w-4" />
        </Button>
      )} */}
    </>
  );
};

export default PostFilter;
