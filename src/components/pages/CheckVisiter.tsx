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
import {
  NavLink as RouterLink,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { AppContext, AppContextType } from "../../App";

import { getAuth, signInAnonymously } from "firebase/auth";
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

  const navigate = useNavigate();
  const location = useLocation();
  const [visiterPass, setVisiterPass] = useState<{ Pass: string }>(
    location.state as { Pass: string }
  );
  console.log(visiterPass);

  const toast = useToast();
  const auth = getAuth();

  useEffect(() => {
    const q = query(
      collection(db, "rooms"),
      where("projectPass", "==", visiterPass.Pass)
    );

    getDocs(q)
      .then((querySnapshot) => {
        console.log(`${querySnapshot.docs.length} accounts`); // デバッグ用

        const result: any[] = [];
        querySnapshot.forEach((doc) => {
          const setVisiterArr = {
            projectId: doc.data().projectId ?? "",
            projectName: doc.data().projectName ?? "",
            projectPass: doc.data().projectPass ?? "",
            roomDoc: doc.id ?? "",
          };
          const visiterDocRef = doc.id ?? "";
          result.push(setVisiterArr);
          context.setVisiterDocRef(visiterDocRef);
        });
        context.setVisiterArr(result);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const createVisiterId = () => {
    const len = 28;
    const str = "abcdefghijklmnopqrstuvwxyz0123456789";
    const strLen = str.length;
    let resultChatId = "";

    for (let i = 0; i < len; i++) {
      resultChatId += str[Math.floor(Math.random() * strLen)];
    }

    return resultChatId;
  };

  const saveVisiter = async () => {
    setIsLoading(true);
    signInAnonymously(auth)
      .then(() => {
        context.visiterArr.map((data) => navigate(`/${data.projectId}/chat`));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });

    try {
      const docRef = await addDoc(
        collection(
          db,
          `rooms/${context.visiterArr.map((data) => data.roomDoc)}/visiter`
        ),
        {
          VisiterName: context.nickName,
          VisiterPass: visiterPass.Pass,
          VisiterId: createVisiterId(),
          avatarImg: "",
        }
      );
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
      setIsLoading(false);
    }
  };

  //   console.log(context.visiterArr);

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg="gray.50">
      <Stack spacing={8} mx={"auto"} w={"xl"} py={12} px={6}>
        <Box rounded={"lg"} bg="white" boxShadow={"lg"} p={8}>
          <Stack spacing={6}>
            {context.visiterArr.map((data) => {
              return (
                <Box key={data.projectId}>
                  <Heading
                    fontSize={{ base: "md", md: "2xl" }}
                    textAlign={"center"}
                  >
                    このプロジェクトに参加しますか？
                  </Heading>
                  <Text fontSize={"lg"} textAlign={"center"} my={5}>
                    プロジェクト名:　{data.projectName}
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
                      onClick={() => {
                        saveVisiter();
                        // navigate(`/${data.projectId}/chat`, {
                        //   state: { visiter: true, Pass: visiterPass },
                        // });
                        toast({
                          title: `${data.projectName}に参加しました。`,
                          status: "success",
                          isClosable: true,
                          position: "top",
                        });
                      }}
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
                      width="45%"
                      onClick={() => {
                        navigate("/visiter");
                      }}
                    >
                      戻る
                    </Button>
                  </Flex>
                </Box>
              );
            })}

            {context.visiterArr.length === 0 ? (
              <Box>
                <Heading
                  fontSize={{ base: "md", md: "2xl" }}
                  textAlign={"center"}
                >
                  プロジェクトが見つかりませんでした。
                </Heading>
                <Text fontSize={"lg"} textAlign={"center"} my={5}>
                  共有パスを確認して再入力してください。
                </Text>
                <Button
                  bg={"white"}
                  border="2px"
                  borderColor="blue.400"
                  color={"blue.400"}
                  _hover={{
                    bg: "blue.400",
                    color: "white",
                  }}
                  width="100%"
                  onClick={() => {
                    navigate("/visiter");
                  }}
                >
                  戻る
                </Button>
              </Box>
            ) : null}
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
});
