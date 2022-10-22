import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  IconButton,
  Button,
  Stack,
  Flex,
  Text,
} from "@chakra-ui/react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { FC, memo, useEffect, useState } from "react";
import { Auth, getAuth, onAuthStateChanged } from "firebase/auth";

import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { db } from "../../../firebase";
import { useRooms } from "../../../hooks/useRooms";

type todoStatus = {
  status: string;
  tid: string;
};
export const TodoStatusButton: FC<todoStatus> = memo((props) => {
  const { status, tid } = props;

  const roomsData = useRooms();
  const rooms = roomsData.rooms;

  const [todoData, setTodoData] = useState<string>("");

  useEffect(() => {
    const auth: Auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(
          collection(db, `rooms/${rooms?.id}/todos`),
          where("tid", "==", tid)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const docData = doc.data();
          docData.id = doc.id;
          setTodoData(docData.id);
        });
      }
    });
  }, [rooms]);

  const chengeToCurrent = async () => {
    const todoStatusRef = doc(db, `rooms/${rooms?.id}/todos/${todoData}`);
    await updateDoc(todoStatusRef, {
      status: "current",
    });
  };
  const chengeToProgressing = async () => {
    const todoStatusRef = doc(db, `rooms/${rooms?.id}/todos/${todoData}`);
    await updateDoc(todoStatusRef, {
      status: "progressing",
    });
  };
  const chengeToDone = async () => {
    const todoStatusRef = doc(db, `rooms/${rooms?.id}/todos/${todoData}`);
    await updateDoc(todoStatusRef, {
      status: "done",
    });
  };
  const deleteTodoData = async () => {
    const todoStatusRef = doc(db, `rooms/${rooms?.id}/todos/${todoData}`);
    await deleteDoc(todoStatusRef);
  };

  return (
    <Flex justifyContent="center">
      <Popover placement="bottom" isLazy>
        <PopoverTrigger>
          <IconButton
            aria-label="MENU"
            icon={<IoEllipsisHorizontalSharp />}
            variant="solid"
            w={5}
            h={5}
          />
        </PopoverTrigger>
        <PopoverContent w="fit-content" _focus={{ boxShadow: "none" }}>
          <PopoverArrow />
          <PopoverBody>
            <Stack>
              {status !== "current" ? (
                <Button
                  variant="ghost"
                  fontWeight="normal"
                  fontSize="sm"
                  onClick={chengeToCurrent}
                >
                  <Text fontWeight="600">現在のタスク</Text>に追加
                </Button>
              ) : null}
              {status !== "progressing" ? (
                <Button
                  variant="ghost"
                  fontWeight="normal"
                  fontSize="sm"
                  onClick={chengeToProgressing}
                >
                  <Text fontWeight="600">進行中のタスク</Text>に追加
                </Button>
              ) : null}
              {status !== "done" ? (
                <Button
                  variant="ghost"
                  fontWeight="normal"
                  fontSize="sm"
                  onClick={chengeToDone}
                >
                  <Text fontWeight="600">完了したタスク</Text>に追加
                </Button>
              ) : null}

              <Button
                variant="ghost"
                fontWeight="600"
                colorScheme="red"
                fontSize="sm"
                onClick={deleteTodoData}
              >
                タスクを削除する
              </Button>
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
});
