import {
    Flex,
    Grid,
    GridItem,
    Heading,
  } from "@chakra-ui/react";
  import { FC, memo, useContext} from "react";
  import { useParams, Navigate } from "react-router-dom";
  import { AppContext, AppContextType } from "../../App";
  import { useProfile } from "../../hooks/useProfile";
  import { useRooms } from "../../hooks/useRooms";
  import { useCalendar } from "../../hooks/useCalendar";
  
  
  import { getAuth } from "firebase/auth";
  
  import FullCalendar from "@fullcalendar/react";
  import timeGridPlugin from '@fullcalendar/timegrid';
  import allLocales from "@fullcalendar/core/locales-all";
  
  export const TimeLine: FC = memo(() => {
    const context: AppContextType = useContext(AppContext);

    const roomsData = useRooms();
    const rooms = roomsData.rooms;

    const calendarData = useCalendar();
    const calendar = calendarData.calendarData;
  
    const profileData = useProfile();
    const profile = profileData.profile;
  
    const auth = getAuth();
    const user = auth.currentUser;
  
    // console.log(context.todoArr)
  
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
              <Heading as="h2" fontSize="lg">
                {rooms?.projectName}
              </Heading>
            </Flex>
          </GridItem>
  
          <GridItem colSpan={7} rowSpan={14} p={5}>
            <FullCalendar
              height="75vh"
              plugins={[timeGridPlugin]}
              initialView="timeGridWeek"
              locales={allLocales}
              locale="ja"
              events={calendar}
              buttonText={{ today: '今週' }}
               allDaySlot={false}
            />
          </GridItem>
        </Grid>
      );
    }
  });
  