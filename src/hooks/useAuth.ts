import { getAuth } from "firebase/auth";

export const useUser = () => {
  const auth = getAuth();
  const userAuth = auth.currentUser;

  if (userAuth !== null) {
    const email = userAuth.email;
    const uid = userAuth.uid;

    const userInfo = {
      email,
      uid,
    };

    return { userAuth: userInfo };
  } else {
    return { userAuth };
  }
};
