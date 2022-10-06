import {
  Avatar,
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  Heading,
  Text,
  InputGroup,
  Input,
  InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { memo, FC, useState, useContext, useEffect } from "react";
import { AppContext, AppContextType } from "../../../App";

import {
  query,
  collection,
  where,
  getDocs,
  onSnapshot,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { getAuth } from "firebase/auth";
import * as CSS from "csstype";

export const createProjects = () => {
  console.log("test");
};

type roomsProjectData = {
  projectId: string;
  projectName: string;
  projectPass: string;
  uid: string;
  timestamp: string;
};

console.log();
// const roomMap = new Map<string, roomsProjectData>();

export const ProjectCards: FC = memo(() => {
  const context: AppContextType = useContext(AppContext);
  const [showPass, setShowPass] = useState<boolean>(false);

  const [roomArr, setRoomArr] = useState<roomsProjectData[]>([]);

  // const roomsData = useRooms();
  // const rooms = roomsData.roomsInfo;

  const auth = getAuth();
  const user = auth.currentUser;

  // console.log(context.projectNameArr);
  useEffect(() => {
    if (user) {
      const userUid = user.uid;
      const q = query(
        collection(db, "rooms"),
        where("uid", "==", userUid),
        orderBy("timestamp", "desc")
      );

      // 通常のデータ取得
      // getDocs(q)
      //   .then((querySnapshot) => {
      //     console.log(`${querySnapshot.docs.length} accounts`); // デバッグ用

      //     const result: any[] = [];
      //     querySnapshot.forEach((doc) => {
      //       const roomArr = {
      //         uid: doc.id,
      //         projectId: doc.data().projectId ?? "",
      //         projectName: doc.data().projectName ?? "",
      //         projectPass: doc.data().projectPass ?? "",
      //       };
      //       // console.log(roomArr); // デバッグ用
      //       result.push(roomArr);
      //     });
      //     setRoomArr(result);
      //   })
      //   .catch((e) => {
      //     console.log(e);
      //   });

      // リアルタイムのデータ取得
      const addProject = onSnapshot(q, (querySnapshot) => {
        const result: any[] = [];
        querySnapshot.forEach((doc) => {
          const roomArr = {
            uid: doc.id,
            projectId: doc.data().projectId ?? "",
            projectName: doc.data().projectName ?? "",
            projectPass: doc.data().projectPass ?? "",
            timestamp: doc.data().timestamp ?? "",
          };

          result.push(roomArr);
        });
        setRoomArr(result);
      });
    }
  }, []);

  const noData: CSS.Properties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    textAlign: "center",
    fontWeight: "600",
  };

  if (roomArr.length) {
    return (
      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={{ base: 4, md: 6 }}
        px={{ base: 4, md: 8, lg: 12 }}
        py={{ base: 36, md: 36, lg: 44 }}
      >
        {/* {each.projectId} {each.projectName} {each.projectPass} {each.uid} */}
        {roomArr.map((each) => (
          <GridItem w="100%" key={each.uid}>
            <Center>
              <Box
                // maxW={"320px"}
                w={"full"}
                backgroundColor={"white"}
                boxShadow={"2xl"}
                rounded={"lg"}
                p={6}
                textAlign={"center"}
              >
                {/* <Avatar
                  size={"xl"}
                  src={
                    "https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                  }
                  mb={8}
                /> */}
                <Heading
                  fontSize={{ base: "md", md: "lg", lg: "xl" }}
                  fontFamily={"body"}
                  mb={4}
                >
                  {each.projectName}
                </Heading>
                <Text mb={2} fontSize={"sm"}>
                  プロジェクトパス
                </Text>
                <InputGroup>
                  <Input
                    name="password"
                    type={showPass ? "text" : "password"}
                    // value={context.projectPass}
                    value={each.projectPass}
                    readOnly
                    height={8}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() => setShowPass((showPass) => !showPass)}
                    >
                      {showPass ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>

                <Button
                  flex={1}
                  fontSize={{ base: "sm", md: "md" }}
                  rounded={"lg"}
                  bg={"blue.500"}
                  color={"white"}
                  mt={6}
                  boxShadow={
                    "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                  }
                  _hover={{
                    bg: "blue.400",
                  }}
                  _focus={{
                    bg: "blue.400",
                  }}
                >
                  参加
                </Button>
              </Box>
            </Center>
          </GridItem>
        ))}
      </Grid>
    );
  } else {
    return (
      <>
        <p style={noData}>
          進行中のプロジェクトがありません。
          <br />
          「プロジェクトを新規作成」からプロジェクトを追加できます。
        </p>
      </>
    );
  }
});
