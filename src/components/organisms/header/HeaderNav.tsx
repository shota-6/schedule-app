import { FC, useContext, useState, useEffect } from "react";
import { NavLink as RouterLink, NavLink, useNavigate } from "react-router-dom";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { getAuth, updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../../../firebase";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  Center,
  MenuDivider,
  MenuItem,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { Logo } from "../../atoms/Logo";
import { AppContext, AppContextType } from "../../../App";
import { InitialFocus } from "./ProfileModal";
import { useProfile } from "../../../hooks/useProfile";

export const WithSubNavigation: FC = () => {
  const { isOpen, onToggle } = useDisclosure();
  //   const [name, setName] = useState<string>("");
  const auth = getAuth();
  const user = auth.currentUser;

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

  // console.log(profile?.image)

  return (
    <Box>
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
                {context.nickName
                  ? context.nickName
                  : profile
                  ? profile.name
                  : ""}
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
        <MobileNav />
      </Collapse>
    </Box>
  );
};

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("blue.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "blue.500" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"blue.500"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "プロジェクト一覧",
    children: [
      {
        label: "プロジェクトの作成",
        subLabel: "新規のプロジェクト開始する",
        href: "#",
      },
      //   {
      //     label: "New & Noteworthy",
      //     subLabel: "Up-and-coming Designers",
      //     href: "#",
      //   },
    ],
  },
  //   {
  //     label: "Find Work",
  //     children: [
  //       {
  //         label: "Job Board",
  //         subLabel: "Find your dream design job",
  //         href: "#",
  //       },
  //       {
  //         label: "Freelance Projects",
  //         subLabel: "An exclusive list for contract work",
  //         href: "#",
  //       },
  //     ],
  //   },
  {
    label: "使い方",
    href: "#",
  },
  {
    label: "設定",
    href: "#",
  },
];
