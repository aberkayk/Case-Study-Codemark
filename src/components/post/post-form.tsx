import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Post } from "../../types";
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
  useCreatePostMutation,
  useUpdatePostMutation,
} from "../../redux/features/post/post-service";

interface Props {
  initialData?: Post | undefined;
  onCancel?: () => void;
  onConfirm?: () => void;
}

const formSchema = z.object({
  post: z.string().min(3),
  completed: z.boolean(),
  userId: z.string().min(1, { message: "Required" }),
});

type PostFormValues = z.infer<typeof formSchema>;

const PostForm = ({ initialData, onCancel, onConfirm }: Props) => {
  const { userOptions } = useUsers();
  const user = useSessionUser();
  const [loading, setLoading] = useState(false);
  const [createPost] = useCreatePostMutation();
  const [updatePost] = useUpdatePostMutation();

  const isEdit = !!initialData;
  const toastMessage = isEdit ? "Post updated" : "Post created";
  const action = isEdit ? "Save" : "Create";
  const defaultValues = isEdit
    ? {
        ...initialData,
        userId: initialData?.userId.toString(),
      }
    : {
        post: "",
        completed: false,
        userId: user.id?.toString(),
      };

  const form = useForm<PostFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const createHandler = (data: PostFormValues) => {
    createPost({ ...data, userId: Number(data.userId) })
      .unwrap()
      .then(() => {
        toast.success(toastMessage);
      })
      .catch((err) => {
        toast.error(err.data.message);
      });
  };

  const updateHandler = (postId: number, data: PostFormValues) => {
    updatePost({
      postId: postId,
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

  const onSubmit = async (data: PostFormValues) => {
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
          name="post"
          render={({ field }) => (
            <FormItem className="grid mt-2">
              <FormLabel>Post</FormLabel>
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
                <FormDescription>Post is completed!</FormDescription>
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

export default PostForm;
