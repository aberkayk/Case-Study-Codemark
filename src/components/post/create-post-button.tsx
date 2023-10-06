import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import {
  selectPostById,
  selectPostModal,
  setSelectedPostId,
  togglePostModal,
} from "../../redux/features/post/post-slice";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";
import PostModal from "./post-modal";

const CreatePostButton = () => {
  const postModal = useAppSelector(selectPostModal);
  const dispatch = useAppDispatch();
  const initialData = useAppSelector((state) =>
    selectPostById(state, postModal.postId as number)
  );

  function onClick() {
    if (postModal.postId) dispatch(setSelectedPostId(null));
    dispatch(togglePostModal(true));
  }

  return (
    <>
      <Button onClick={onClick} className="space-x-4">
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Post
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

export default CreatePostButton;
