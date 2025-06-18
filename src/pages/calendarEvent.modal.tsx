import { Modal } from '@mantine/core';
import { useEffect, useState } from 'react';
import PeriodEvent from './periodEvent';

type ModalProps = {
    clicked: boolean;
    close: () => void;
    date: Date | null;
};

function CalendarEventModal({clicked, close, date } : ModalProps) {
    
    const eventDate = date?.toLocaleDateString();
    const [closeOutside, setCloseOutside] = useState(false);

    useEffect(() => {
        if (clicked){
            const timer = setTimeout(() => {
                setCloseOutside(true);
            }, 300)
            return () => clearTimeout(timer)
        } else {
            setCloseOutside(false)
        }
    }, [clicked])


    return (
    <>
        <Modal 
            opened={clicked} 
            onClose={close}
            title={`Entering an event for ${eventDate}`}
            closeOnClickOutside={closeOutside}
            centered
            size='sm'
            radius="md"
        >
        
            <PeriodEvent/>
        </Modal>
    </>
    );
}

export default CalendarEventModal;