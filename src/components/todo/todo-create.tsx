import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { Button } from "../ui/button";
import TodoModal from "./todo-modal";
import { PlusCircle } from "lucide-react";
import {
  selectTodoById,
  selectTodoModal,
  setSelectedTodoId,
  toggleTodoHandler,
} from "../../redux/features/todo/todo-slice";

const TodoCreate = () => {
  const todoModal = useAppSelector(selectTodoModal);
  const dispatch = useAppDispatch();
  const initialData = useAppSelector((state) =>
    selectTodoById(state, todoModal.todoId as number)
  );

  function onClick() {
    dispatch(setSelectedTodoId(null));
    dispatch(toggleTodoHandler(true));
  }

  return (
    <>
      <Button onClick={onClick} className="space-x-4">
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Todo
      </Button>
      <TodoModal
        isOpen={todoModal.isOpen}
        onClose={() => dispatch(toggleTodoHandler(false))}
        onConfirm={() => dispatch(toggleTodoHandler(false))}
        initialData={initialData}
      />
    </>
  );
};

export default TodoCreate;
