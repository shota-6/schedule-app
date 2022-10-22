import { Flex, Grid, GridItem, Heading, Skeleton } from "@chakra-ui/react";
import { FC, memo, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useRooms } from "../../hooks/useRooms";
import { useCalendar } from "../../hooks/useCalendar";

import { getAuth } from "firebase/auth";
// import { NavLink as RouterLink } from "react-router-dom";

import FullCalendar from "@fullcalendar/react";
import listPlugin from "@fullcalendar/list";
import allLocales from "@fullcalendar/core/locales-all";

import "../../theme/fullCalendar.css";

export const PlanList: FC = memo(() => {
  const [loadSkeleton, setLoadSkeleton] = useState(true);
  const roomsData = useRooms();
  const rooms = roomsData.rooms;

  const calendarData = useCalendar();
  const calendar = calendarData.calendarData;

  const auth = getAuth();
  const user = auth.currentUser;

  // console.log(context.todoArr)
  useEffect(() => {
    setTimeout(() => {
      setLoadSkeleton(false);
    }, 1000);
  }, []);

  if (!user) {
    return <Navigate replace to="/" />;
  } else {
    return (
      <Grid
        templateRows="repeat(14, 1fr)"
        templateColumns="repeat(7, 1fr)"
        height={"calc( 100vh - 60px )"}
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
        >
          <Flex height="100%" alignItems="center">
            <Heading as="h2" fontSize="lg" width="100%">
              <Skeleton isLoaded={!loadSkeleton} fadeDuration={1}>
                {rooms?.projectName}
              </Skeleton>
            </Heading>
          </Flex>
        </GridItem>

        <GridItem colSpan={7} rowSpan={14} p={5}>
          <Skeleton isLoaded={!loadSkeleton} fadeDuration={1}>
            <FullCalendar
              height="75vh"
              plugins={[listPlugin]}
              initialView="listMonth"
              locales={allLocales}
              locale="ja"
              buttonText={{ today: "今月" }}
              events={calendar}
            />
          </Skeleton>
        </GridItem>
      </Grid>
    );
  }
});
