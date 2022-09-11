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
  
  export const LoginVisiter: FC = memo(() => {
    return (
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>プロジェクトに参加する</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              共有されたパスを入力してください。
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
              <FormControl id="password">
                <FormLabel>共有パス</FormLabel>
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
                    プロジェクトを作成する場合は、<Link as={RouterLink} to="/sign-up" color={"blue.400"}>ユーザー登録</Link>してください。
                  </Text>
                </Stack>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  参加する
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  });
  