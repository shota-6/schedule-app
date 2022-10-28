import { ChakraProvider } from "@chakra-ui/react";

import theme from "./theme/theme";
import { Router } from "./components/pages/router/Router";
import { useState, createContext, FC, useContext } from "react";
import { DocumentData } from "firebase/firestore";
import { AuthProvider } from "./context/authContext";

// const photoURL = auth.currentUser?.photoURL;

type roomsProjectData = {
  projectId: string;
  projectName: string;
  projectPass: string;
  uid: string;
  timestamp: string;
};

type chatMessageData = {
  message: string;
  createdAt: string;
  cid: string;
  name: string;
  uid: string;
  AvatarImg: string;
};

type todoData = {
  title: string;
  text: string;
  startDate: string;
  endDate: string;
  priority: string;
  name: string;
  uid: string;
  tid: string;
  status: string;
  timestamp: string;
};

type checkVisiterData = {
  projectId: string;
  projectName: string;
  projectPass: string;
  roomDoc: string;
};

export interface AppContextType {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;

  nickName: string;
  setNickName: (nickName: string) => void;

  avatarDefaultImg: string;
  setAvatarDefaultImg: (avatarDefaultImg: string) => void;

  avatarImg: string;
  setAvatarImg: (avatarImg: string) => void;

  file: File | null;
  setFile: (file: File | null) => void;

  projectName: string;
  setProjectName: (projectName: string) => void;

  projectPass: string;
  setProjectPass: (projectPass: string) => void;

  projectId: string;
  setProjectId: (projectId: string) => void;

  projectNameArr: string[];
  setProjectNameArr: (projectNameArr: string[]) => void;

  roomsInfo: DocumentData | null;
  setRoomsInfo: (roomsInfo: DocumentData | null) => void;

  roomArr: roomsProjectData[];
  setRoomArr: (roomArr: roomsProjectData[]) => void;

  chatDataArr: chatMessageData[];
  setChatDataArr: (chatDataArr: chatMessageData[]) => void;

  taskName: string;
  setTaskName: (taskName: string) => void;

  taskText: string;
  setTaskText: (taskText: string) => void;

  taskSelect: string;
  setTaskSelect: (taskSelect: string) => void;

  todoArr: todoData[];
  setTodoArr: (todoArr: todoData[]) => void;

  todoStatus: string;
  setTodoStatus: (todoStatus: string) => void;

  todoStatusJa: string;
  setTodoStatusJa: (todoStatusJa: string) => void;

  visiterArr: checkVisiterData[];
  setVisiterArr: (visiterArr: checkVisiterData[]) => void;

  visiterDocRef: string;
  setVisiterDocRef: (visiterDocRef: string) => void;

  visiterName: string;
  setVisiterName: (visiterName: string) => void;
}

export const AppContext = createContext<AppContextType>({
  isLogin: false,
  setIsLogin: (isLogin: boolean) => {},

  nickName: "",
  setNickName: (nickName: string) => {},

  avatarDefaultImg: "../../../../public/avatar.svg",
  setAvatarDefaultImg: (avatarDefaultImg: string) => {},

  avatarImg: ``,
  setAvatarImg: (avatarImg: string) => {},

  file: null,
  setFile: (file: File | null) => {},

  projectName: ``,
  setProjectName: (projectName: string) => {},

  projectPass: ``,
  setProjectPass: (projectPass: string) => {},

  projectId: ``,
  setProjectId: (projectId: string) => {},

  projectNameArr: [],
  setProjectNameArr: (projectNameArr: string[]) => {},

  roomsInfo: null,
  setRoomsInfo: (roomsInfo: DocumentData | null) => {},

  roomArr: [],
  setRoomArr: (roomArr: roomsProjectData[]) => {},

  chatDataArr: [],
  setChatDataArr: (chatDataArr: chatMessageData[]) => {},

  taskName: ``,
  setTaskName: (taskName: string) => {},

  taskText: ``,
  setTaskText: (taskText: string) => {},

  taskSelect: ``,
  setTaskSelect: (taskSelect: string) => {},

  todoArr: [],
  setTodoArr: (todoArr: todoData[]) => {},

  todoStatus: ``,
  setTodoStatus: (todoStatus: string) => {},

  todoStatusJa: ``,
  setTodoStatusJa: (todoStatusJa: string) => {},

  visiterArr: [],
  setVisiterArr: (visiterArr: checkVisiterData[]) => {},

  visiterDocRef: ``,
  setVisiterDocRef: (visiterDocRef: string) => {},

  visiterName: ``,
  setVisiterName: (visiterName: string) => {},
});

const App: FC = () => {
  const context: AppContextType = useContext(AppContext);

  const [isLogin, setIsLogin] = useState<boolean>(context.isLogin);

  const [nickName, setNickName] = useState(context.nickName);
  const [avatarDefaultImg, setAvatarDefaultImg] = useState(
    context.avatarDefaultImg
  );
  const [avatarImg, setAvatarImg] = useState(context.avatarImg);
  const [file, setFile] = useState(context.file);
  const [projectName, setProjectName] = useState(context.projectName);
  const [projectPass, setProjectPass] = useState(context.projectPass);
  const [projectId, setProjectId] = useState(context.projectPass);
  const [projectNameArr, setProjectNameArr] = useState<string[]>(
    context.projectNameArr
  );
  const [roomsInfo, setRoomsInfo] = useState<DocumentData | null>(null);

  const [roomArr, setRoomArr] = useState<roomsProjectData[]>(context.roomArr);
  const [chatDataArr, setChatDataArr] = useState<chatMessageData[]>(
    context.chatDataArr
  );

  const [taskName, setTaskName] = useState(context.taskName);
  const [taskText, setTaskText] = useState(context.taskText);
  const [taskSelect, setTaskSelect] = useState(context.taskSelect);

  const [todoArr, setTodoArr] = useState<todoData[]>(context.todoArr);

  const [todoStatus, setTodoStatus] = useState(context.todoStatus);
  const [todoStatusJa, setTodoStatusJa] = useState(context.todoStatusJa);

  const [visiterArr, setVisiterArr] = useState<checkVisiterData[]>(
    context.visiterArr
  );


  const [visiterDocRef, setVisiterDocRef] = useState(context.visiterDocRef);
  const [visiterName, setVisiterName] = useState(context.visiterName);

  const newContext: AppContextType = {
    isLogin, 
    setIsLogin,

    nickName,
    setNickName,

    avatarDefaultImg,
    setAvatarDefaultImg,

    avatarImg,
    setAvatarImg,

    file,
    setFile,

    projectName,
    setProjectName,

    projectPass,
    setProjectPass,

    projectId,
    setProjectId,

    projectNameArr,
    setProjectNameArr,

    roomsInfo,
    setRoomsInfo,

    roomArr,
    setRoomArr,

    chatDataArr,
    setChatDataArr,

    taskName,
    setTaskName,

    taskText,
    setTaskText,

    taskSelect,
    setTaskSelect,

    todoArr,
    setTodoArr,

    todoStatus,
    setTodoStatus,

    todoStatusJa,
    setTodoStatusJa,

    visiterArr,
    setVisiterArr,

    visiterDocRef,
    setVisiterDocRef,

    visiterName, 
    setVisiterName,
  };

  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <AppContext.Provider value={newContext}>
          <Router />
        </AppContext.Provider>
      </ChakraProvider>
    </AuthProvider>
  );
};

export default App;
