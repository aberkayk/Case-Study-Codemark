import { Button } from "../ui/button";
import { Pencil } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import {
  selectPostById,
  selectPostModal,
  setSelectedPostId,
  togglePostModal,
} from "../../redux/features/post/post-slice";
import PostModal from "./post-modal";

interface Props {
  postId: number;
}

const EditPostButton = ({ postId }: Props) => {
  const dispatch = useAppDispatch();
  const postModal = useAppSelector(selectPostModal);

  const initialData = useAppSelector((state) =>
    selectPostById(state, postModal.postId as number)
  );

  function onClick() {
    dispatch(setSelectedPostId(postId));
    dispatch(togglePostModal(true));
  }

  return (
    <>
      <Button onClick={onClick} variant="ghost">
        <Pencil className="h-5 w-5 text-slate-600" />
      </Button>
      <PostModal
        isOpen={postModal.isOpen}
        onClose={() => dispatch(togglePostModal(false))}
        onConfirm={() => dispatch(togglePostModal(false))}
        initialData={initialData}
      />
    </>
  );
};

export default EditPostButton;
