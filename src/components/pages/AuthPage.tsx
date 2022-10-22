import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import {
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
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
  Link,
  useToast,
} from "@chakra-ui/react";
import { FC, memo, useState, useContext } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { NavLink as RouterLink } from "react-router-dom";
import { AppContext, AppContextType } from "../../App";

import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

export const AuthPage: FC = memo(() => {
  const context: AppContextType = useContext(AppContext);
  // console.log(context.nickName)

  const [showPassword, setShowPassword] = useState<boolean>(false);
  // const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isLogin, setIsLogin] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [checkName, setCheckName] = useState<boolean>(false);
  const [checkEmail, setCheckEmail] = useState<boolean>(false);
  const [checkPassword, setCheckPassword] = useState<boolean>(false);

  const navigate = useNavigate();
  const toast = useToast();

  const auth = getAuth();
  const user = auth.currentUser;
  const isAnonymous = user?.isAnonymous;

  const Register = async () => {
    setIsLoading(true);
    await setPersistence(auth, browserLocalPersistence);
    await createUserWithEmailAndPassword(auth, email, password)
      // updateProfile(user, {
      //   displayName: "Jane Q. User", photoURL: "https://example.com/jane-q-user/profile.jpg"
      // })
      .then((userCredential) => {
        console.log(userCredential);
        navigate("/home");
      })
      .then(() => {
        if (user !== null) {
          updateProfile(user, {
            displayName: context.nickName,
          });
        }
      })
      .catch((error) => {
        // alert(error.message);
        toast({
          title: `登録エラー`,
          status: "error",
          isClosable: true,
          position: "top",
        });
        console.error(error);
        setIsLoading(false);
      });

    try {
      if (auth.currentUser !== null) {
        const uid = auth.currentUser.uid;
        const email = auth.currentUser.email;

        const docRef = await addDoc(collection(db, "users"), {
          name: context.nickName,
          uid: uid,
          email: email,
          // avatarImg: context.avatarImg
          avatarImg: "",
        });
        console.log("Document written with ID: ", docRef.id);
        toast({
          title: `${context.nickName}さん、ご登録ありがとうございます！`,
          status: "success",
          isClosable: true,
          position: "top",
        });
      }
    } catch (e) {
      console.error("Error adding document: ", e);
      setIsLoading(false);
    }
  };
  // if( user !== null) {
  //     console.log(user.displayName)
  //     updateProfile(user, {
  //       displayName: "Jane Q. User"
  //     })
  // }

  const Login = async () => {
    setIsLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate("/home");
        toast({
          title: `ログイン完了`,
          status: "success",
          isClosable: true,
          position: "top",
        });
      })
      .catch((error) => {
        // alert(error.message);
        toast({
          title: `メールアドレスまたはパスワードが間違っています`,
          status: "error",
          isClosable: true,
          position: "top",
        });
        console.error(error);
        setIsLoading(false);
      });
  };

  // setPersistence(auth, inMemoryPersistence)
  // .then(() => {
  //   const provider = new GoogleAuthProvider();
  //   return signInWithRedirect(auth, provider);
  // })
  // .catch((error) => {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  // });

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    context.setNickName(event.currentTarget.value);
    if (event.currentTarget.value) {
      setCheckName(true);
    } else {
      setCheckName(false);
    }
  };
  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
    if (event.currentTarget.value) {
      setCheckEmail(true);
    } else {
      setCheckEmail(false);
    }
  };
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);

    if (event.currentTarget.value.length >= 6) {
      setCheckPassword(true);
    } else {
      setCheckPassword(false);
    }
  };

  const checkRegister = [checkName, checkEmail, checkPassword];
  const checkLogin = [checkEmail, checkPassword];

  // session
  // setPersistence(auth, browserSessionPersistence)
  //   .then(() => {
  //     return signInWithEmailAndPassword(auth, email, password);
  //   })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //   });

  // const onClickAdd = async () => {
  //   try {
  //     const docRef = await addDoc(collection(db, "users"), {
  //       name: context.nickName
  //     });
  //     console.log("Document written with ID: ", docRef.id);
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  // }

  if (user && !isAnonymous) {
    return <Navigate replace to="/home" />;
  } else {
    return (
      <Flex minH={"100vh"} align={"center"} justify={"center"} bg="gray.50">
        <Stack spacing={8} mx={"auto"} w={"xl"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"3xl"} textAlign={"center"}>
              {isLogin ? "ログイン" : "新規登録"}
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"} align={"center"}>
              {isLogin
                ? "既に登録済みの方はこちらからログインしてください。"
                : "ユーザー登録を行うと、プロジェクトの作成や共有の機能が使用できるようになります。"}
            </Text>
          </Stack>
          <Box rounded={"lg"} bg="white" boxShadow={"lg"} p={8}>
            <Stack spacing={4}>
              {isLogin ? (
                ""
              ) : (
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
                <FormLabel>
                  パスワード
                  <span
                    style={{ fontSize: "14px", verticalAlign: "text-bottom" }}
                  >
                    (6文字以上)
                  </span>
                </FormLabel>
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
                  loadingText={isLogin ? "ログイン中" : "登録中"}
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={isLogin ? Login : Register}
                  isLoading={isLoading}
                  disabled={
                    isLogin
                      ? checkLogin.some((ok) => !ok)
                      : checkRegister.some((ok) => !ok)
                  }
                >
                  {isLogin ? "ログイン" : "新規登録"}
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  <Link
                    onClick={() => setIsLogin(!isLogin)}
                    style={{ pointerEvents: "auto", cursor: "pointer" }}
                    color={"blue.400"}
                    _hover={{
                      textDecoration: "none",
                      opacity: 0.7,
                    }}
                  >
                    　{isLogin ? "新規登録しますか?" : "ログインしますか？"}
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
          <Text align={"center"}>
            共有パスをお持ちの方は
            <Link
              as={RouterLink}
              to="/visiter"
              color={"blue.400"}
              _hover={{
                textDecoration: "none",
                opacity: 0.7,
              }}
            >
              こちら
            </Link>
            からプロジェクトに参加してください
          </Text>
        </Stack>
      </Flex>
    );
  }
});