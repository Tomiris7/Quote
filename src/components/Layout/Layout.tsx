import { FC } from "react";
import { Toolbar } from "../Navigation/Toolbar/Toolbar.tsx";
import { Outlet } from "react-router-dom";

export const Layout: FC = () => {
  return (
    <>
      <Toolbar />
      <div className="MainContent">
        <Outlet />
      </div>
    </>
  );
};
