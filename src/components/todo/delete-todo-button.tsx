import { useState } from "react";
import { useDeleteTodoMutation } from "../../redux/features/todo/todo-service";
import AlertModal from "../modals/alert-modal";
import { Button } from "../ui/button";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";

interface Props {
  todoId: number;
}

const DeleteTodoButton = ({ todoId }: Props) => {
  const [deleteTodo] = useDeleteTodoMutation();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  function onClick() {
    setOpen(true);
  }

  const onConfirm = () => {
    setLoading(true);
    deleteTodo(todoId)
      .unwrap()
      .then(() => {
        toast.success("Todo deleted");
      })
      .catch((err) => {
        toast.error(err.data.message);
      })
      .finally(() => {
        setOpen(false);
        setLoading(false);
      });
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <Button onClick={onClick} variant="ghost">
        <Trash className="h-5 w-5 text-slate-600" />
      </Button>
    </>
  );
};

export default DeleteTodoButton;
