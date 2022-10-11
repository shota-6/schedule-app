import {
  Avatar,
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FC, memo, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext, AppContextType } from "../../App";
import { SideBar } from "../organisms/header/SideBar";
import { IoSend } from "react-icons/io5";
import { useProfile } from "../../hooks/useProfile";
import { useRooms } from "../../hooks/useRooms";

import { format } from "date-fns";
// import { ja } from "date-fns/locale";

import {
  collection,
  onSnapshot,
  setDoc,
  doc,
  query,
  orderBy,
  getDoc,
  where,
  serverTimestamp,
  DocumentData,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase";
import { ChatMessage } from "../organisms/project/ChatMessage";
// import { NavLink as RouterLink } from "react-router-dom";

export const ProjectRoom: FC = memo(() => {
  const context: AppContextType = useContext(AppContext);
  const [isComposed, setIsComposed] = useState(false);
  const [sendDisable, setSendDisabled] = useState(true);

  const params = useParams();

  const roomsData = useRooms();
  const rooms = roomsData.rooms;

  const profileData = useProfile();
  const profile = profileData.profile;

  const auth = getAuth();
  const user = auth.currentUser;

  const [message, setMessage] = useState("");

  const handleMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.currentTarget.value);
    if (event.currentTarget.value) {
      setSendDisabled(false);
    } else {
      setSendDisabled(true);
    }
  };

  const createChatId = () => {
    const len = 15;
    const str = "abcdefghijklmnopqrstuvwxyz0123456789";
    const strLen = str.length;
    let resultChatId = "";

    for (let i = 0; i < len; i++) {
      resultChatId += str[Math.floor(Math.random() * strLen)];
    }

    return resultChatId;
  };

  const chatData = {
    message: message,
    createdAt: serverTimestamp(),
    name: profile?.name,
    AvatarImg: profile?.avatarImg,
    uid: profile?.uid,
    cid: createChatId(),
  };

  const sendMessage = (event: any) => {
    const roomSubCollectionRef = collection(db, "rooms", rooms?.id, "chat");
    setDoc(doc(roomSubCollectionRef), chatData);
    setMessage("");
    setSendDisabled(true);
    event.preventDefault();
  };

  useEffect(() => {
    // const q = collection(db, `rooms/${rooms?.id}/chat`);
    const q = query(
      collection(db, `rooms/${rooms?.id}/chat`),
      orderBy("createdAt", "asc")
    );

    onSnapshot(q, (querySnapshot) => {
      const result: any[] = [];

      querySnapshot.forEach((doc) => {
        const chatDataArr = {
          message: doc.data().message ?? "",
          //   createdAt: doc.data({serverTimestamps:"estimate"}).createdAt.toDate() ?? "",
          createdAt: doc.data().createdAt
            ? format(doc.data().createdAt.toDate(), "yyyy年MM月dd日 HH:m")
            : "",
          // format(doc.data().createdAt.toDate(), "yyyy年MM月dd日 HH:m") ?? "",
          name: doc.data().name ?? "",
          uid: doc.data().uid ?? "",
          cid: doc.data().cid ?? "",
          AvatarImg: doc.data().AvatarImg ?? "",
        };
        result.push(chatDataArr);
      });
      context.setChatDataArr(result);
    });
  }, [rooms]);

  // console.log(context.chatDataArr);

  const MessageLength = context.chatDataArr.length;
  return (
    <Grid
      templateRows="repeat(13, 1fr)"
      templateColumns="repeat(7, 1fr)"
      height={"calc( 100vh - 60px )"}
      pos="fixed"
      bottom="0"
      width="100vw"
    >
      {/* <Box width={"calc( 100% - 10rem )"} pos="absolute" top="60px" right="0">
        {context.roomArr.map((each) => (
          <div key={each.projectId}>
            {each.projectId === params.id ? (
              <>
                <p>{each.projectName}</p>
                <p>{each.projectPass}</p>
                <p>{each.projectId}</p>
              </>
            ) : null}
          </div>
        ))}
      </Box> */}
      <SideBar />

      <GridItem
        colSpan={{ base: 7, md: 6 }}
        rowSpan={1}
        py={3}
        px={5}
        bg="white"
        borderBottom="1px"
        borderBottomColor="gray.200"
      >
        {context.roomArr.map((each) => (
          <Flex key={each.projectId}>
            {each.projectId === params.id ? (
              <Heading as="h2" fontSize="lg">
                {each.projectName}
              </Heading>
            ) : null}
          </Flex>
        ))}
      </GridItem>

      <GridItem
        colSpan={{ base: 7, md: 6 }}
        rowSpan={{ base: 11, md: 11 }}
        overflow="auto"
      >
        <Stack spacing={0}>
          {context.chatDataArr.map((data, index) => {
            const isLastItem = MessageLength === index + 1;

            return (
              <ChatMessage
                message={data.message}
                createdAt={data.createdAt}
                name={data.name}
                AvatarImg={data.AvatarImg}
                uid={data.uid}
                cid={data.cid}
                key={data.cid}
                isLastItem={isLastItem}
              />
            );
          })}
        </Stack>
      </GridItem>

      <GridItem
        px={5}
        py={{ base: 2, md: 5 }}
        colSpan={{ base: 7, md: 6 }}
        rowSpan={1}
        bg="white"
        borderTop="1px"
        borderTopColor="gray.200"
      >
        <Flex justify="space-between">
          <Input
            variant={{ base: "unstyled", md: "flushed" }}
            placeholder="ここにメッセージ内容を入力"
            size={{ base: "sm", md: "md" }}
            width="90%"
            onChange={handleMessage}
            autoFocus
            onKeyDown={(event: any) => {
              if (isComposed) return;
              if (event.target.value === "") return;

              if (event.key === "Enter") {
                const roomSubCollectionRef = collection(
                  db,
                  "rooms",
                  rooms?.id,
                  "chat"
                );
                setDoc(doc(roomSubCollectionRef), chatData);
                setMessage("");
                setSendDisabled(true);
                event.preventDefault();
              }
            }}
            onCompositionStart={() => setIsComposed(true)}
            onCompositionEnd={() => setIsComposed(false)}
            value={message}
          />
          <IconButton
            aria-label="SEND"
            icon={<IoSend />}
            width="5%"
            colorScheme="blue"
            size="md"
            onClick={sendMessage}
            disabled={sendDisable}
          />
        </Flex>
      </GridItem>
    </Grid>
  );
});
