import { useEffect, useState } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useRooms } from "./useRooms";
import { format } from "date-fns";

type calendarData = {
  title: string;
  startDate: string;
  endDate: string;
};

export const useCalendar = () => {
  const [calendarData, setCalendarData] = useState<calendarData[]>([]);

  const roomsData = useRooms();
  const rooms = roomsData.rooms;

  useEffect(() => {
    const q = query(collection(db, `rooms/${rooms?.id}/todo`));

    // リアルタイムのデータ取得
    onSnapshot(q, (querySnapshot) => {
      const result: any[] = [];
      querySnapshot.forEach((doc) => {
        const calendarArr = {
          title: doc.data().title ?? "",
          start: doc.data().startDate
            ? format(doc.data().startDate.toDate(), "yyyy-MM-dd")
            : "",
          end: doc.data().endDate
            ? format(doc.data().endDate.toDate(), "yyyy-MM-dd")
            : "",
        };
        result.push(calendarArr);
      });
      setCalendarData(result);
    });
  }, [rooms]);
  return { calendarData };
};
