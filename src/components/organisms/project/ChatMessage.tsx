import {
  Avatar,
  Flex,
  Stack,
  Text,
  Skeleton,
  SkeletonCircle,
} from "@chakra-ui/react";
import { getAuth } from "firebase/auth";
import { FC, memo, useEffect, useRef } from "react";

interface chatMessageProps {
  message: string;
  createdAt: string;
  name: string;
  AvatarImg: string;
  uid: string;
  cid: string;
  key: string;
  isLastItem: boolean;
  loadSkeleton: boolean;
}

export const ChatMessage: FC<chatMessageProps> = memo(
  ({ loadSkeleton, isLastItem, ...data }) => {
    const ref = useRef<HTMLDivElement>(null);

    const auth = getAuth();
    const user = auth.currentUser;

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
        {loadSkeleton ? (
          <SkeletonCircle size="8" mr={5} />
        ) : (
          <Avatar size={"sm"} mr={5} src={data.AvatarImg} />
        )}

        <Stack spacing={3} mt={1}>
          {loadSkeleton ? (
            <Skeleton fadeDuration={1}>
              <Text fontSize={{ base: "sm", md: "md" }} width="15vw">
                Skeleton
              </Text>
            </Skeleton>
          ) : (
            <Text fontSize={{ base: "sm", md: "md" }} fontWeight={600}>
              {data.name}
            </Text>
          )}

          {loadSkeleton ? (
            <Skeleton fadeDuration={1}>
              <Text fontSize={{ base: "sm", md: "md" }}>Skeleton</Text>
            </Skeleton>
          ) : (
            <Text fontSize={{ base: "sm", md: "md" }}>{data.message}</Text>
          )}
        </Stack>

        {loadSkeleton ? (
          <Skeleton pos={"absolute"} right={5} top={7} fadeDuration={1}>
            <Text fontSize={{ base: "10px", md: "12px" }}>
              2000年00月00日 00:00
            </Text>
          </Skeleton>
        ) : (
          <Text
            fontSize={{ base: "10px", md: "12px" }}
            pos={"absolute"}
            right={5}
            top={7}
          >
            {data.createdAt}
          </Text>
        )}
      </Flex>
    );
  }
);
