import React, { FC, useCallback, useContext, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  useDisclosure,
  Center,
  Avatar,
  Stack,
  AvatarBadge,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";

import { auth, db, storage } from "../../../firebase";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { getAuth, updateProfile } from "firebase/auth";
import { AppContext, AppContextType } from "../../../App";

import { ImagePreview } from "./ImagePreview";
import { useUser } from "../../../hooks/useAuth";
import { useProfile } from "../../../hooks/useProfile";
import * as CSS from "csstype";

export const InitialFocus: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const context: AppContextType = useContext(AppContext);
  const auth = getAuth();
  const user = auth.currentUser;

  const { userAuth } = useUser();
  const toast = useToast();

  //   image preview
  const [loading, setLoading] = useState<boolean>(false);
  const [disableImg, setDisableImg] = useState<boolean>(true);
  const [disableName, setDisableName] = useState<boolean>(true);

  const profileData = useProfile();
  const profile = profileData.profile;

  const changeFileHandler = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      if (evt.currentTarget?.files && evt.currentTarget.files[0]) {
        context.setFile(evt.currentTarget.files[0]);
        setDisableImg(false);
      }
    },
    []
  );

  const iconReset = useCallback(() => {
    context.setFile(null);
    setDisableImg(true);
  }, []);

  //   save profile
  const saveProfile = async () => {
    try {
      setLoading(true);
      const storageRef = ref(storage, context.file?.name);
      const uid = userAuth?.uid;
      const docRef = collection(db, "users");

      //   if (user !== null) {
      //     updateProfile(user, {
      //       displayName: context.nickName,
      //     });
      //   }

      if (context.file !== null) {
        uploadBytes(storageRef, context.file).then((snapshot) => {
          console.log("Uploaded a Avatar image!");
          //   context.setAvatarImg(
          //     `gs://tasks-app-d464a.appspot.com/${file?.name}`
          //   );
          const imageRef = ref(storage, context.file?.name);
          getDownloadURL(imageRef).then(async (url) => {
            if (profile) {
              const userRef = doc(db, "users", profile?.id);
              await updateDoc(userRef, {
                name: context.nickName,
                avatarImg: url,
              });
              setLoading(false);
              toast({
                title: `プロフィール画像更新完了`,
                status: "success",
                isClosable: true,
                position: "top",
              });
            }
          });
        });
      } else {
        if (profile) {
          const userRef = doc(db, "users", profile?.id);
          await updateDoc(userRef, { name: context.nickName });
          setLoading(false);
          toast({
            title: `ニックネーム更新完了`,
            status: "success",
            isClosable: true,
            position: "top",
          });
        }
      }
    } catch (err) {
      console.log(err);
      toast({
        title: `更新失敗しました`,
        status: "error",
        isClosable: true,
        position: "top",
      });
    }
  };

  // profile change name
  const changeProfileName = (event: React.ChangeEvent<HTMLInputElement>) => {
    context.setNickName(event.currentTarget.value);
    if (event.target.value.length >= 1) {
      setDisableName(false);
    } else {
      setDisableName(true);
    }
  };

  // console.log(profile);

  //   style
  const inputStyle = {
    display: "none",
  };
  const labelStyle: CSS.Properties = {
    verticalAlign: "middle",
    outline: "2px solid transparent",
    backgroundColor: "#EDF2F7",
    padding: "5px 10px",
    borderRadius: "0.375rem",
    width: "17em",
    textAlign: "center",
    cursor: "pointer",
  };

  const avatarStyle: CSS.Properties = {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "100%",
    position: "relative",
  };
  const avatarCloseStyle: CSS.Properties = {
    position: "absolute",
    left: "75px",
    top: "30px",
    border: "3px solid white",
  };

  return (
    <>
      <Button
        width="100%"
        bg="white"
        borderRadius={0}
        onClick={onOpen}
        fontWeight={500}
      >
        プロフィール編集
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>プロフィールの編集</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>プロフィール画像</FormLabel>
              <Stack direction={"row"} spacing={6} pb={7}>
                <Center w="30%">
                  {context.file ? (
                    <>
                      <ImagePreview file={context.file} />
                      <IconButton
                        style={avatarCloseStyle}
                        size="sm"
                        rounded="full"
                        colorScheme="red"
                        aria-label="remove Image"
                        icon={<SmallCloseIcon />}
                        onClick={iconReset}
                      />
                    </>
                  ) : (
                    <Avatar
                      style={avatarStyle}
                      //   src={context.avatarDefaultImg}
                      src={
                        context.file
                          ? URL.createObjectURL(context.file)
                          : profile
                          ? profile?.avatarImg
                          : ""
                      }
                    />
                  )}
                </Center>
                <Center w="70%">
                  <input
                    style={inputStyle}
                    type="file"
                    onChange={changeFileHandler}
                    id="imageInput"
                  />
                  <label style={labelStyle} htmlFor="imageInput">
                    プロフィール画像を選択
                  </label>
                </Center>
              </Stack>
            </FormControl>
            <FormControl>
              <FormLabel>ニックネーム</FormLabel>
              <Input
                ref={initialRef}
                // placeholder={`${user?.displayName}`}
                placeholder={`${
                  context.nickName
                    ? context.nickName
                    : profile
                    ? profile.name
                    : ""
                }`}
                onChange={changeProfileName}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={saveProfile}
              isLoading={loading}
              disabled={disableImg && disableName}
            >
              保存
            </Button>
            <Button fontWeight={500} onClick={onClose}>
              閉じる
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
