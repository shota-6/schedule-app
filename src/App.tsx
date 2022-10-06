import { ChakraProvider } from "@chakra-ui/react";

import theme from "./theme/theme";
import { Router } from "./components/pages/router/Router";
import { useState, createContext, FC, useContext } from "react";
import { DocumentData } from "firebase/firestore";

// const photoURL = auth.currentUser?.photoURL;

export interface AppContextType {
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
}

export const AppContext = createContext<AppContextType>({
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
});

const App: FC = () => {
  const context: AppContextType = useContext(AppContext);
  const [nickName, setNickName] = useState(context.nickName);
  const [avatarDefaultImg, setAvatarDefaultImg] = useState(
    context.avatarDefaultImg
  );
  const [avatarImg, setAvatarImg] = useState(context.avatarImg);
  const [file, setFile] = useState(context.file);
  const [projectName, setProjectName] = useState(context.projectName);
  const [projectPass, setProjectPass] = useState(context.projectPass);
  const [projectId, setProjectId] = useState(context.projectPass);
  const [projectNameArr, setProjectNameArr] = useState<string[]>(context.projectNameArr);
  const [roomsInfo, setRoomsInfo] = useState<DocumentData | null>(null);

  const newContext: AppContextType = {
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
    setRoomsInfo
  };

  // const getAuthUserInfo = async () => {
  //       if( auth.currentUser !== null){
  //         const usersCollectionRef = query(collection(db, "users"), where("name", "==", 'sho'));
  //         getDocs(usersCollectionRef).then((querySnapshot) => {
  //           querySnapshot.docs.forEach((doc) => console.log(doc.data()));
  //         });
  //       } else {
  //         console.log(auth.currentUser)
  //         console.log('f')
  //       }
  // };

  // useEffect(() => {
  //   getAuthUserInfo();
  // }, []);

  return (
    <ChakraProvider theme={theme}>
      <AppContext.Provider value={newContext}>
        <Router />
      </AppContext.Provider>
    </ChakraProvider>
  );
};

export default App;
