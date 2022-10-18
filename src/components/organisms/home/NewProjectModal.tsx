import { memo, FC, useState, useContext } from "react";
import { auth, db } from "../../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";

import { AppContext, AppContextType } from "../../../App";
import { createProjects } from "../../organisms/home/ProjectCards";

type projectModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const NewsProjectModal: FC<projectModalProps> = memo((props) => {
  const context: AppContextType = useContext(AppContext);
  const { isOpen, onClose } = props;
  const [checkProjectName, setCheckProjectName] = useState<boolean>(false);
  const [checkProjectPass, setCheckProjectPass] = useState<boolean>(false);

  const toast = useToast();

  // プロジェクトID乱数
  const createProjectId = () => {
    const len = 15;
    const str = "abcdefghijklmnopqrstuvwxyz0123456789";
    const strLen = str.length;
    let result = "";

    for (let i = 0; i < len; i++) {
      result += str[Math.floor(Math.random() * strLen)];
    }

    return result;
  };

  const createNewProject = async () => {
    try {
      if (auth.currentUser !== null) {
        const uid = auth.currentUser.uid;

        const newNum = createProjectId();
        // context.setProjectId(newNum);

        await addDoc(collection(db, "rooms"), {
          projectName: context.projectName,
          projectPass: context.projectPass,
          projectId: newNum,
          uid: uid,
          timestamp: serverTimestamp(),
        });

        console.log("create new project");
        // console.log(context.projectId);
        console.log(newNum);
        toast({
          title: `「${context.projectName}」作成完了`,
          status: "success",
          isClosable: true,
          position: "top",
        });
        setCheckProjectName(false);
        setCheckProjectPass(false);

        const newProjectArr = [...context.projectNameArr, context.projectName];
        context.setProjectNameArr(newProjectArr);

        createProjects();
      }
    } catch (e) {
      console.error("Error adding document: ", e);
      toast({
        title: `プロジェクトの作成に失敗しました`,
        status: "error",
        isClosable: true,
        position: "top",
      });
      setCheckProjectName(false);
      setCheckProjectPass(false);
    }
  };

  const handleProjectName = (event: React.ChangeEvent<HTMLInputElement>) => {
    context.setProjectName(event.currentTarget.value);
    if (event.currentTarget.value) {
      setCheckProjectName(true);
    } else {
      setCheckProjectName(false);
    }
  };
  const handleProjectPass = (event: React.ChangeEvent<HTMLInputElement>) => {
    context.setProjectPass(event.currentTarget.value);
    if (event.currentTarget.value.length >= 6) {
      setCheckProjectPass(true);
    } else {
      setCheckProjectPass(false);
    }
  };

  const checkCreateProject = [checkProjectName, checkProjectPass];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={"xl"}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>プロジェクトの新規作成</ModalHeader>
        <ModalCloseButton
          onClick={() => {
            setCheckProjectName(false);
            setCheckProjectPass(false);
          }}
        />
        <ModalBody>
          <Stack spacing={6}>
            <FormControl id="projectName" isRequired>
              <FormLabel>プロジェクト名</FormLabel>
              <Text fontSize={"xs"} mt={4} mb={2}>
                プロジェクトの名称を設定してください。
              </Text>
              <Input
                name="projectName"
                placeholder={"プロジェクト名"}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  handleProjectName(event);
                }}
              />
            </FormControl>
            <FormControl id="projectPass" isRequired>
              <FormLabel>
                プロジェクトパス{" "}
                <span
                  style={{ fontSize: "14px", verticalAlign: "text-bottom" }}
                >
                  (6文字以上)
                </span>
              </FormLabel>
              <Text fontSize={"xs"} mt={4} mb={2}>
                プロジェクトを共有する合言葉を設定してください。
                <br />
                プロジェクトを共有する相手は、このパスを入力することでプロジェクトに参加できます。
              </Text>
              <Input
                name="projectPass"
                placeholder={"プロジェクトパス"}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  handleProjectPass(event);
                }}
              />
            </FormControl>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => {
              createNewProject();
              onClose();
            }}
            disabled={checkCreateProject.some((ok) => !ok)}
          >
            作成
          </Button>
          <Button
            fontWeight={500}
            mr={3}
            onClick={() => {
              onClose();
              setCheckProjectName(false);
              setCheckProjectPass(false);
            }}
          >
            閉じる
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
