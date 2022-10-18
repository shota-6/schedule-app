import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useToast,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FC, memo, useContext, useEffect, useState } from "react";
import { NavLink as RouterLink, useNavigate } from "react-router-dom";
import { AppContext, AppContextType } from "../../App";
import { useRooms } from "../../hooks/useRooms";

import {
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../firebase";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

export const CheckVisiter: FC = memo(() => {
  const context: AppContextType = useContext(AppContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const roomsData = useRooms();
  const rooms = roomsData.rooms;

  const navigate = useNavigate();
  const toast = useToast();

  // console.log(context.roomArr);

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg="gray.50">
      <Stack spacing={8} mx={"auto"} w={"xl"} py={12} px={6}>
        <Box rounded={"lg"} bg="white" boxShadow={"lg"} p={8}>
          <Stack spacing={6}>
            <Heading fontSize={{ base: "md", md: "2xl" }} textAlign={"center"}>
              このプロジェクトに参加しますか？
            </Heading>
            <Text fontSize={"lg"} textAlign={"center"}>
              プロジェクト名 : test
            </Text>
            <Flex justifyContent="space-between">
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                isLoading={isLoading}
                loadingText="参加中"
                width="45%"
              >
                参加する
              </Button>
              <Button
                bg={"white"}
                border="2px"
                borderColor="blue.400"
                color={"blue.400"}
                _hover={{
                  bg: "blue.400",
                  color: "white",
                }}
                isLoading={isLoading}
                loadingText="参加中"
                width="45%"
                onClick={() => {
                  navigate("/visiter");
                }}
              >
                戻る
              </Button>
            </Flex>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
});
