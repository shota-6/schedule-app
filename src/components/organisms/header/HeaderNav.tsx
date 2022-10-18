import { FC, useContext, useEffect, useState } from "react";
import { NavLink as RouterLink, NavLink, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Link,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  Center,
  MenuDivider,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Logo } from "../../atoms/Logo";
import { AppContext, AppContextType } from "../../../App";
import { InitialFocus } from "./ProfileModal";
import { useProfile } from "../../../hooks/useProfile";
import { db } from "../../../firebase";

import styles from "../../../theme/Theme.module.scss";
import { collection, onSnapshot, query, where } from "firebase/firestore";

type userHeaderData = {
  message: string;
  createdAt: string;
  cid: string;
  name: string;
  uid: string;
  AvatarImg: string;
};

export const WithSubNavigation: FC = () => {
  const { isOpen, onToggle } = useDisclosure();
  //   const [name, setName] = useState<string>("");
  const auth = getAuth();
  const user = auth.currentUser;

  const [userArr, setUserArr] = useState<userHeaderData[]>([]);

  const context: AppContextType = useContext(AppContext);

  //   if( user !== null) {
  //       console.log(user.displayName)
  //       updateProfile(user, {
  //           displayName: name
  //         })
  //     }
  //     console.log({name})
  const navigate = useNavigate();
  const handleLogout = () => {
    auth.signOut();
    navigate("/");
  };

  // const getAuthUserInfo = async () => {
  //     if( auth.currentUser !== null){
  //       const usersCollectionRef = query(collection(db, "users"), where("uid", "==", auth.currentUser?.uid ));
  //       getDocs(usersCollectionRef).then((querySnapshot) => {
  //         querySnapshot.docs.forEach((doc) => console.log(doc.data()));
  //         console.log(auth.currentUser?.displayName)
  //       });
  //     } else {
  //       console.log('f')
  //     }
  // };

  // useEffect(() => {
  // getAuthUserInfo();
  // }, []);

  //   get avatar
  //   const firestorage = storage;
  //   const gsReference = ref(
  //     firestorage,
  //     `gs://tasks-app-d464a.appspot.com/${context.avatarImg}`
  //   );

  //   getDownloadURL(gsReference)
  //     .then((url) => {
  //       context.setAvatarImg(url);
  //     })
  //     .catch((err) => console.log(err));
  //     console.log(context.avatarImg)

  const profileData = useProfile();
  const profile = profileData.profile;

  //   useEffect(() => {
  //     console.log(profile?.avatarImg)
  // }, [profile]);

  useEffect(() => {
    if (user) {
      const userUid = user.uid;
      const q = query(collection(db, "users"), where("uid", "==", userUid));

      // リアルタイムのデータ取得
      onSnapshot(q, (querySnapshot) => {
        const result: any[] = [];
        querySnapshot.forEach((doc) => {
          const userArr = {
            name: doc.data().name ?? "",
            email: doc.data().email ?? "",
            avatarImg: doc.data().avatarImg ?? "",
            uid: doc.id,
          };

          result.push(userArr);
        });
        setUserArr(result);
      });
    }
  }, []);

  return (
    <Box style={{ position: "fixed", width: "100%", zIndex: "100" }}>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
          >
            <NavLink to="/home">
              <Logo />
            </NavLink>
          </Text>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          {/* <Button
            as={RouterLink}
            to="/"
            p={2}
            fontSize={"sm"}
            fontWeight={400}
          >
            ログイン
          </Button>

          <Button
            as={RouterLink}
            to="/"
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"blue.500"}
            _hover={{
              bg: "blue.400",
            }}
          >
            ユーザー登録
          </Button> */}
          <Menu>
            <MenuButton
              as={Button}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
              minW={0}
            >
              <Avatar
                size={"sm"}
                src={
                  context.file
                    ? URL.createObjectURL(context.file)
                    : profile
                    ? profile?.avatarImg
                    : ""
                }
              />
            </MenuButton>
            <MenuList alignItems={"center"}>
              <br />
              <Center>
                <Avatar
                  size={"2xl"}
                  src={
                    context.file
                      ? URL.createObjectURL(context.file)
                      : profile
                      ? profile?.avatarImg
                      : ""
                  }
                />
              </Center>
              <br />
              <Center>
                {/* {user !== null ? <p>{user?.displayName}</p> : <p>no name</p>} */}
                {/* {context.nickName
                  ? context.nickName
                  : profile
                  ? profile.name
                  : ""} */}
                {userArr.map((data) => data.name)}
              </Center>
              <br />
              <MenuDivider />
              <InitialFocus />
              <Button
                width="100%"
                bg="white"
                borderRadius={0}
                fontWeight={500}
                onClick={handleLogout}
              >
                ログアウト
              </Button>
            </MenuList>
          </Menu>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <Stack spacing={4} bg="white" display={{ md: "none" }}>
          <Box>
            <Link
              fontWeight={600}
              color="gray.600"
              as={RouterLink}
              to="/home"
              display="block"
              py={3}
              px={5}
              fontSize="sm"
              _hover={{
                textDecoration: "none",
              }}
              borderBottom="1px"
              borderBottomColor="gray.200"
              className={styles.activeHeaderSpNav}
              onClick={onToggle}
            >
              プロジェクト一覧
            </Link>
            <Link
              fontWeight={600}
              color="gray.600"
              as={RouterLink}
              to="/howto"
              display="block"
              py={3}
              px={5}
              fontSize="sm"
              _hover={{
                textDecoration: "none",
              }}
              borderBottom="1px"
              borderBottomColor="gray.200"
              className={styles.activeHeaderSpNav}
              onClick={onToggle}
            >
              使い方
            </Link>
          </Box>
        </Stack>
      </Collapse>
    </Box>
  );
};

const DesktopNav = () => {
  return (
    <Stack direction={"row"} spacing={4}>
      <Box>
        <Link
          as={RouterLink}
          to="/home"
          color="gray.600"
          p={2}
          mr={5}
          fontSize={"sm"}
          fontWeight={500}
          _hover={{
            textDecoration: "none",
            color: "gray.800",
          }}
          className={styles.activeHeaderNav}
        >
          プロジェクト一覧
        </Link>
        <Link
          as={RouterLink}
          to="/howto"
          color="gray.600"
          p={2}
          fontSize={"sm"}
          fontWeight={500}
          _hover={{
            textDecoration: "none",
            color: "gray.800",
          }}
          className={styles.activeHeaderNav}
        >
          使い方
        </Link>
      </Box>
    </Stack>
  );
};
