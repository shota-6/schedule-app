import { memo, FC } from "react";
import { Outlet } from "react-router-dom";
import { WithSubNavigation } from "../organisms/header/HeaderNav";

export const HeaderLayout: FC = memo(() => {
  return (
    <>
      <WithSubNavigation />
      <Outlet />
    </>
  );
});
