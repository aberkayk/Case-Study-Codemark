import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/app/hooks";
import { selectIsAuth } from "../redux/features/auth/auth-slice";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  let isAuth = useAppSelector(selectIsAuth);
  let location = useLocation();

  if (!isAuth) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
