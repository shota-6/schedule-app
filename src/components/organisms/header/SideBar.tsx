import { FC, memo, useContext } from "react";
import {
  NavLink as RouterLink,
  NavLink,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  Flex,
  GridItem,
  Icon,
  Link,
  Stack,
  Text,
  Grid,
  Box,
} from "@chakra-ui/react";
import {
  IoChatbubbleEllipsesOutline,
  IoListOutline,
  IoCalendarOutline,
  IoHomeOutline,
} from "react-icons/io5";
import { RiTodoLine } from "react-icons/ri";
import { AppContext, AppContextType } from "../../../App";

import styles from "../../../theme/Theme.module.scss";
import { getAuth } from "firebase/auth";

export const SideBar: FC = memo(() => {
  const context: AppContextType = useContext(AppContext);
  const params = useParams();

  const auth = getAuth();
  const user = auth.currentUser;
  const isAnonymous = user?.isAnonymous;

  return (
    <Grid
      templateRows={{ base: "repeat(13, 1fr)", md: "repeat(14, 1fr)" }}
      templateColumns="repeat(1, 1fr)"
      height={{ base: "inherit", md: "calc( 100vh - 60px )" }}
      pos="fixed"
      bottom="0"
      width={{ base: "100vw", md: "14vw" }}
      zIndex="5"
    >
      <GridItem
        rowSpan={{ base: 1, md: 14 }}
        colSpan={{ base: 7, md: 1 }}
        bg="white"
        borderRight={{ base: "none", md: "1px" }}
        borderRightColor={{ base: "none", md: "gray.200" }}
        gridRowStart={{ base: "none", md: "inherit" }}
        height={{ base: "6.5vh", md: "initial" }}
      >
        <Stack
          spacing={0}
          flexDirection={{ base: "inherit", md: "column" }}
          justifyContent="center"
          borderTop={{ base: "1px", md: "none" }}
          borderTopColor={{ base: "gray.200", md: "none" }}
          height={{ base: "100%", md: "inherit" }}
        >
          {isAnonymous ? null : (
            <Link
              fontWeight={600}
              color="gray.600"
              as={RouterLink}
              to="/home"
              display={{ base: "flex", md: "block" }}
              alignItems={{ base: "center", md: "inherit" }}
              py={3}
              px={5}
              _hover={{
                textDecoration: "none",
                backgroundColor: "blue.500",
                color: "white",
              }}
            >
              <Flex alignItems="center">
                <Icon
                  as={IoHomeOutline}
                  mr={{ base: 0, md: 2 }}
                  w={{ base: 5, md: 4, lg: 5 }}
                  h={{ base: 5, md: 4, lg: 5 }}
                />
                <Text
                  display={{ base: "none", md: "inherit" }}
                  fontSize={{ base: "sm", md: "xs", lg: "md" }}
                  whiteSpace="nowrap"
                >
                  ホーム
                </Text>
              </Flex>
            </Link>
          )}

          <Link
            fontWeight={600}
            color="gray.600"
            as={RouterLink}
            to={`/${params.id}/chat`}
            display={{ base: "flex", md: "block" }}
            alignItems={{ base: "center", md: "inherit" }}
            py={3}
            px={5}
            _hover={{
              textDecoration: "none",
              backgroundColor: "blue.500",
              color: "white",
            }}
            className={styles.activeSidebarNav}
          >
            <Flex alignItems="center">
              <Icon
                as={IoChatbubbleEllipsesOutline}
                mr={{ base: 0, md: 2 }}
                w={{ base: 5, md: 4, lg: 5 }}
                h={{ base: 5, md: 4, lg: 5 }}
              />
              <Text
                display={{ base: "none", md: "inherit" }}
                fontSize={{ base: "sm", md: "xs", lg: "md" }}
                whiteSpace="nowrap"
              >
                チャット
              </Text>
            </Flex>
          </Link>

          <Link
            fontWeight={600}
            color="gray.600"
            as={RouterLink}
            to={`/${params.id}/todo`}
            display={{ base: "flex", md: "block" }}
            alignItems={{ base: "center", md: "inherit" }}
            py={3}
            px={5}
            _hover={{
              textDecoration: "none",
              backgroundColor: "blue.500",
              color: "white",
            }}
            className={styles.activeSidebarNav}
          >
            <Flex alignItems="center">
              <Icon
                as={IoListOutline}
                mr={{ base: 0, md: 2 }}
                w={{ base: 5, md: 4, lg: 5 }}
                h={{ base: 5, md: 4, lg: 5 }}
              />
              <Text
                display={{ base: "none", md: "inherit" }}
                fontSize={{ base: "sm", md: "xs", lg: "md" }}
                whiteSpace="nowrap"
              >
                TODO
              </Text>
            </Flex>
          </Link>

          <Link
            fontWeight={600}
            color="gray.600"
            as={RouterLink}
            to={`/${params.id}/calendar`}
            display={{ base: "flex", md: "block" }}
            alignItems={{ base: "center", md: "inherit" }}
            py={3}
            px={5}
            _hover={{
              textDecoration: "none",
              backgroundColor: "blue.500",
              color: "white",
            }}
            className={styles.activeSidebarNav}
          >
            <Flex alignItems="center">
              <Icon
                as={IoCalendarOutline}
                mr={{ base: 0, md: 2 }}
                w={{ base: 5, md: 4, lg: 5 }}
                h={{ base: 5, md: 4, lg: 5 }}
              />
              <Text
                display={{ base: "none", md: "inherit" }}
                fontSize={{ base: "sm", md: "xs", lg: "md" }}
                whiteSpace="nowrap"
              >
                カレンダー
              </Text>
            </Flex>
          </Link>

          <Link
            fontWeight={600}
            color="gray.600"
            as={RouterLink}
            to={`/${params.id}/list`}
            display={{ base: "flex", md: "block" }}
            alignItems={{ base: "center", md: "inherit" }}
            py={3}
            px={5}
            _hover={{
              textDecoration: "none",
              backgroundColor: "blue.500",
              color: "white",
            }}
            className={styles.activeSidebarNav}
          >
            <Flex alignItems="center">
              <Icon
                as={RiTodoLine}
                mr={{ base: 0, md: 2 }}
                w={{ base: 5, md: 4, lg: 5 }}
                h={{ base: 5, md: 4, lg: 5 }}
              />
              <Text
                display={{ base: "none", md: "inherit" }}
                fontSize={{ base: "sm", md: "xs", lg: "md" }}
                whiteSpace="nowrap"
              >
                予定リスト
              </Text>
            </Flex>
          </Link>
        </Stack>
      </GridItem>
    </Grid>
  );
});
