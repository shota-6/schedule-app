import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  IconButton,
  Input,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FC, memo, useContext, useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { AppContext, AppContextType } from "../../App";

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
// import { NavLink as RouterLink } from "react-router-dom";

import { TodoTaskModal } from "../organisms/project/TodoTaskModal";
import { TodoStatusButton } from "../molecures/project/TodoStatusButton";

export const ProjectTodo: FC = memo(() => {
  const context: AppContextType = useContext(AppContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const params = useParams();

  const roomsData = useRooms();
  const rooms = roomsData.rooms;

  const profileData = useProfile();
  const profile = profileData.profile;

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const q = query(
      collection(db, `rooms/${rooms?.id}/todo`),
      orderBy("timestamp", "desc")
    );

    // リアルタイムのデータ取得
    onSnapshot(q, (querySnapshot) => {
      const result: any[] = [];
      querySnapshot.forEach((doc) => {
        const todoArr = {
          title: doc.data().title ?? "",
          text: doc.data().text ?? "",
          startDate: doc.data().startDate
            ? format(doc.data().startDate.toDate(), "yyyyMM月dd日")
            : "",
          endDate: doc.data().endDate
            ? format(doc.data().endDate.toDate(), "yyyy年MM月dd日")
            : "",
          priority: doc.data().priority ?? "",
          name: doc.data().name ?? "",
          uid: doc.id,
          tid: doc.data().tid ?? "",
          status: doc.data().status ?? "",
          timestamp: doc.data().timestamp ?? "",
        };
        result.push(todoArr);
      });
      context.setTodoArr(result);
    });
  }, [rooms]);

  //   console.log(context.todoArr)

  const checkstatus = (status: any) => {
    context.setTodoStatus(status);
  };
  const checkstatusJa = (statusJa: any) => {
    context.setTodoStatusJa(statusJa);
  };

  if (!user) {
    return <Navigate replace to="/" />;
  } else {
    return (
      <>
        <Grid
          templateRows="repeat(14, 1fr)"
          templateColumns="repeat(7, 1fr)"
          height={"calc( 100vh - 60px )"}
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
          >
            <Flex height="100%" alignItems="center">
              <Heading as="h2" fontSize="lg">
                {rooms?.projectName}
              </Heading>
            </Flex>
          </GridItem>

          <GridItem
            colSpan={7}
            rowSpan={14}
            overflow={{ base: "auto", lg: "inherit" }}
          >
            <Flex
              justify="space-between"
              m={5}
              flexDirection={{ base: "column", lg: "inherit" }}
              mb={{ base: 20, md: 5, lg: 0 }}
            >
              <Box
                bg="white"
                w={"full"}
                p={5}
                pt={8}
                boxShadow={"2xl"}
                rounded={"md"}
                pos="relative"
              >
                <Box
                  bg="blue.200"
                  w="full"
                  h={5}
                  pos="absolute"
                  top={0}
                  left={0}
                  roundedTop="md"
                ></Box>
                <Stack spacing={4}>
                  <Heading fontSize={"xl"} fontWeight={600}>
                    現在のタスク
                  </Heading>
                  <Button
                    fontSize={{ base: "xs", md: "sm" }}
                    rounded={"lg"}
                    bg={"blue.500"}
                    color={"white"}
                    _hover={{
                      bg: "blue.400",
                    }}
                    _focus={{
                      bg: "blue.400",
                    }}
                    onClick={() => {
                      onOpen();
                      checkstatus("current");
                      checkstatusJa("現在の");
                    }}
                  >
                    タスクを追加
                  </Button>

                  <Stack spacing={4} h="510px" overflow="auto">
                    {context.todoArr.map((data) => {
                      if (data.status === "current") {
                        return (
                          <Stack
                            bg="gray.100"
                            rounded={"md"}
                            p={2}
                            key={data.timestamp}
                          >
                            <Flex justify="space-between">
                              <Heading fontSize={"lg"} fontWeight={500}>
                                {data.title}
                              </Heading>
                              <TodoStatusButton
                                status={data.status}
                                tid={data.tid}
                              />
                            </Flex>
                            <Text fontSize={"sm"}>{data.text}</Text>
                            <Text fontSize={"sm"}>作成者: {data.name} </Text>
                            <Flex justify={"space-between"}>
                              <Text fontSize={"xs"}>
                                {data.startDate} ~ {data.endDate}
                              </Text>
                              <Text
                                fontSize={"xs"}
                                rounded={"full"}
                                px={2}
                                bg={
                                  data.priority === "低"
                                    ? "blue.100"
                                    : data.priority === "中"
                                    ? "yellow.200"
                                    : "red.200"
                                }
                              >
                                優先度: {data.priority}
                              </Text>
                            </Flex>
                          </Stack>
                        );
                      }
                    })}
                    <Text transform="translateY(20vh)" textAlign="center">
                      {context.todoArr.length === 0
                        ? "表示するタスクはありません。"
                        : null}
                    </Text>
                  </Stack>
                </Stack>
              </Box>
              <Box
                bg="white"
                w={"full"}
                p={5}
                pt={8}
                mx={{ base: 0, lg: 5 }}
                my={{ base: 5, lg: 0 }}
                boxShadow={"2xl"}
                rounded={"md"}
                pos="relative"
              >
                <Box
                  bg="yellow.200"
                  w="full"
                  h={5}
                  pos="absolute"
                  top={0}
                  left={0}
                  roundedTop="md"
                ></Box>
                <Stack spacing={4}>
                  <Heading fontSize={"xl"} fontWeight={600}>
                    進行中のタスク
                  </Heading>
                  <Button
                    fontSize={{ base: "xs", md: "sm" }}
                    rounded={"lg"}
                    bg={"blue.500"}
                    color={"white"}
                    _hover={{
                      bg: "blue.400",
                    }}
                    _focus={{
                      bg: "blue.400",
                    }}
                    onClick={() => {
                      onOpen();
                      checkstatus("progressing");
                      checkstatusJa("進行中の");
                    }}
                  >
                    タスクを追加
                  </Button>

                  <Stack spacing={4} h="510px" overflow="auto">
                    {context.todoArr.map((data) => {
                      if (data.status === "progressing") {
                        return (
                          <Stack
                            bg="gray.100"
                            rounded={"md"}
                            p={2}
                            key={data.timestamp}
                          >
                            <Flex justify="space-between">
                              <Heading fontSize={"lg"} fontWeight={500}>
                                {data.title}
                              </Heading>
                              <TodoStatusButton
                                status={data.status}
                                tid={data.tid}
                              />
                            </Flex>
                            <Text fontSize={"sm"}>{data.text}</Text>
                            <Text fontSize={"sm"}>作成者: {data.name} </Text>
                            <Flex justify={"space-between"}>
                              <Text fontSize={"xs"}>
                                {data.startDate} ~ {data.endDate}
                              </Text>
                              <Text
                                fontSize={"xs"}
                                rounded={"full"}
                                px={2}
                                bg={
                                  data.priority === "低"
                                    ? "blue.100"
                                    : data.priority === "中"
                                    ? "yellow.200"
                                    : "red.200"
                                }
                              >
                                優先度: {data.priority}
                              </Text>
                            </Flex>
                          </Stack>
                        );
                      }
                    })}
                    <Text transform="translateY(20vh)" textAlign="center">
                      {context.todoArr.length === 0
                        ? "表示するタスクはありません。"
                        : null}
                    </Text>
                  </Stack>
                </Stack>
              </Box>
              <Box
                bg="white"
                w={"full"}
                p={5}
                pt={8}
                boxShadow={"2xl"}
                rounded={"md"}
                pos="relative"
              >
                <Box
                  bg="red.200"
                  w="full"
                  h={5}
                  pos="absolute"
                  top={0}
                  left={0}
                  roundedTop="md"
                ></Box>
                <Stack spacing={4}>
                  <Heading fontSize={"xl"} fontWeight={600}>
                    完了したタスク
                  </Heading>
                  <Button
                    fontSize={{ base: "xs", md: "sm" }}
                    rounded={"lg"}
                    bg={"blue.500"}
                    color={"white"}
                    _hover={{
                      bg: "blue.400",
                    }}
                    _focus={{
                      bg: "blue.400",
                    }}
                    onClick={() => {
                      onOpen();
                      checkstatus("done");
                      checkstatusJa("完了した");
                    }}
                  >
                    タスクを追加
                  </Button>

                  <Stack spacing={4} h="510px" overflow="auto">
                    {context.todoArr.map((data) => {
                      if (data.status === "done") {
                        return (
                          <Stack
                            bg="gray.100"
                            rounded={"md"}
                            p={2}
                            key={data.timestamp}
                          >
                            <Flex justify="space-between">
                              <Heading fontSize={"lg"} fontWeight={500}>
                                {data.title}
                              </Heading>
                              <TodoStatusButton
                                status={data.status}
                                tid={data.tid}
                              />
                            </Flex>
                            <Text fontSize={"sm"}>{data.text}</Text>
                            <Text fontSize={"sm"}>作成者: {data.name} </Text>
                            <Flex justify={"space-between"}>
                              <Text fontSize={"xs"}>
                                {data.startDate} ~ {data.endDate}
                              </Text>
                              <Text
                                fontSize={"xs"}
                                rounded={"full"}
                                px={2}
                                bg={
                                  data.priority === "低"
                                    ? "blue.100"
                                    : data.priority === "中"
                                    ? "yellow.200"
                                    : "red.200"
                                }
                              >
                                優先度: {data.priority}
                              </Text>
                            </Flex>
                          </Stack>
                        );
                      }
                    })}
                    <Text transform="translateY(20vh)" textAlign="center">
                      {context.todoArr.length === 0
                        ? "表示するタスクはありません。"
                        : null}
                    </Text>
                  </Stack>
                </Stack>
              </Box>
            </Flex>
          </GridItem>
        </Grid>
        <TodoTaskModal isOpen={isOpen} onClose={onClose} />
      </>
    );
  }
});
