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


import { db } from "../../firebase";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

export const LoginVisiter: FC = memo(() => {
  const context: AppContextType = useContext(AppContext);
  const [visiterPass, setVisiterPass] = useState<string>("");
  const [checkVisiterPass, setCheckVisiterPass] = useState<string>("");

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [checkName, setCheckName] = useState<boolean>(false);
  const [checkPass, setCheckPass] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const roomsData = useRooms();
  const rooms = roomsData.rooms;

  const navigate = useNavigate();
  const toast = useToast();

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

  useEffect(() => {
    // const q = collection(db, `rooms/${rooms?.id}/chat`);
    const q = query(
      collection(db, "rooms"),
      where("projectPass", "==", "test1")
    );

    // 通常のデータ取得
    getDocs(q)
      .then((querySnapshot) => {
        console.log(`${querySnapshot.docs.length} accounts`); // デバッグ用

        querySnapshot.forEach((doc) => {
          const projectPass = doc.data().projectPass ?? "";
          setCheckVisiterPass(projectPass);
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, [rooms]);

  console.log(checkVisiterPass);

  const visiterLogin = async () => {
    setIsLoading(true);

    try {
      if (visiterPass === checkVisiterPass) {
        const docRef = await addDoc(collection(db, "visiters"), {
          VisiterName: context.nickName,
          VisiterPass: visiterPass,
          VisiterId: createVisiterId(),
          avatarImg: "",
        });
        console.log("Document written with ID: ", docRef.id);
        toast({
          title: `${context.nickName}さん、こんにちは`,
          status: "success",
          isClosable: true,
          position: "top",
        });
        navigate("/confirm");
      } else {
        toast({
          title: `入力した共有パスは存在しません。`,
          status: "error",
          isClosable: true,
          position: "top",
        });
        setIsLoading(false);
      }
    } catch (e) {
      console.error("Error adding document: ", e);
      setIsLoading(false);
    }
  };

  // console.log(context.roomArr);

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    context.setNickName(event.currentTarget.value);

    if (event.currentTarget.value) {
      setCheckName(true);
    } else {
      setCheckName(false);
    }
  };
  const handlePass = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVisiterPass(event.target.value);

    if (event.currentTarget.value) {
      setCheckPass(true);
    } else {
      setCheckPass(false);
    }
  };

  const checkVisiter = [checkName, checkPass];

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg="gray.50">
      <Stack spacing={8} mx={"auto"} w={"xl"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"3xl"} textAlign={"center"}>
            プロジェクトに参加する
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            共有されたパスを入力してください。
          </Text>
        </Stack>
        <Box rounded={"lg"} bg="white" boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <FormControl id="nickname" isRequired>
              <FormLabel>ニックネーム</FormLabel>
              <Input type="text" onChange={handleName} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>共有パス</FormLabel>
              <InputGroup>
                <Input
                  onChange={handlePass}
                  type={showPassword ? "text" : "password"}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={6}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                {/* <Checkbox>Remember me</Checkbox>
                    <Link color={"blue.400"}>Forgot password?</Link> */}
                <Text fontSize={"md"} color={"gray.600"}>
                  プロジェクトを作成する場合は、
                  <Link as={RouterLink} to="/" color={"blue.400"}>
                    ユーザー登録
                  </Link>
                  してください。
                </Text>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                disabled={checkVisiter.some((ok) => !ok)}
                onClick={visiterLogin}
                isLoading={isLoading}
                loadingText="参加中"
              >
                参加する
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
});
