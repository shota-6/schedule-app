import { Button, useDisclosure } from "@chakra-ui/react";
import { memo, FC } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../../firebase";
import { NewsProjectModal } from "../organisms/home/NewProjectModal";

import { ProjectCards } from "../organisms/home/ProjectCards";

export const HomeUser: FC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  if (!auth.currentUser) {
    return <Navigate replace to="/" />;
  } else {
    return (
      <>
        <Button
          fontSize={{ base: "xs", md: "sm" }}
          rounded={"lg"}
          bg={"blue.500"}
          color={"white"}
          position={"absolute"}
          top={{ base: 20, md: 20, lg: 24 }}
          right={{ base: 4, md: 8, lg: 12 }}
          width={{ base: "44.76%", md: "29.34%", lg: "21.6%" }}
          boxShadow={
            "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
          }
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
        <ProjectCards />
        <NewsProjectModal isOpen={isOpen} onClose={onClose} />
      </>
    );
  }
});
