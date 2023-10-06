import { ColumnDef, Row } from "@tanstack/react-table";
import UserReferenceField from "../components/user/user-reference-field";
import { DataTable } from "../components/ui/data-table";
import { usePosts } from "../hooks/use-posts";
import { Post } from "../types";
import PostFilter from "../components/post/post-filter";
import EditPostButton from "../components/post/edit-post-button";
import PostModal from "../components/post/post-modal";
import {
  selectPostById,
  selectPostModal,
  togglePostModal,
} from "../redux/features/post/post-slice";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import CreatePostButton from "../components/post/create-post-button";

const PostsPage = () => {
  const { posts } = usePosts();
  const dispatch = useAppDispatch();
  const postModal = useAppSelector(selectPostModal);

  const initialData = useAppSelector((state) =>
    selectPostById(state, postModal.postId as number)
  );

  return (
    <div className="py-4 px-10">
      <DataTable
        create={CreatePostButton}
        data={posts}
        columns={columns}
        filter={PostFilter}
      />
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
    accessorKey: "body",
    header: "Body",
    cell: ({ row }) => <div>{row.getValue("body")}</div>,
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
  {
    id: "edit",
    enableHiding: false,
    cell: ({ row }) => {
      return <EditPostButton postId={row.original.id} />;
    },
  },
];

export default PostsPage;
