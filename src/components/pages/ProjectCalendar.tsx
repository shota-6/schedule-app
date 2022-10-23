import { Flex, Grid, GridItem, Heading, Skeleton } from "@chakra-ui/react";
import { FC, memo, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useRooms } from "../../hooks/useRooms";
import { useCalendar } from "../../hooks/useCalendar";

import { getAuth } from "firebase/auth";
// import { NavLink as RouterLink } from "react-router-dom";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import allLocales from "@fullcalendar/core/locales-all";

import "../../theme/fullCalendar.css";

export const ProjectCalendar: FC = memo(() => {
  const roomsData = useRooms();
  const rooms = roomsData.rooms;

  const calendarData = useCalendar();
  const calendar = calendarData.calendarData;

  const auth = getAuth();
  const user = auth.currentUser;

  const [loadSkeleton, setLoadSkeleton] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoadSkeleton(false);
    }, 1000);
  }, []);

  // userAgentでブラウザ情報を取得
  const agent = window.navigator.userAgent.toLowerCase();

  if (!user) {
    return <Navigate replace to="/" />;
  } else {
    return (
      <>
        <Flex
          height="53px"
          width="100%"
          alignItems="center"
          py={3}
          px={5}
          bg="white"
          borderBottom="1px"
          borderBottomColor="gray.200"
          pos="fixed"
          top="61px"
          zIndex="10"
          display={{ base: "block", md: "none" }}
        >
          <Heading as="h2" fontSize="lg" width="100%">
            <Skeleton isLoaded={!loadSkeleton} fadeDuration={1}>
              {rooms?.projectName}
            </Skeleton>
          </Heading>
        </Flex>
        <Grid
          templateRows={{ base: "repeat(13, 1fr)", md: "repeat(14, 1fr)" }}
          templateColumns="repeat(7, 1fr)"
          height={{ base: "calc( 100vh - 113px )", md: "calc( 100vh - 60px )" }}
          pos="fixed"
          bottom="0"
          right="0"
          width={{ base: "100vw", md: "86vw" }}
        >
          <GridItem
            colSpan={7}
            rowSpan={1}
            py={3}
            px={5}
            bg="white"
            borderBottom="1px"
            borderBottomColor="gray.200"
            display={{ base: "none", md: "block" }}
          >
            <Flex height="100%" alignItems="center">
              <Heading as="h2" fontSize="lg" width="100%">
                <Skeleton isLoaded={!loadSkeleton} fadeDuration={1}>
                  {rooms?.projectName}
                </Skeleton>
              </Heading>
            </Flex>
          </GridItem>

          <GridItem
            colSpan={7}
            rowSpan={14}
            p={5}
            mt={{
              base:
                agent.indexOf("crios") != -1
                  ? "100px"
                  : agent.indexOf("gecko) version") != -1
                  ? "85px"
                  : "0",
              md: 0,
            }}
          >
            <Skeleton isLoaded={!loadSkeleton} fadeDuration={1}>
              <FullCalendar
                height="auto"
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                locales={allLocales}
                locale="ja"
                buttonText={{ today: "今月" }}
                events={calendar}
              />
            </Skeleton>
          </GridItem>
        </Grid>
      </>
    );
  }
});
