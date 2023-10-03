import { ColumnDef, Row } from "@tanstack/react-table";
import UserReferenceField from "../components/user/user-reference-field";
import { DataTable } from "../components/ui/data-table";
import { usePosts } from "../hooks/use-posts";
import { Post } from "../types";
import PostFilter from "../components/post/post-filter";

const PostsPage = () => {
  const { posts } = usePosts();

  console.log(posts);

  return (
    <div className="py-4 px-10">
      <DataTable data={posts} columns={columns} filter={PostFilter} />
    </div>
  );
};

const columns: ColumnDef<Post>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "userId",
    header: "User",
    cell: ({ row }) => <UserReferenceField userId={row.getValue("userId")} />,
  },

  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }: { row: Row<Post> }) => (
      <div>
        {Array.isArray(row.original.tags)
          ? row.original.tags.map((tag, index) => (
              <span key={index} className="capitalize">
                {tag}
                {index !== row.original.tags.length - 1 && ", "}
              </span>
            ))
          : row.original.tags}
      </div>
    ),
  },
];

export default PostsPage;
