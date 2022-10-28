import { memo, FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { HomeUser } from "../HomeUser";
import { HeaderLayout } from "../../template/HeaderLayout";
import { AuthPage } from "../AuthPage";
import { LoginVisiter } from "../LoginVisiter";
import { ProjectChat } from "../ProjectChat";
import { SideBarLayout } from "../../template/SidebarLayout";
import { ProjectTodo } from "../ProjectTodo";
import { ProjectCalendar } from "../ProjectCalendar";
import { PlanList } from "../PlanList";
import { Howto } from "../Howto";
import { CheckVisiter } from "../CheckVisiter";
import { LoginHeader } from "../../template/LoginHeader";

// import { Auth, getAuth, onAuthStateChanged } from "firebase/auth";
// const auth: Auth = getAuth();
// onAuthStateChanged(auth, async (user) => {
//   if (user) {
//     console.log("user");
//   }
//   // ログイン時
//   else {
//     console.log("not user");
//   }
// });

export const Router: FC = memo(() => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginHeader />}>
          <Route index element={<AuthPage />} />
          <Route path="/visiter" element={<LoginVisiter />} />
          <Route path="/confirm" element={<CheckVisiter />} />
        </Route>

        <Route path="/" element={<HeaderLayout />}>
          <Route path="/home" element={<HomeUser />} />
          <Route path="/howto" element={<Howto />} />
          <Route path="/" element={<SideBarLayout />}>
            <Route path="/:id/chat" element={<ProjectChat />} />
            <Route path="/:id/todo" element={<ProjectTodo />} />
            <Route path="/:id/calendar" element={<ProjectCalendar />} />
            <Route path="/:id/list" element={<PlanList />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
});
