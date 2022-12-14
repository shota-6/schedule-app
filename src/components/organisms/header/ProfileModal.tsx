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
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";

import { db, storage } from "../../../firebase";
import { updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { AppContext, AppContextType } from "../../../App";

import { ImagePreview } from "./ImagePreview";
import { useProfile } from "../../../hooks/useProfile";
import * as CSS from "csstype";

type userProps = {
  profileName: string;
  profileAvatar: string;
};

export const ProfileModal: FC<userProps> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { profileName, profileAvatar } = props;

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const context: AppContextType = useContext(AppContext);
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
    setDisableName(true);
  }, []);

  //   save profile
  const saveProfile = async () => {
    try {
      setLoading(true);
      const storageRef = ref(storage, context.file?.name);

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
                name: context.nickName === '' ? profileName : context.nickName,
                avatarImg: url,
              });
              setLoading(false);
              toast({
                title: `????????????????????????????????????`,
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
            title: `??????????????????????????????`,
            status: "success",
            isClosable: true,
            position: "top",
          });
        }
      }
    } catch (err) {
      console.log(err);
      toast({
        title: `????????????????????????`,
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
    left: "68px",
    top: "-3px",
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
        py={3}
      >
        ????????????????????????
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        size={{ base: "xs", md: "md" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>???????????????????????????</ModalHeader>
          <ModalCloseButton
            onClick={() => {
              onClose();
              iconReset();
            }}
          />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>????????????????????????</FormLabel>
              <Stack direction={"row"} spacing={6} pb={7}>
                <Center w="30%">
                  {context.file ? (
                    <Avatar style={avatarStyle}>
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
                    </Avatar>
                  ) : (
                    <Avatar
                      style={avatarStyle}
                      src={profileAvatar}
                      //   src={context.avatarDefaultImg}
                      // src={
                      //   context.file
                      //     ? URL.createObjectURL(context.file)
                      //     : profile
                      //     ? profile?.avatarImg
                      //     : ""
                      // }
                    />
                  )}
                </Center>
                <Center w={{ base: "65%", md: "70%" }} ml={{ base: 5, md: 0 }}>
                  <input
                    style={inputStyle}
                    type="file"
                    onChange={changeFileHandler}
                    id="imageInput"
                  />
                  <FormLabel
                    style={labelStyle}
                    fontSize={{ base: "12px", md: "16px" }}
                    htmlFor="imageInput"
                  >
                    ?????????????????????????????????
                  </FormLabel>
                </Center>
              </Stack>
            </FormControl>
            <FormControl>
              <FormLabel>??????????????????</FormLabel>
              <Input
                // ref={initialRef}
                // placeholder={`${user?.displayName}`}
                placeholder={`${profileName}`}
                onChange={changeProfileName}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                saveProfile();
                onClose();
                iconReset();
              }}
              isLoading={loading}
              disabled={disableImg && disableName}
            >
              ??????
            </Button>
            <Button
              fontWeight={500}
              onClick={() => {
                onClose();
                iconReset();
              }}
            >
              ?????????
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
