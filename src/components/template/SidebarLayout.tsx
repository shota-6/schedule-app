import { memo, FC } from "react";
import { Outlet } from "react-router-dom";
import { SideBar } from "../organisms/header/SideBar";

export const SideBarLayout: FC = memo(() => {
  return (
    <>
      <SideBar />
      <Outlet />
    </>
  );
});
