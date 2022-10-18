import { FC, memo, useContext, useState } from "react";

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
  Select,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { getAuth } from "firebase/auth";
import { collection, setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase";
import { AppContext, AppContextType } from "../../../App";
import { useProfile } from "../../../hooks/useProfile";
import { useRooms } from "../../../hooks/useRooms";

import DatePicker, { registerLocale } from "react-datepicker";
import "../../../theme/date-picker.css";
import "react-datepicker/dist/react-datepicker.css";
import ja from "date-fns/locale/ja";

type todoModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const TodoTaskModal: FC<todoModalProps> = memo((props) => {
  const context: AppContextType = useContext(AppContext);
  const { isOpen, onClose } = props;
  const toast = useToast();

  const roomsData = useRooms();
  const rooms = roomsData.rooms;

  const profileData = useProfile();
  const profile = profileData.profile;

  const auth = getAuth();
  const user = auth.currentUser;

  const Today = new Date();
  const [startDate, setStartDate] = useState(Today);
  const [endDate, setEndDate] = useState(Today);
  registerLocale("ja", ja);

  const [checkTaskName, setCheckTaskName] = useState<boolean>(false);
  const [checkTaskSelect, setCheckTaskSelect] = useState<boolean>(false);
  const [selectValue, setSelectValue] = useState<string>("");


    // TODO ID乱数
    const createTodoId = () => {
        const len = 15;
        const str = "abcdefghijklmnopqrstuvwxyz0123456789";
        const strLen = str.length;
        let resultTodoId = "";
    
        for (let i = 0; i < len; i++) {
            resultTodoId += str[Math.floor(Math.random() * strLen)];
        }
    
        return resultTodoId;
      };
    

  const getStatus = () => {
      let result = context.todoStatus;
      return result;
  };
  const getStatusJa = () => {
      let result = context.todoStatusJa;
      return result;
  };

  const createNewTask = async () => {
    try {
      const todoSubCollectionRef = collection(db, "rooms", rooms?.id, "todo");

      const newStatus = getStatus();

      await setDoc(doc(todoSubCollectionRef), {
        title: context.taskName,
        text: context.taskText,
        startDate: startDate,
        endDate: endDate,
        priority: context.taskSelect,
        name: profile?.name,
        uid: profile?.uid,
        tid: createTodoId(),
        status: newStatus,
        timestamp: serverTimestamp(),
      });

      toast({
        title: `「${context.taskName}」作成完了`,
        status: "success",
        isClosable: true,
        position: "top",
      });
      context.setTaskText('');
      setSelectValue('');
      setCheckTaskName(false);
      setCheckTaskSelect(false);
    } catch {
      toast({
        title: `タスクの作成に失敗しました`,
        status: "error",
        isClosable: true,
        position: "top",
      });
      context.setTaskText('');
      setSelectValue('');
      setCheckTaskName(false);
      setCheckTaskSelect(false);
    }
  };

  const handleTaskName = (event: React.ChangeEvent<HTMLInputElement>) => {
    context.setTaskName(event.currentTarget.value);
    if (event.currentTarget.value) {
      setCheckTaskName(true);
    } else {
      setCheckTaskName(false);
    }
  };
  const handleTaskText: React.ChangeEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    context.setTaskText(event.currentTarget.value);
  };
  const handleTaskSelect: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    context.setTaskSelect(event.currentTarget.value);
    if (event.currentTarget.value) {
      setCheckTaskSelect(true);
    } else {
      setCheckTaskSelect(false);
    }
    setSelectValue(event.currentTarget.value);
  };

  const checkCreateTask = [checkTaskName, checkTaskSelect];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={"xl"}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent w={"xl"}>
        <ModalHeader>{`${getStatusJa()}タスクを追加`}</ModalHeader>
        <ModalCloseButton
          onClick={() => {
            setCheckTaskName(false);
            setCheckTaskSelect(false);
          }}
        />
        <ModalBody>
          <Stack spacing={6}>
            <FormControl id="projectName" isRequired>
              <FormLabel>タイトル</FormLabel>
              <Input
                name="projectName"
                placeholder={"タイトル"}
                onChange={handleTaskName}
              />
            </FormControl>
            <FormControl>
              <FormLabel>タスクの詳細</FormLabel>
              <Textarea placeholder="タスクの詳細" onChange={handleTaskText} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>開始日</FormLabel>
              <DatePicker
                dateFormat="yyyy/MM/dd"
                selected={startDate}
                minDate={Today}
                locale="ja"
                calendarStartDay={1}
                onChange={(selectedDate) => {
                  setStartDate(selectedDate || Today);
                }}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>終了日</FormLabel>
              <DatePicker
                dateFormat="yyyy/MM/dd"
                selected={endDate}
                minDate={Today}
                locale="ja"
                calendarStartDay={1}
                onChange={(selectedDate) => {
                  setEndDate(selectedDate || Today);
                }}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>優先度</FormLabel>
              <Select value={selectValue} onChange={handleTaskSelect}>
                <option value="" disabled>
                  タスクの優先度
                </option>
                <option value="低">低</option>
                <option value="中">中</option>
                <option value="高">高</option>
              </Select>
            </FormControl>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => {
              createNewTask();
              onClose();
            }}
            disabled={checkCreateTask.some((ok) => !ok)}
          >
            作成
          </Button>
          <Button
            fontWeight={500}
            mr={3}
            onClick={() => {
              onClose();
              context.setTaskText('');
              setSelectValue('');
              setCheckTaskName(false);
              setCheckTaskSelect(false);
            }}
          >
            閉じる
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
