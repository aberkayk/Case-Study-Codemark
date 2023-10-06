import { Table } from "@tanstack/react-table";
import { XIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../../hooks/use-users";
import { useAppDispatch } from "../../redux/app/hooks";
import { Post } from "../../types";
import { Button } from "../ui/button";
import { DataTableFacetedFilter } from "../ui/data-table/data-table-faceted-filter";
import { Input } from "../ui/input";
import { usePosts } from "../../hooks/use-posts";
import { setDefaultPosts } from "../../redux/features/post/post-slice";
import { DataTableListFilter } from "../ui/data-table/data-table-list-filter";
import { tagsOptions } from "../../constants/data";

interface Props {
  table: Table<Post>;
}

const PostFilter = ({ table }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userOptions } = useUsers();
  const { userId, isFiltered } = usePosts();

  const onReset = () => {
    dispatch(setDefaultPosts());
    table.resetColumnFilters();
    navigate("/posts");
  };

  const onUserChange = (selectedUserId: number | undefined) => {
    if (selectedUserId && Number(userId) !== selectedUserId) {
      navigate({
        pathname: "/posts",
        search: `?userId=${selectedUserId}`,
      });
    } else onReset();
  };

  return (
    <>
      <Input
        placeholder="Filter post..."
        value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("title")?.setFilterValue(event.target.value)
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
      {table.getColumn("tags") && (
        <DataTableListFilter
          column={table.getColumn("tags")}
          title="Tag"
          options={tagsOptions}
        />
      )}
      {isFiltered && (
        <Button variant="ghost" onClick={onReset} className="h-8 px-2 lg:px-3">
          Reset
          <XIcon className="ml-2 h-4 w-4" />
        </Button>
      )}
    </>
  );
};

export default PostFilter;
