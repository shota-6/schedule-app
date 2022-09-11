import { memo, FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { HomeUser } from "../HomeUser";
import { HeaderLayout } from "../../template/HeaderLayout";
import { Auth } from "../Auth";
import { LoginVisiter } from "../LoginVisiter";

export const Router: FC = memo(() => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Auth />} />
        <Route path="/visiter" element={<LoginVisiter />} />
        <Route path="/" element={<HeaderLayout />}>
          <Route path="/home" element={<HomeUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
});
