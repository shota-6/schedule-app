import {
  Avatar,
  Flex,
  Stack,
  Text,
} from "@chakra-ui/react";
import { getAuth } from "firebase/auth";
import { FC, memo, useContext, useEffect, useRef } from "react";
import { AppContext, AppContextType } from "../../../App";
import { useProfile } from "../../../hooks/useProfile";

interface chatMessageProps {
  message: string;
  createdAt: string;
  name: string;
  AvatarImg: string;
  uid: string;
  cid: string;
  key: string;
  isLastItem: boolean;
}

export const ChatMessage: FC<chatMessageProps> = memo(
  ({ isLastItem, ...data }) => {
    const context: AppContextType = useContext(AppContext);

    const profileData = useProfile();
    const profile = profileData.profile;
    const ref = useRef<HTMLDivElement>(null);

    const auth = getAuth();
    const user = auth.currentUser;
    const isAnonymous = user?.isAnonymous;

    useEffect(() => {
      if (isLastItem && ref.current) {
        ref.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [isLastItem]);

    return (
      <Flex
        // key={data.cid}
        p={5}
        borderBottom="1px"
        borderBottomColor="gray.200"
        pos={"relative"}
        ref={ref}
        backgroundColor={
          // profile && profile.uid === data.uid ? "gray.50" : "blue.100"
          user?.uid === data.uid ? "gray.50" : "blue.100"
        }
      >
        <Avatar size={"sm"} mr={5} src={data.AvatarImg} />
        <Stack spacing={3} mt={1}>
          <Text fontSize={{ base: "sm", md: "md" }} fontWeight={600}>
            {data.name}
          </Text>
          <Text fontSize={{ base: "sm", md: "md" }}>{data.message}</Text>
        </Stack>
        <Text
          fontSize={{ base: "10px", md: "12px" }}
          pos={"absolute"}
          right={5}
          top={7}
        >
          {data.createdAt}
        </Text>
      </Flex>
    );
  }
);
