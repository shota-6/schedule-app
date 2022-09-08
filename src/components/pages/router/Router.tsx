import { memo, FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { HomeUser } from "../HomeUser";
import { LoginUser } from "../LoginUser";

export const Router: FC = memo(() => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginUser />} />
        <Route path="/user_home" element={<HomeUser />} />
      </Routes>
    </BrowserRouter>
  );
});
