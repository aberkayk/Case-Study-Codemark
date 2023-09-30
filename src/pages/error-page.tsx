import { useRouteError } from "react-router-dom";
import NotFoundPage from "./not-found-page";

export default function ErrorPage() {
  const error: any = useRouteError();

  if (error.status === 404) return <NotFoundPage />;
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
