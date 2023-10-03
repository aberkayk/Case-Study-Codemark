import { Link } from "react-router-dom";
import { useCurrentPath } from "../../hooks/use-current-path";
import { cn } from "../../lib/utils";
import { routes } from "../../routes";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const currentPath = useCurrentPath();
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {routes.map((route, index) => (
        <Link
          key={index}
          to={route.path}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.path !== currentPath && "text-muted-foreground "
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
