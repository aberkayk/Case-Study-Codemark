import { useNavigate } from "react-router-dom";
import { useSessionUser } from "../../hooks/use-session-user";
import { useAppDispatch } from "../../redux/app/hooks";
import { logoutHandler } from "../../redux/features/auth/auth-slice";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function UserNav() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useSessionUser();

  function onLogout() {
    dispatch(logoutHandler());
    navigate("/login");
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="relative h-8 w-8 rounded-full border-slate-500">
          <Avatar className="h-8 w-8 border-slate-400">
            <AvatarImage src={user.image} alt={user.shortname} />
            <AvatarFallback>{user.shortname}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.fullname}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer" onClick={onLogout}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
