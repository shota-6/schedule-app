import { memo, FC } from "react";
import { Link } from "react-router-dom";

export const LoginUser: FC = memo(() => {
  return (
    <>
      <h1>ユーザーログインページです</h1>
      <br />
      <Link to="/user_home">ユーザーHOMEページに移動</Link>
    </>
  );
});
