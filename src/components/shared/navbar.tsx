import { MainNav } from "./main-nav";
import { UserNav } from "./user-nav";

const Navbar = () => {
  return (
    <div className="top-0 bg-white dark:bg-slate-900 navbar w-full rounded-b-xl">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4 pr-4">
            <UserNav />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
