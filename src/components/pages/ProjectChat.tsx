import {
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Input,
  Stack,
  Skeleton,
} from "@chakra-ui/react";
import { FC, memo, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AppContext, AppContextType } from "../../App";
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
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase";
import { ChatMessage } from "../organisms/project/ChatMessage";
// import { NavLink as RouterLink } from "react-router-dom";

export const ProjectChat: FC = memo(() => {
  const context: AppContextType = useContext(AppContext);
  const [isComposed, setIsComposed] = useState(false);
  const [sendDisable, setSendDisabled] = useState(true);
  const [loadSkeleton, setLoadSkeleton] = useState(true);
  // const location = useLocation();
  // const [visiterStatus, setVisiterStatus] = useState<{
  //   visiter: boolean;
  //   Pass: string;
  // }>(location.state as { visiter: boolean; Pass: string });

  // console.log(visiterStatus);

  const roomsData = useRooms();
  const rooms = roomsData.rooms;

  const profileData = useProfile();
  const profile = profileData.profile;

  const auth = getAuth();
  const user = auth.currentUser;
  const isAnonymous = user?.isAnonymous;

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

  const VisiterChatData = {
    message: message,
    createdAt: serverTimestamp(),
    // name: context.visiterName,
    name:'ゲスト',
    uid: user?.uid,
    cid: createChatId(),
  };

  // console.log(isAnonymous)

  const sendMessage = (event: any) => {
    const roomSubCollectionRef = collection(db, "rooms", rooms?.id, "chats");
    setDoc(doc(roomSubCollectionRef), isAnonymous ? VisiterChatData : chatData);
    setMessage("");
    setSendDisabled(true);
    event.preventDefault();
  };

  useEffect(() => {
    // const q = collection(db, `rooms/${rooms?.id}/chat`);
    const q = query(
      collection(db, `rooms/${rooms?.id}/chats`),
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
      setTimeout(() => {
        setLoadSkeleton(false);
      }, 1000);
    });
  }, [rooms]);

  // Get Visiter Data
  useEffect(() => {
    const q = query(collection(db, `rooms/${rooms?.id}/visiters`));

    getDocs(q)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const visiterName = doc.data().VisiterName ?? "";
          context.setVisiterName(visiterName);
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, [rooms]);

  // console.log(context.visiterDocRef);

  // console.log(context.visiterArr);

  const MessageLength = context.chatDataArr.length;

  // userAgentでブラウザ情報を取得
  const agent = window.navigator.userAgent.toLowerCase();

  if (!user) {
    return <Navigate replace to="/" />;
  } else {
    return (
      <>
        <Flex
          height="53px"
          width="100%"
          alignItems="center"
          py={3}
          px={5}
          bg="white"
          borderBottom="1px"
          borderBottomColor="gray.200"
          pos="fixed"
          top="61px"
          zIndex="10"
          display={{ base: "block", md: "none" }}
        >
          <Heading as="h2" fontSize="lg" width="100%">
            <Skeleton isLoaded={!loadSkeleton} fadeDuration={1}>
              {rooms?.projectName}
            </Skeleton>
          </Heading>
        </Flex>
        <Grid
          templateRows={{ base: "repeat(13, 1fr)", md: "repeat(14, 1fr)" }}
          templateColumns="repeat(7, 1fr)"
          height={{ base: "calc( 100vh - 113px )", md: "calc( 100vh - 60px )" }}
          pos="fixed"
          bottom="0"
          right="0"
          width={{ base: "100vw", md: "86vw" }}
        >
          <GridItem
            colSpan={7}
            rowSpan={1}
            py={3}
            px={5}
            bg="white"
            borderBottom="1px"
            borderBottomColor="gray.200"
            display={{ base: "none", md: "block" }}
          >
            <Flex height="100%" alignItems="center">
              <Heading as="h2" fontSize="lg" width="100%">
                <Skeleton isLoaded={!loadSkeleton} fadeDuration={1}>
                  {rooms?.projectName}
                </Skeleton>
              </Heading>
            </Flex>
          </GridItem>

          <GridItem
            colSpan={7}
            rowSpan={{ base: 11, md: 12 }}
            overflow="auto"
            mt={{
              base:
                agent.indexOf("crios") != -1
                  ? "100px"
                  : agent.indexOf("gecko) version") != -1
                  ? "85px"
                  : "0",
              md: 0,
            }}
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
                    loadSkeleton={loadSkeleton}
                  />
                );
              })}
            </Stack>
          </GridItem>

          <GridItem
            px={5}
            py={{ base: 2, md: 5 }}
            colSpan={7}
            rowSpan={1}
            bg="white"
            borderTop="1px"
            borderTopColor="gray.200"
          >
            <Flex justify="space-between">
              <Input
                variant={{ base: "unstyled", md: "flushed" }}
                placeholder="ここにメッセージ内容を入力"
                size={{ base: "16px", md: "md" }}
                width="90%"
                onChange={handleMessage}
                autoFocus={
                  window.matchMedia &&
                  window.matchMedia("(max-device-width: 767px)").matches
                    ? false
                    : true
                }
                onKeyDown={(event: any) => {
                  if (isComposed) return;
                  if (event.target.value === "") return;

                  if (event.key === "Enter") {
                    const roomSubCollectionRef = collection(
                      db,
                      "rooms",
                      rooms?.id,
                      "chats"
                    );
                    setDoc(
                      doc(roomSubCollectionRef),
                      isAnonymous ? VisiterChatData : chatData
                    );
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
                size="sm"
                onClick={sendMessage}
                disabled={sendDisable}
              />
            </Flex>
          </GridItem>
        </Grid>
      </>
    );
  }
});
