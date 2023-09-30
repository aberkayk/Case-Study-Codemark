import { useUpdateTodoMutation } from "../../redux/features/todo/todo-service";
import { Button } from "../ui/button";
import { CheckCircle, XCircle } from "lucide-react";

interface Props {
  todoId: number;
  isCompleted: boolean;
}

const TodoCompletedField = ({ isCompleted, todoId }: Props) => {
  const [updateTodo] = useUpdateTodoMutation();

  function onClick() {
    updateTodo({ todoId, body: { completed: !isCompleted } })
      .then(() => {})
      .catch((err) => {});
  }

  return (
    <Button variant="ghost" onClick={onClick}>
      {isCompleted ? (
        <CheckCircle className="h-6 w-6 text-green-500" />
      ) : (
        <XCircle className="h-6 w-6 text-red-500" />
      )}
    </Button>
  );
};

export default TodoCompletedField;
