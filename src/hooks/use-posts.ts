import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "../redux/app/hooks";
import { selecAllPosts } from "../redux/features/post/post-slice";
import {
  useGetPostsByUserIdQuery,
  useGetPostsQuery,
} from "../redux/features/post/post-service";

export const usePosts = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const isFiltered = Boolean(userId);

  const posts = useAppSelector(selecAllPosts);

  const { isLoading: isPostsFetching } = useGetPostsQuery(
    { limit: "0", skip: "0" },
    { skip: Boolean(userId) }
  );

  const { isLoading: isPostByUserFetching } = useGetPostsByUserIdQuery(
    Number(userId),
    {
      skip: !Boolean(userId),
      refetchOnMountOrArgChange: true,
    }
  );

  return {
    posts,
    isLoading: isPostsFetching || isPostByUserFetching,
    isFiltered,
    userId,
  };
};
