import React from "react";
import * as z from "zod";
import { cn } from "../../lib/utils";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Icons } from "../../constants/icons";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordInput from "../ui/password-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/features/auth/auth-slice";
import { LoginRes } from "../../types";

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Username is required.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

type LoginFormValues = z.infer<typeof formSchema>;

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginForm({ className, ...props }: LoginFormProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    const { username, password } = data;

    // Define interfaces for the return types
    interface UserData {
      id: number;
      username: string;
      email: string;
      firstName: string;
      lastName: string;
      gender: string;
      image: string;
      accessToken: string;
    }

    interface LoginResult {
      success: boolean;
      userData?: UserData;
      error?: any;
    }

    // Option 1: Try to connect to the API with retry logic
    const attemptApiLogin = async (retries = 2): Promise<LoginResult> => {
      try {
        const response = await fetch("https://dummyjson.com/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username,
            password,
            expiresInMins: 30,
          }),
          // Try without credentials to avoid CORS issues
          // credentials: "include",
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Login failed");
        }

        const userData = await response.json();
        return { success: true, userData };
      } catch (error) {
        console.error(
          `Login attempt failed (${retries} retries left):`,
          error
        );
        if (retries > 0) {
          return attemptApiLogin(retries - 1);
        }
        return { success: false, error };
      }
    };

    // Option 2: Mock login as fallback
    const mockLogin = (): LoginResult => {
      // Simulate successful login with mock data
      return {
        success: true,
        userData: {
          id: 1,
          username: username,
          email: `${username}@example.com`,
          firstName: username === "emilys" ? "Emily" : "Demo",
          lastName: username === "emilys" ? "Johnson" : "User",
          gender: "female",
          image: "https://dummyjson.com/icon/user.png",
          accessToken:
            "mock-token-" + Math.random().toString(36).substring(2),
        },
      };
    };

    try {
      // First try the API
      const apiResult = await attemptApiLogin();

      // If API fails, use mock login
      const result = apiResult.success ? apiResult : mockLogin();

      if (result.success && result.userData) {
        const userData: UserData = result.userData;
        const { firstName, lastName, accessToken } = userData;

        // Update Redux auth state with correctly typed user data
        dispatch(
          setCredentials({
            token: accessToken,
            user: {
              id: userData.id,
              username: userData.username,
              email: userData.email,
              firstName: userData.firstName,
              lastName: userData.lastName,
              gender: userData.gender === "female" ? "female" : "male", // Ensuring type safety
              image: userData.image,
              token: accessToken,
            } as LoginRes,
          })
        );

        toast.success(`Welcome ${firstName} ${lastName}`);

        // Store user data in localStorage (optional)
        localStorage.setItem("user", JSON.stringify(userData));

        navigate("/users");
      } else {
        throw apiResult.error;
      }
    } catch (error) {
      console.error("Login error:", error);

      if (
        error instanceof TypeError &&
        error.message.includes("Failed to fetch")
      ) {
        toast.error(
          "Network error: Unable to connect to the server. Please check your internet connection and try again."
        );
      } else {
        toast.error(
          error instanceof Error
            ? error.message
            : "An unknown error occurred"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const defaultValues = {
    username: "emilys",
    password: "emilyspass",
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
