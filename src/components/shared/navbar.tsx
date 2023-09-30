import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/app/hooks";
import { logoutHandler } from "../../redux/features/auth/auth-slice";
import { Button } from "../ui/button";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function onLogout() {
    dispatch(logoutHandler());
    navigate("/login");
  }
  return (
    <div className="top-0 bg-white dark:bg-slate-900 navbar w-full rounded-b-xl">
      <div className="flex justify-between p-2 md:x-6 relative space-x-2">
        <Link to="/users">Users</Link>
        <Link to="/todos">Todos</Link>

        <Button onClick={onLogout}>Logout</Button>
      </div>
    </div>
  );
};

export default Navbar;
