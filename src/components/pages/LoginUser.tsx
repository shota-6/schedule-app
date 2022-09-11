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
  useColorModeValue,
} from "@chakra-ui/react";
import { FC, memo } from "react";
import { NavLink as RouterLink } from "react-router-dom";

export const LoginUser: FC = memo(() => {
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>ログイン</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            共有パスをお持ちの方は <Link as={RouterLink} to="/visiter" color={"blue.400"}>こちら</Link>
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          w={{ base: "auto", md: "md" }}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>メールアドレス</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>パスワード</FormLabel>
              <Input type="password" />
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
                  新規登録の方は<Link as={RouterLink} to="/sign-up" color={"blue.400"}>こちら</Link>から
                </Text>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                ログイン
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
});
