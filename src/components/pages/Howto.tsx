import {
  Container,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  Icon,
  Box,
} from "@chakra-ui/react";
import {
  IoChatbubbleEllipsesOutline,
  IoListOutline,
  IoCalendarOutline,
} from "react-icons/io5";
import { FC, memo, ReactElement } from "react";

interface FeatureProps {
  text: string;
  iconBg: string;
  icon?: ReactElement;
}

export const Howto: FC = memo(() => {
  const Feature = ({ text, icon, iconBg }: FeatureProps) => {
    return (
      <Stack direction={"row"} align={"center"}>
        <Flex
          w={8}
          h={8}
          align={"center"}
          justify={"center"}
          rounded={"full"}
          bg={iconBg}
        >
          {icon}
        </Flex>
        <Text fontWeight={600}>{text}</Text>
      </Stack>
    );
  };

  return (
    <>
      <Container pb={{ base: 12, md: 20 }} pt={32} maxW={"inherit"}>
        <Flex
          maxW={"6xl"}
          margin="0 auto"
          justifyContent="space-between"
          alignItems="center"
          flexDirection={{ base: "column-reverse", md: "inherit" }}
        >
          <Stack spacing={4} width={{ base: "100%", md: "48%" }}>
            <Heading mt={8} fontSize={{ base: "2xl", md: "3xl" }}>
              プロジェクト一括管理アプリ
            </Heading>
            <Text fontSize={"lg"}>
              プロジェクトの進捗状況を複数の機能で管理できます。
              <br />
              共有パスをプロジェクト相手に共有することで、プロジェクト相手はログイン無しで手軽にプロジェクトに参加することができます。
            </Text>
            <Stack spacing={6}>
              <Feature
                icon={
                  <Icon
                    as={IoChatbubbleEllipsesOutline}
                    color={"yellow.500"}
                    w={5}
                    h={5}
                  />
                }
                iconBg="yellow.100"
                text={"チャット機能"}
              />
              <Feature
                icon={
                  <Icon as={IoListOutline} color={"green.500"} w={5} h={5} />
                }
                iconBg="green.100"
                text={"TODOリスト"}
              />
              <Feature
                icon={
                  <Icon as={IoCalendarOutline} color={"pink.500"} w={5} h={5} />
                }
                iconBg="pink.100"
                text={"カレンダー機能"}
              />
            </Stack>
          </Stack>
          <Box width={{ base: "100%", md: "48%" }}>
            <Image
              rounded={"md"}
              alt={"メインイメージ"}
              src={`${process.env.PUBLIC_URL}/main-demo.png`}
              objectFit={"cover"}
              boxShadow={"xl"}
            />
          </Box>
        </Flex>
      </Container>
      <Container
        py={{ base: 12, md: 20 }}
        bg="blue.400"
        color="white"
        maxW={"inherit"}
      >
        <Flex
          maxW={"6xl"}
          margin="0 auto"
          justifyContent="space-between"
          flexDirection={{ base: "column-reverse", md: "row-reverse" }}
        >
          <Stack spacing={4} width={{ base: "100%", md: "48%" }}>
            <Heading mt={8} fontSize={{ base: "2xl", md: "3xl" }}>
              ホーム画面
            </Heading>
            <Text fontSize={"lg"}>
              「プロジェクトを新規作成」から新しいプロジェクトを作成できます。プロジェクトを作成後、「参加」からプロジェクトルームに参加できます。
              <br />
              ここで設定したプロジェクトパスをプロジェクト相手に共有することで、複数人でのスケジュール管理が可能です。
            </Text>
          </Stack>
          <Box width={{ base: "100%", md: "48%" }}>
            <Image
              rounded={"md"}
              alt={"ホーム画面"}
              src={`${process.env.PUBLIC_URL}/home-demo.png`}
              objectFit={"cover"}
              boxShadow={"xl"}
            />
          </Box>
        </Flex>
      </Container>
      <Container py={{ base: 12, md: 20 }} maxW={"inherit"}>
        <Flex
          maxW={"6xl"}
          margin="0 auto"
          justifyContent="space-between"
          flexDirection={{ base: "column-reverse", md: "inherit" }}
        >
          <Stack spacing={4} width={{ base: "100%", md: "48%" }}>
            <Heading mt={8} fontSize={{ base: "2xl", md: "3xl" }}>
              チャット機能
            </Heading>
            <Text fontSize={"lg"}>
              プロジェクトルーム内の「チャット」タブからチャットが開始できます。チャット内ではプロジェクトに参加している全てのユーザーで会話することができます。
              <br />
            </Text>
          </Stack>
          <Box width={{ base: "100%", md: "48%" }}>
            <Image
              rounded={"md"}
              alt={"チャット機能"}
              src={`${process.env.PUBLIC_URL}/chat-demo.png`}
              objectFit={"cover"}
              boxShadow={"xl"}
            />
          </Box>
        </Flex>
      </Container>
      <Container
        py={{ base: 12, md: 20 }}
        bg="blue.400"
        color="white"
        maxW={"inherit"}
      >
        <Flex
          maxW={"6xl"}
          margin="0 auto"
          justifyContent="space-between"
          flexDirection={{ base: "column-reverse", md: "row-reverse" }}
        >
          <Stack spacing={4} width={{ base: "100%", md: "48%" }}>
            <Heading mt={8} fontSize={{ base: "2xl", md: "3xl" }}>
              TODOリスト
            </Heading>
            <Text fontSize={"lg"}>
              プロジェクトルーム内の「TODO」タブからTODOリストを利用できます。「タスクを追加」からタスク名、期間、優先度を入力してタスクを追加します。
              <br />
              TODOリストでは「現在のタスク」「進行中のタスク」「完了したタスク」の3つの進捗状況に分けて、各タスクの管理ができます。
              各タスクのメニューから各進捗状況へ移動または削除ができます。
            </Text>
          </Stack>
          <Box width={{ base: "100%", md: "48%" }}>
            <Image
              rounded={"md"}
              alt={"TODOリスト"}
              src={`${process.env.PUBLIC_URL}/todo-demo.png`}
              objectFit={"cover"}
              boxShadow={"xl"}
            />
          </Box>
        </Flex>
      </Container>
      <Container py={{ base: 12, md: 20 }} maxW={"inherit"}>
        <Flex
          maxW={"6xl"}
          margin="0 auto"
          justifyContent="space-between"
          flexDirection={{ base: "column-reverse", md: "inherit" }}
        >
          <Stack spacing={4} width={{ base: "100%", md: "48%" }}>
            <Heading mt={8} fontSize={{ base: "2xl", md: "3xl" }}>
              カレンダー機能
            </Heading>
            <Text fontSize={"lg"}>
              プロジェクトルーム内の「カレンダー」タブからカレンダーを確認できます。カレンダー内ではTODOリストで作成したタスクを月単位のカレンダーで確認することができます。
              <br />
              また、プロジェクトルーム内の「予定リスト」タブからは、TODOリストで作成したタスクをリスト形式で確認することができます。
            </Text>
          </Stack>
          <Box width={{ base: "100%", md: "48%" }}>
            <Image
              rounded={"md"}
              alt={"カレンダー機能"}
              src={`${process.env.PUBLIC_URL}/calendar-demo.png`}
              objectFit={"cover"}
              boxShadow={"xl"}
            />
          </Box>
        </Flex>
      </Container>
    </>
  );
});
