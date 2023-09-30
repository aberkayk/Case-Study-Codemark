import React from "react";
import { cn } from "../../lib/utils";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Icons } from "../../constants/icons";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/features/auth/auth-service";
import { toast } from "react-hot-toast";

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginForm({ className, ...props }: LoginFormProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [login] = useLoginMutation();
  const [loginState, setLoginState] = React.useState({
    username: "kminchelle",
    password: "0lelplR",
  });

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    const { username, password } = loginState;
    login({ username, password })
      .unwrap()
      .then((res) => {
        const { firstName, lastName } = res;
        toast.success(`Welcome ${firstName} ${lastName}`);
        navigate("/users");
      })
      .catch(() => toast.error(`Opps.. Something went wrong!`))
      .finally(() => setIsLoading(false));
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="username">
              Username
            </Label>
            <Input
              value={loginState.username}
              onChange={(event) =>
                setLoginState((prev) => ({
                  ...prev,
                  username: event.target.value,
                }))
              }
              id="username"
              placeholder="name@example.com"
              type="text"
              autoCapitalize="none"
              autoComplete="text"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              value={loginState.password}
              onChange={(event) =>
                setLoginState((prev) => ({
                  ...prev,
                  password: event.target.value,
                }))
              }
              id="password"
              placeholder="name@example.com"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Log in with username"
            )}
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
      </div>
    </div>
  );
}
