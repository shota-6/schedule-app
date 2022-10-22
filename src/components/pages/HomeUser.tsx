import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { memo, FC, useState } from "react";
import { Navigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

import { NewsProjectModal } from "../organisms/home/NewProjectModal";

import { ProjectCards } from "../organisms/home/ProjectCards";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export const HomeUser: FC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showPass, setShowPass] = useState<boolean>(false);
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    return <Navigate replace to="/" />;
  } else {
    return (
      <>
        <Flex>
          <Button
            variant={"ghost"}
            onClick={() => setShowPass((showPass) => !showPass)}
            fontSize={{ base: "sm", md: "sm" }}
            position={"absolute"}
            top={{ base: 20, md: 20, lg: 24 }}
            left={{ base: 4, md: 8, lg: 12 }}
          >
            <Text mr={2}>{showPass ? "パスを非表示" : "パスを表示"}</Text>
            {showPass ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
          <Button
            fontSize={{ base: "xs", md: "sm" }}
            rounded={"lg"}
            bg={"blue.500"}
            color={"white"}
            position={"absolute"}
            top={{ base: 20, md: 20, lg: 24 }}
            right={{ base: 4, md: 8, lg: 12 }}
            width={{ base: "44.76%", md: "29.34%", lg: "21.6%" }}
            // boxShadow={
            //   "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
            // }
            _hover={{
              bg: "blue.400",
            }}
            _focus={{
              bg: "blue.400",
            }}
            onClick={onOpen}
          >
            プロジェクトを新規作成
          </Button>
        </Flex>
        <ProjectCards showPass={showPass} />
        <NewsProjectModal isOpen={isOpen} onClose={onClose} />
      </>
    );
  }
});
