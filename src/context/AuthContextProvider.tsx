import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

/**
 * 簡易的な認証情報の型のサンプル
 */
type AuthInfo = {
  userId: string;
};
const auth = getAuth();
const user = auth.currentUser;
console.log(user?.uid);
// ログイン状態のContext
export const LoggedInContext = React.createContext<boolean>(false);

// 認証情報と認証情報セットのContext
export const AuthInfoContext = React.createContext<
  [AuthInfo, React.Dispatch<React.SetStateAction<AuthInfo>>]
>([{ userId: "" }, () => {}]);

/**
 * デフォルトのAuthInfoを取得
 * ローカルストレージから取得できた場合はその値をパース
 * 取得できない場合は空の情報を返す
 * @returns
 */
function getDefaultAuthInfo(): AuthInfo {
  const defaultAuthInfo = window.localStorage.getItem("authInfo");
  if (defaultAuthInfo) {
    return JSON.parse(defaultAuthInfo) as AuthInfo;
  } else {
    return { userId: "" };
  }
}

/**
 * 認証情報をローカルストレージに追加
 * @param authInfo
 */
function setAutoInfoToLocalStorage(authInfo: AuthInfo): void {
  const authInfoStringfy = JSON.stringify(authInfo);
  window.localStorage.setItem("authInfo", authInfoStringfy);
}

/**
 * コンテキストのProvider
 */
export const AuthContextProvider: React.FC<{}> = (props) => {
  // stateの定義
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [authInfo, setAuthInfo] = useState<AuthInfo>(getDefaultAuthInfo());

  console.log(loggedIn);
  console.log(authInfo);

  // authInfoのバリデーション
  useEffect(() => {
    // authInfoに正しく値がセットされているかどうかをチェック
    if (authInfo?.userId) {
      setAutoInfoToLocalStorage(authInfo);
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [authInfo]);
  return (
    // <LoggedInContext.Provider value={loggedIn}>
    //   <AuthInfoContext.Provider value={[authInfo, setAuthInfo]}>
    //     {props.children}
    //   </AuthInfoContext.Provider>
    // </LoggedInContext.Provider>
    <p>s</p>
  );
};
