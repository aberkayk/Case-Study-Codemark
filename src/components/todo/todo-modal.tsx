"use client";

import { Todo } from "../../types";
import Modal from "../ui/modal";
import TodoForm from "./todo-form";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  initialData: Todo | undefined;
}

const TodoModal = (props: Props) => {
  const { isOpen, onClose, onConfirm, initialData } = props;
  const title = initialData ? "Update Todo" : "Create a Todo";

  return (
    <Modal title={title} description="" isOpen={isOpen} onClose={onClose}>
      <div className="space-x-2 flex items-center justify-center w-full sm:justify-end">
        <TodoForm
          onCancel={onClose}
          onConfirm={onConfirm}
          initialData={initialData}
        />
      </div>
    </Modal>
  );
};

export default TodoModal;
