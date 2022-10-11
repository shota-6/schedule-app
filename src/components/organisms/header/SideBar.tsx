import { FC, memo } from "react";
import { NavLink as RouterLink, NavLink, useNavigate } from "react-router-dom";
import { Flex, GridItem, Icon, Link, Stack, Text } from "@chakra-ui/react";
import {
  IoChatbubbleEllipsesOutline,
  IoListOutline,
  IoCalendarOutline,
  IoHomeOutline,
} from "react-icons/io5";

export const SideBar: FC = memo(() => {
  return (
    <GridItem
      rowSpan={{ base: 1, md: 13 }}
      colSpan={{ base: 7, md: 1 }}
      bg="white"
      borderRight={{ base: "none", md: "1px" }}
      borderRightColor={{ base: "none", md: "gray.200" }}
      gridRowStart={{ base: "none", md: "inherit" }}
    >
      <Stack
        spacing={{ base: 0, md: 2 }}
        px={5}
        py={2}
        flexDirection={{ base: "inherit", md: "column" }}
        justifyContent="space-between"
        borderTop={{ base: "1px", md: "none" }}
        borderTopColor={{ base: "gray.200", md: "none" }}
      >
        <Link
          fontWeight={600}
          color="gray.600"
          as={RouterLink}
          to="/home"
          display="block"
          py={2}
          _hover={{
            textDecoration: "none",
          }}
        >
          <Flex alignItems="center">
            <Icon as={IoHomeOutline} mr={2} w={5} h={5} />
            <Text display={{ base: "none", md: "inherit" }}>ホーム</Text>
          </Flex>
        </Link>

        <Link
          fontWeight={600}
          color="gray.600"
          as={RouterLink}
          to="/home"
          display="block"
          py={2}
          _hover={{
            textDecoration: "none",
          }}
        >
          <Flex alignItems="center">
            <Icon as={IoChatbubbleEllipsesOutline} mr={2} w={5} h={5} />
            <Text display={{ base: "none", md: "inherit" }}>チャット</Text>
          </Flex>
        </Link>

        <Link
          fontWeight={600}
          color="gray.600"
          as={RouterLink}
          to="/home"
          display="block"
          py={2}
          _hover={{
            textDecoration: "none",
          }}
        >
          <Flex alignItems="center">
            <Icon as={IoListOutline} mr={2} w={5} h={5} />
            <Text display={{ base: "none", md: "inherit" }}>TODO</Text>
          </Flex>
        </Link>

        <Link
          fontWeight={600}
          color="gray.600"
          as={RouterLink}
          to="/home"
          display="block"
          py={2}
          _hover={{
            textDecoration: "none",
          }}
        >
          <Flex alignItems="center">
            <Icon as={IoCalendarOutline} mr={2} w={5} h={5} />
            <Text display={{ base: "none", md: "inherit" }}>カレンダー</Text>
          </Flex>
        </Link>
      </Stack>
    </GridItem>
  );
});
