import { Button } from "../ui/button";
import { Pencil } from "lucide-react";
import { useAppDispatch } from "../../redux/app/hooks";
import {
  setSelectedPostId,
  togglePostModal,
} from "../../redux/features/post/post-slice";

interface Props {
  postId: number;
}

const EditPostButton = ({ postId }: Props) => {
  const dispatch = useAppDispatch();

  function onClick() {
    dispatch(setSelectedPostId(postId));
    dispatch(togglePostModal(true));
  }

  return (
    <>
      <Button onClick={onClick} variant="ghost">
        <Pencil className="h-5 w-5 text-slate-600" />
      </Button>
    </>
  );
};

export default EditPostButton;
