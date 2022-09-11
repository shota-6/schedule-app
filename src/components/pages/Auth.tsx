import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { FC, memo, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
// import { NavLink as RouterLink } from "react-router-dom";

export const Auth: FC = memo(() => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isLogin, setIsLogin] = useState<boolean>(true);

  const navigate = useNavigate();

  const Register = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate("/home");
      })
      .catch((error) => {
        alert(error.message);
        console.error(error);
      });
  };

  const Login = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate("/home");
      })
      .catch((error) => {
        alert(error.message);
        console.error(error);
      });
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
  };
  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            {isLogin ? "新規登録" : "ログイン"}
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"} align={"center"}>
            {isLogin ? "ユーザー登録を行うと、プロジェクトの作成や共有の機能が使用できるようになります。" : "共有パスをお持ちの方はこちらからプロジェクトに参加してください。"}
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            {isLogin ? (
              <FormControl id="nickName" isRequired>
                <FormLabel>ニックネーム</FormLabel>
                <Input
                  name="name"
                  type="text"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    handleChangeName(event);
                  }}
                />
              </FormControl>
            ) : (
              ""
            )}

            <FormControl id="email" isRequired>
              <FormLabel>メールアドレス</FormLabel>
              <Input
                name="email"
                type="email"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  handleChangeEmail(event);
                }}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>パスワード</FormLabel>
              <InputGroup>
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    handleChangePassword(event);
                  }}
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
            <Stack spacing={10} pt={2}>
              <Button
                type="button"
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={isLogin ? Register : Login}
              >
                {isLogin ? "新規登録" : "ログイン"}
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                {/* 既に登録をした方は
                <Link as={RouterLink} to="/" color={"blue.400"}>
                  こちら
                </Link>
                からログインしてください */}
                <span onClick={() => setIsLogin(!isLogin)}>
                  　{isLogin ? "ログインしますか?" : "新規登録しますか？"}
                </span>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
});
