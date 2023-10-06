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
import { Input } from "../ui/input";
import MultiAutocompleteInput from "../ui/multi-autocomplete-input";
import { tagsOptions } from "../../constants/data";

interface Props {
  initialData?: Post | undefined;
  onCancel?: () => void;
  onConfirm?: () => void;
}

const formSchema = z.object({
  title: z.string().min(3),
  body: z.string().min(10),
  tags: z.string().array(),
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
        title: "",
        body: "",
        tags: [],
        userId: user.id?.toString(),
      };

  const form = useForm<PostFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const createHandler = (data: PostFormValues) => {
    createPost({ title: data.title, userId: Number(data.userId) })
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
      body: { title: data.title },
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
          name="title"
          render={({ field }) => (
            <FormItem className="grid mt-2">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} disabled={loading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem className="grid mt-2">
              <FormLabel>Body</FormLabel>
              <FormControl>
                <Textarea {...field} disabled={loading || isEdit} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="grid mt-2">
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <MultiAutocompleteInput
                  selectedItems={field.value}
                  onValueChange={field.onChange}
                  name="Tags"
                  options={tagsOptions}
                  disabled={loading || isEdit}
                  disabledPopover
                  maxLength={2}
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
