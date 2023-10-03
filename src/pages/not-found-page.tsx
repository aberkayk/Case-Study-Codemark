import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="dark:bg-main-dark-bg bg-main-bg min-h-screen w-full">
      <main className="grid min-h-full place-items-center bg-white py-24 px-6 sm:py-32 lg:px-8 w-full dark:bg-secondary-dark-bg">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-200">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/users"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back to users page
            </Link>
            <Link
              to="/todos"
              className="text-sm font-semibold text-gray-900 dark:text-gray-200"
            >
              Go back to todos page
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
