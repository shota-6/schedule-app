import { memo, FC } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../../firebase";
export const HomeUser: FC = memo(() => {
  if (!auth.currentUser) {
    return <Navigate replace to="/" />;
  } else {
    return (
      <>
        <h1>ユーザーHOMEページです</h1>
      </>
    );
  }
});
