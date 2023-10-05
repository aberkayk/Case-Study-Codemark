"use client";

import { Post } from "../../types";
import Modal from "../ui/modal";
import PostForm from "./post-form";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  initialData: Post | undefined;
}

const PostModal = (props: Props) => {
  const { isOpen, onClose, onConfirm, initialData } = props;
  const title = initialData ? "Update Post" : "Create a Post";

  return (
    <Modal title={title} description="" isOpen={isOpen} onClose={onClose}>
      <div className="space-x-2 flex items-center justify-center w-full sm:justify-end">
        <PostForm
          onCancel={onClose}
          onConfirm={onConfirm}
          initialData={initialData}
        />
      </div>
    </Modal>
  );
};

export default PostModal;
