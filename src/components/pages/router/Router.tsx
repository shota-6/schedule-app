import { memo, FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { HomeUser } from "../HomeUser";
import { LoginUser } from "../LoginUser";
import { HeaderLayout } from "../../template/HeaderLayout";

export const Router: FC = memo(() => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginUser />} />
        <Route path="/" element={<HeaderLayout />}>
          <Route path="/user_home" element={<HomeUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
});
