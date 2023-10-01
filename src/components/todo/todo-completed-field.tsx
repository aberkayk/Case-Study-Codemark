import { useOptimisticUpdateTodoMutation } from "../../redux/features/todo/todo-service";
import { Button } from "../ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { toast } from "react-hot-toast";

interface Props {
  todoId: number;
  isCompleted: boolean;
}

const TodoCompletedField = ({ isCompleted, todoId }: Props) => {
  const [optimisticUpdateTodo] = useOptimisticUpdateTodoMutation();

  function onClick() {
    optimisticUpdateTodo({ id: todoId, completed: !isCompleted })
      .unwrap()
      .then(() =>
        toast.success(`Todo is ${!isCompleted ? "completed" : "not completed"}`)
      )
      .catch((err) => {
        toast.error(err.data.message);
      });
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
