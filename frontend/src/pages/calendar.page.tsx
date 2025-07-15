import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { EventClickArg } from '@fullcalendar/core';
import { Box, Group, Stack, Title, Text } from '@mantine/core';
import './calendar.css';
import CalendarEventModal from './newCalEvent.modal.tsx';
import { useEffect, useState } from 'react';
import useLoadEvents from '../hooks/useLoadEvents.ts';
import useZStore from '../Zstore.ts/index.ts';
import EditEventModal from './editCalEvent.modal.tsx';
import { EventImpl } from '@fullcalendar/core/internal';
import { useMediaQuery } from '@mantine/hooks';
import { supabase } from '../lib/supabaseClient.ts';

export default function CalendarPage() {
    const isMobile = useMediaQuery('(max-width: 700px)');
    const events = useLoadEvents();
    const setClickedDate = useZStore((state) => state.setClickedDate);
    
    // New Event Modal
    const [newEventModalOpened, setNewEventModalOpened] = useState(false);
    const closeNewEventModal = () => setNewEventModalOpened(false);
    
    //Edit Event Modal
    const [eventModalOpened, setEventModalOpened] = useState(false);
    const closeEventModal = () => setEventModalOpened(false);
    const [selectedEvent, setSelectedEvent] = useState<EventImpl | null>(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
        
            updateUserLocation(lat, lon);
        });
    
        async function updateUserLocation(latitude: number, longitude: number) {
            const {data : user} = await supabase.auth.getUser();
            
            if (user) {
                const { error : locationError } = await supabase
                .from("user_info").update({
                    latitude: latitude,
                    longitude: longitude,
                })
                .eq('id', user.user?.id);

                if (locationError) console.log(locationError);
            }
        }
    }, []);

    const handleDateClick = (arg: DateClickArg) => {
        const date = arg.date;
        const dateClicked = new Date(Date.UTC(
            date.getFullYear(), 
            date.getMonth(), 
            date.getDate()))
            .toISOString().split('T')[0];
        setClickedDate(dateClicked);

        setNewEventModalOpened(true);
    };

    const handleEventClick = (arg: EventClickArg) => {
       const eventClicked = arg.event;
       setSelectedEvent(eventClicked);
       setEventModalOpened(true);
    };

  return (
    <Stack className="calendar" w={isMobile ? '100%' : '80%'} mx='auto' align='center' justify='center'>
        <Title order={1} mt={10} ta='center'>Mikvah Calendar</Title>
        <Text fw={500} fz={isMobile ? 'lg' : 'xl'}>Click on a day to enter a new event. Click on an existing event to edit it.</Text>
    
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            selectable={true}
            height='auto'
            eventDisplay='auto'
            timeZone='local'
            displayEventTime={false}
        />
        <Group bd={'2px solid rgb(207, 207, 207)'} px={15} py={5}>
            <Box>🩸 New Period </Box>
            <Box>✅ New Hefsek </Box>
            <Box>☀️ Onah is during the day </Box>
            <Box>🌙 Onah is at night</Box>
        </Group>
        <CalendarEventModal 
            clicked={newEventModalOpened} 
            close={closeNewEventModal} 
        /> 

        <EditEventModal
            clicked={eventModalOpened}
            close={closeEventModal}
            selectedEvent={selectedEvent}
        />
        
    </Stack>
  );
}
