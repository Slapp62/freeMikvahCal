import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { Stack, Title } from '@mantine/core';
import './calendar.css';
import CalendarEventModal from './calendarEvent.modal';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

type CalendarEventType = {
    id: string;
    title: string;
    start: any;
    groupID: any;
}

export default function CalendarPage() {
    
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [events, setEvents] = useState<CalendarEventType[]>([]);

  const handleDateClick = (arg: DateClickArg) => {
    const dateClicked = arg.date.toLocaleString();
    setModalOpened(true);
    setSelectedDate(dateClicked);
  };

  const handleCloseModal = () => {
    setModalOpened(false);
  };

    
    

    useEffect(() => {
        try {
            const fetchEvents = async () => {
                const {data : periods, error} = await supabase
                    .from("periods")
                    .select('id, start_date, onah, hefsek_date,  notes')
                    .order('start_date', { ascending: false });

                console.log(error)

                const calendarEvents = periods?.flatMap((period) => {
                    const events = [];

                    events.push({
                        id: `${period.id}-start`,
                        title: 'Period Start',
                        start: period.start_date,
                        groupID: period.id,
                    })

                    if (period.hefsek_date){
                        events.push({
                            id: `${period.id}-hefsek`,
                            title: 'Hefsek Tahara',
                            start: period.hefsek_date,
                            groupID: period.id,
                        })
                    }
                    return events
                })
                setEvents(calendarEvents ?? [])
            }
            fetchEvents();
        } catch (error){
            console.log(error);
        }  
    }, []);
    
  return (
    <Stack className="calendar" w='80%' mx='auto' align='center' justify='center'>
        <Title order={3} mt={10} ta='center'>Mikvah Calendar</Title>
    
        <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        selectable={true}
        height='auto'
        />

        <CalendarEventModal 
            clicked={modalOpened} 
            close={handleCloseModal} 
            date={selectedDate}
        /> 
    </Stack>
  );
}
