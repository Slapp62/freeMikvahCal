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
                .select('period_id, onah_start, onah_day_night, type, onahOz_start')
                .order('onah_start', { ascending: false });
            if (onahsError) {
                console.error("Error fetching onahs:", onahsError);
                return;
            }
            
            const periodEvents = periods?.flatMap((period) => {
                const periodIcon = period.onah === 'day' ? `☀️` : '🌜';
                const onahTime = period.onah === 'day' ? `Day` : 'Night';
                const events = [
                    {
                        id: `${period.id}-start`,
                        title: `🩸 New Period - ${periodIcon} ${onahTime}`,
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
                return events
            })

            const onahEvents= onahs.flatMap((onah) => {
                const onahIcon = onah.onah_day_night === 'day' ? `☀️` : '🌜';
                const onahOz_Icon = onah.onah_day_night === 'day' ? `🌜` : '☀️';
                const onahTime = new Date(onah.onah_start).toLocaleString();
               
                console.log('onah', onahTime);
                const events = [
                    {
                        id: `${onah.period_id}-${onah.type}`,
                        title: `${onahIcon} ${onah.type}`,
                        start: onah.onah_start,
                        groupID: onah.period_id,
                        className: 'onah',
                        allDay: false,
                    }
                ]

                if (onah.onahOz_start){
                    events.push({
                        id: `${onah.period_id}-${onah.type}-OZ`,
                        title: `${onahOz_Icon} ${onah.type}-OZ`,
                        start: onah.onahOz_start,
                        groupID: onah.period_id,
                        className: 'onah',
                        allDay: false,
                    })
                }
                return events
                
            })
            console.log('onahEvents', onahEvents);
            
            setEvents([...periodEvents as ICalendarEvent[], ...onahEvents as ICalendarEvent[]]);
        }

        fetchEvents();
    }, [refetchFlag]);

    return events
}

export default useLoadEvents