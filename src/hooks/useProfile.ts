import { useEffect, useState } from "react";
import {
  DocumentData,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { Auth, getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase";

export const useProfile = () => {
  const [profile, setProfile] = useState<DocumentData | null>(null);

  useEffect(() => {
    const auth: Auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userUid = user.uid;

        const q = query(collection(db, "users"), where("uid", "==", userUid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const docData = doc.data();
          docData.id = doc.id;
          setProfile(docData);
        });
      }
    });
  }, []);
  return { profile };
};
