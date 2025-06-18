import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { Stack, Title } from '@mantine/core';
import './calendar.css';
import CalendarEventModal from './calendarEvent.modal';
import { useState } from 'react';


export default function CalendarPage() {
    
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  const handleDateClick = (arg: DateClickArg) => {
    setModalOpened(true);
    setSelectedDate(arg.date);
  };

  const handleCloseModal = () => {
    setModalOpened(false);
  };

  return (
    <Stack className="calendar" w='80%' mx='auto' align='center' justify='center'>
        <Title order={3} mt={10} ta='center'>Mikvah Calendar</Title>
    
        <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        // events={events}
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
