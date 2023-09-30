import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

const Layout = () => {
  return (
    <div className="flex relative dark:bg-slate-800">
      <div className="dark:bg-slate-800 bg-main-bg min-h-screen w-full">
        <Navbar />
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
