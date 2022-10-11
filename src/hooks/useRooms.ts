import { useContext, useEffect, useState } from "react";
import {
  DocumentData,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import { Auth, getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase";
export const useRooms = () => {
  const [rooms, setRooms] = useState<DocumentData | null>(null);
  const params = useParams();

  useEffect(() => {
    const auth: Auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const projectId = params.id;

        const q = query(
          collection(db, "rooms"),
          where("projectId", "==", projectId)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const docData = doc.data();
          docData.id = doc.id;
          setRooms(docData);
          // console.log(docData)
        });
      }
    });
  }, []);
  return { rooms };
};
