import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { Group, Stack, Title } from '@mantine/core';
import './calendar.css';

type VesetEvent = {
    title: string;
    start: string;
}

export default function CalendarPage() {
  const [events, setEvents] = useState<VesetEvent[]>([]);

  const handleDateClick = (arg: DateClickArg) => {
    const title = prompt('Enter event type: Period Start, Period End, Hefsek');
    if (title) {
      setEvents((prevEvents) => [...prevEvents, { title, start: arg.dateStr }]);
    }
  };

  return (
    <Group justify='space-between' align='center' w='100%' h='100vh' p={20}>
        <Stack w='25%' h='100%' mx='auto' align='center' justify='center'>
            <Title order={3} ta='center'>Mikvah Calendar</Title>
        </Stack>
        
        <Stack className="calendar" w='70%' h='100%' align='center' justify='center'>
            <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            dateClick={handleDateClick}
            selectable={true}
            height="auto"
            />
        </Stack>
    </Group>
  );
}
