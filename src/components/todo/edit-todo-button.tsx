import { Button } from "../ui/button";
import { Pencil } from "lucide-react";
import { useAppDispatch } from "../../redux/app/hooks";
import {
  setSelectedTodoId,
  toggleTodoModal,
} from "../../redux/features/todo/todo-slice";

interface Props {
  todoId: number;
}

const EditTodoButton = ({ todoId }: Props) => {
  const dispatch = useAppDispatch();

  function onClick() {
    dispatch(setSelectedTodoId(todoId));
    dispatch(toggleTodoModal(true));
  }

  return (
    <Button onClick={onClick} variant="ghost">
      <Pencil className="h-5 w-5 text-slate-600" />
    </Button>
  );
};

export default EditTodoButton;
