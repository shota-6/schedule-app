import { memo, FC } from "react";
import { Link } from "react-router-dom";

export const HomeUser: FC = memo(() => {
  return (
    <>
      <h1>ユーザーHOMEページです</h1>
      <br />
      <Link to="/">ユーザーログインページに移動</Link>
    </>
  );
});
