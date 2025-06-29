import { useEffect } from "react";
import { supabase } from "../lib/supabaseClient.ts";
import useZStore from "../Zstore.ts";
import { ICalendarEvent } from "../Types_Interfaces.ts";

const useLoadEvents = () => {
    const events = useZStore((state) => state.events);
    const setEvents = useZStore((state) => state.setEvents);
    const refetchFlag = useZStore((state) => state.refetchFlag);
    

    useEffect(() => {
        const fetchEvents = async () => {
            const {data: periods, error: periodsError} = await supabase
                .from("periods")
                .select('id, start_date, onah, hefsek_date,  notes')
                .order('start_date', { ascending: false });
            if (periodsError) {
                console.error("Error fetching periods:", periodsError);
                return;
            }

            const {data: onahs, error: onahsError} = await supabase
                .from("onahs")
                .select('period_id, onah_date, onah_time, type')
                .order('onah_date', { ascending: false });
            if (onahsError) {
                console.error("Error fetching onahs:", onahsError);
                return;
            }
            
            const periodEvents = periods?.flatMap((period) => {
                const onahTime = period.onah === 'day' ? `Day` : 'Night';
                const events = [
                    {
                        id: `${period.id}-start`,
                        title: `🩸 ${onahTime}`,
                        start: period.start_date,
                        groupID: period.id,
                        className: 'period-start',
                        allDay: false,
                    },
                ];

                if (period.hefsek_date){
                    events.push({
                        id: `${period.id}-hefsek`,
                        title: '✅ Hefsek',
                        start: period.hefsek_date,
                        groupID: period.id,
                        className: 'hefsek',
                        allDay: false,
                    })
                }
                return events
            })

            const onahEvents= onahs.map((onah) => {
                const onahIcon = onah.onah_time === 'day' ? `☀️` : '🌜';
                const onahTime = new Date(onah.onah_date).toLocaleString();
               
                console.log('onah', onahTime);
                return {
                    id: `${onah.period_id}-${onah.type}`,
                    title: `${onahIcon} ${onah.type}`,
                    start: onah.onah_date,
                    groupID: onah.period_id,
                    className: 'onah',
                    
                }
                
            })
            console.log('onahEvents', onahEvents);
            
            setEvents([...periodEvents as ICalendarEvent[], ...onahEvents as ICalendarEvent[]]);
        }

        fetchEvents();
    }, [refetchFlag]);

    return events
}

export default useLoadEvents