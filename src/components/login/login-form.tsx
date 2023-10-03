import React from "react";
import * as z from "zod";
import { cn } from "../../lib/utils";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Icons } from "../../constants/icons";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/features/auth/auth-service";
import { toast } from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordInput from "../ui/password-input";

const formSchema = z.object({
  username: z.string().min(2),
  password: z.string().min(6),
});

type LoginFormValues = z.infer<typeof formSchema>;

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginForm({ className, ...props }: LoginFormProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [login] = useLoginMutation();

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    const { username, password } = data;
    login({ username, password })
      .unwrap()
      .then((res) => {
        const { firstName, lastName } = res;
        toast.success(`Welcome ${firstName} ${lastName}`);
        navigate("/users");
      })
      .catch((err) => toast.error(err.data.message))
      .finally(() => setIsLoading(false));
  };

  const defaultValues = {
    username: "kminchelle",
    password: "0lelplR",
  };

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="grid mt-2">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="grid mt-2">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isLoading} className="w-full">
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Log in with username"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
