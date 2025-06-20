import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { EventClickArg } from '@fullcalendar/core';
import { Button, Modal, Select, Stack, Title } from '@mantine/core';
import './calendar.css';
import CalendarEventModal from './calendarEvent.modal';
import { useState } from 'react';
import useLoadEvents from '../hooks/useLoadEvents.ts';
import { supabase } from '../lib/supabaseClient.ts';
import useZStore from '../Zstore.ts/index.ts';

export default function CalendarPage() {

    const events = useLoadEvents();
    const removeEvent = useZStore((state) => state.removeEvent);
    const [modalOpened, setModalOpened] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    const [eventModalOpened, setEventModalOpened] = useState(false);
    const close = () => setEventModalOpened(false);
    const open = () => setEventModalOpened(true);
    const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
    
    const handleDateClick = (arg: DateClickArg) => {
        const dateClicked = arg.date.toLocaleString();
        setModalOpened(true);
        setSelectedDate(dateClicked);
    };

    const handleCloseDateModal = () => {
        setModalOpened(false);
    };





    const handleEventClick = (arg: EventClickArg) => {
       open();
       const eventClicked = arg.event;
       console.log(eventClicked);
       setSelectedEvent(eventClicked);
    };

    const handleDeleteEvent = async () => {
        close();

        if (selectedEvent.title.startsWith('New Period')) {
            console.log('Deleting Period');
            
            const { error } = await supabase
                .from("periods")
                .update({ start_date: null, onah: null, notes: null })
                .eq('start_date', selectedEvent.start.toLocaleString());
            if (error) {
                console.error("Error deleting periods:", error);
                return;
            }
        }

        if (selectedEvent.title.startsWith('Hefsek Tahara')) {
            console.log('Deleting Hefsek Tahara');
            const { error } = await supabase
                .from("periods")
                .update({ hefsek_date: null })
                .eq('hefsek_date', selectedEvent.start.toLocaleString());
            if (error) {
                console.error("Error deleting Hefsek Tahara:", error);
                return;
            }
        }

        removeEvent(selectedEvent)
    };

    const handleOnahChange = async (value: string | null) => {
        close();
        const { error } = await supabase
            .from("periods")
            .update({ onah: value })
            .eq('start_date', selectedEvent.start.toLocaleString());
        if (error) {
            console.error("Error updating onah:", error);
            return;
        }
    };
    
  return (
    <Stack className="calendar" w='80%' mx='auto' align='center' justify='center'>
        <Title order={3} mt={10} ta='center'>Mikvah Calendar</Title>
    
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            selectable={true}
            height='auto'
            eventDisplay='auto'
        />

        <CalendarEventModal 
            clicked={modalOpened} 
            close={handleCloseDateModal} 
            date={selectedDate}
        /> 

        <Modal opened={eventModalOpened} onClose={close} title="Edit Event" centered size="xs">
            <Stack>
                <Select
                    label="Change Onah"
                    placeholder="Pick a new time"
                    data={
                        [
                            { value: 'day', label: 'Before Sunset' },
                            { value: 'night', label: 'After Sunset' },
                        ]
                    }
                    onChange={handleOnahChange}
                />
                <Button color="red" onClick={handleDeleteEvent}>Delete Event</Button>
                <Button variant="outline" onClick={close}>Cancel</Button>
            </Stack>
        </Modal>
    </Stack>
  );
}
