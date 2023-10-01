import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Todo } from "../../types";
import { Switch } from "../ui/switch";
import AutocompleteInput from "../ui/autocomplete-input";
import { useUsers } from "../../hooks/use-users";
import { Button } from "../ui/button";
import { useSessionUser } from "../../hooks/use-session-user";
import { Textarea } from "../ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  useCreateTodoMutation,
  useUpdateTodoMutation,
} from "../../redux/features/todo/todo-service";

interface Props {
  initialData?: Todo | undefined;
  onCancel?: () => void;
  onConfirm?: () => void;
}

const formSchema = z.object({
  todo: z.string().min(3),
  completed: z.boolean(),
  userId: z.string().min(1, { message: "Required" }),
});

type TodoFormValues = z.infer<typeof formSchema>;

const TodoForm = ({ initialData, onCancel, onConfirm }: Props) => {
  const { userOptions } = useUsers();
  const user = useSessionUser();
  const [loading, setLoading] = useState(false);
  const [createTodo] = useCreateTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();

  const isEdit = !!initialData;
  const toastMessage = isEdit ? "Todo updated" : "Todo created";
  const action = isEdit ? "Save" : "Create";
  const defaultValues = isEdit
    ? {
        ...initialData,
        userId: initialData?.userId.toString(),
      }
    : {
        todo: "",
        completed: false,
        userId: user.id?.toString(),
      };

  const form = useForm<TodoFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const createHandler = (data: TodoFormValues) => {
    createTodo({ ...data, userId: Number(data.userId) })
      .unwrap()
      .then(() => {
        toast.success(toastMessage);
      })
      .catch((err) => {
        toast.error(err.data.message);
      });
  };

  const updateHandler = (todoId: number, data: TodoFormValues) => {
    updateTodo({
      todoId: todoId,
      body: { completed: data.completed },
    })
      .unwrap()
      .then(() => {
        toast.success(toastMessage);
      })
      .catch((err) => {
        toast.error(err.data.message);
      });
  };

  const onSubmit = async (data: TodoFormValues) => {
    try {
      setLoading(true);
      if (isEdit) {
        updateHandler(initialData.id, data);
      } else {
        createHandler(data);
      }
    } finally {
      setLoading(false);
      if (onConfirm) onConfirm();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <FormField
          control={form.control}
          name="todo"
          render={({ field }) => (
            <FormItem className="grid mt-2">
              <FormLabel>Todo</FormLabel>
              <FormControl>
                <Textarea {...field} disabled={loading || isEdit} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="completed"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Is Completed</FormLabel>
                <FormDescription>Todo is completed!</FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem className="grid mt-2">
              <FormLabel>User</FormLabel>
              <FormControl>
                <AutocompleteInput
                  selectedItem={field.value}
                  onValueChange={field.onChange}
                  name="User"
                  options={userOptions}
                  disabled={loading || isEdit}
                  disabledPopover
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between items-center">
          {onCancel && (
            <Button
              disabled={loading}
              type="button"
              variant="outline"
              onClick={onCancel}
            >
              Cancel
            </Button>
          )}

          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TodoForm;
