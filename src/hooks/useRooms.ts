import { useContext, useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { Auth, getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase";
import { AppContext, AppContextType } from "../App";

type projectArrMap = {
  id: string;
};

export const useRooms = () => {
  const context: AppContextType = useContext(AppContext);
  const roomsInfo = context.roomsInfo;

  useEffect(() => {
    const auth: Auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userUid = user.uid;

        const q = query(collection(db, "rooms"), where("uid", "==", userUid));
        // const querySnapshot = await getDocs(q);

        // const queryDocumentSnapshot = querySnapshot.docs;
        // const documentData = queryDocumentSnapshot[0];

        // context.setRoomsInfo(documentData.data());

        // querySnapshot.forEach((doc) => {
        //     if (doc.exists()) {
        //         const docData = doc.data();
        //         docData.id = doc.id;
        //         context.setRoomsInfo(docData);

        //     } else {
        //       console.log("No such document");
        //     }
        // });


        // getDocs(q).then((querySnapshot) => {
        //   context.setRoomsInfo(querySnapshot.docs.map((doc) => doc.data()));
        // });

      }
    });
  }, []);
  return { roomsInfo };
};
