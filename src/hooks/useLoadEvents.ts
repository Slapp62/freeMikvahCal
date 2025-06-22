import { useEffect } from "react";
import { supabase } from "../lib/supabaseClient.ts";
import useZStore from "../Zstore.ts";

const useLoadEvents = () => {
    
    const events = useZStore((state) => state.events);
    const setEvents = useZStore((state) => state.setEvents);
    const refetchFlag = useZStore((state) => state.refetchFlag);
   
    useEffect(() => {
        const fetchEvents = async () => {
            const {data : periods, error} = await supabase
                .from("periods")
                .select('id, start_date, onah, hefsek_date,  notes')
                .order('start_date', { ascending: false });
            if (error) {
                console.error("Error fetching periods:", error);
                return;
            }

            const calendarEvents = periods?.flatMap((period) => {
                //const onahLabel = period.onah === 'day' ? 'Before Sunset' : 'After Sunset';
                const events = [
                    {
                        id: `${period.id}-start`,
                        title: `🩸 Night`,
                        start: period.start_date,
                        groupID: period.id,
                        className: 'period-start',
                    },
                ];

                if (period.hefsek_date){
                    events.push({
                        id: `${period.id}-hefsek`,
                        title: '✅ Hefsek',
                        start: period.hefsek_date,
                        groupID: period.id,
                        className: 'hefsek',
                    })
                }
                console.log(period.start_date);
                return events
            })
            setEvents(calendarEvents ?? [])
        }

        fetchEvents();
    }, [refetchFlag]);

    return events
}

export default useLoadEvents