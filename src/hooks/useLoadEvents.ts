import { useEffect } from "react";
import { supabase } from "../lib/supabaseClient.ts";
import useZStore from "../Zstore.ts";

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
                return events
            })

            const onahEvents = onahs.flatMap((onah) => {
                const events = [];

                if (onah.type === 'beinonit_30') {
                    events.push({
                        id: `${onah.period_id}-beinonit_30`,
                        title: `Onah Beinonit`,
                        start: onah.onah_date,
                        groupID: onah.period_id,
                        className: 'onah',
                    })
                };

                if (onah.type === 'haflagah') {
                    events.push({
                        id: `${onah.period_id}-haflagah`,
                        title: `Onah Haflagah`,
                        start: onah.onah_date,
                        groupID: onah.period_id,
                        className: 'onah',
                    })
                };

                if (onah.type === 'hachodesh') {
                    events.push({
                        id: `${onah.period_id}-hachodesh`,
                        title: `Onah Hachodesh`,
                        start: onah.onah_date,
                        groupID: onah.period_id,
                        className: 'onah',
                    })
                };

                return events
            })
            setEvents([...periodEvents, ...onahEvents])
        }

        fetchEvents();
    }, [refetchFlag]);

    return events
}

export default useLoadEvents