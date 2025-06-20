import { Button, Select, Stack, Textarea } from "@mantine/core"
import { supabase } from "../lib/supabaseClient"
import { notifications } from "@mantine/notifications"
import { Controller, useForm } from "react-hook-form"
import useZStore from "../Zstore.ts"

type PeriodEventValues = {
    eventType?: 'start_date' | 'hefsek_date';
    onah?: 'day' | 'night';
    notes?: string;
}

const PeriodEventForm = ({selectedDate, close} : {selectedDate: string | null, close: () => void}) => {
    const addEvent = useZStore((state) => state.addEvent);
    const { register, handleSubmit, watch, control, formState: { errors } } = useForm<PeriodEventValues>(); 
    const eventType = watch('eventType')
    const onSubmit = async (formData : PeriodEventValues) => {
        try {
            if (formData.eventType === 'start_date') {
                // check if user already created a period for it
                const { data : check1, error : checkError1 } = await supabase
                .from("periods")
                .select('id')
                .lt('start_date', selectedDate)
                .is('hefsek_date', null)
                .limit(1)
                if (checkError1) {console.log(checkError1)};
                    
                if (check1) {
                    notifications.show({
                        title: 'Error',
                        message: 'A period beginning as already been entered',
                        color: 'red',
                    });
                    close();
                    return
                }

                //if the period is new, check if hefsek already exists and user is changing period start date
                const { data : _check2, error : checkError2 } = await supabase
                    .from("periods")
                    .select('id')
                    .gt('hefsek_date', selectedDate)
                    .order('hefsek_date', { ascending: true })
                    .limit(1)
                if (checkError2) {return console.log(checkError2)};
                
                if (_check2){
                    // get period id for alrady exisiting hefsek and insert new period start data
                }

                const { data : newPeriodData, error } = await supabase.from("periods").insert({
                    start_date: selectedDate ,
                    onah: formData.onah,
                    notes: formData.notes
                }); 
                console.log(newPeriodData);
                if (error) return console.log(error);

                const {data, error : fetchError} = await supabase
                    .from("periods")
                    .select('id')
                    .eq('start_date', selectedDate);
                console.log(data);
                
                if (fetchError) return console.log(fetchError);
                
                const newPeriodID = data?.[0].id;

                const startEvent = {
                    id: `${newPeriodID}-start`,
                    title: 'Period Start',
                    start: selectedDate,
                    groupID: newPeriodID,
                }
                addEvent(startEvent);
                useZStore.getState().toggleRefetchFlag();
            }

            if (formData.eventType === 'hefsek_date'){
                
                const {data, error : fetchError} = await supabase
                    .from("periods")
                    .select('id')
                    .lt('start_date', selectedDate)
                    .order('start_date', { ascending: false })
                    .limit(1);
                console.log(data);
                
                if (fetchError) return console.log(fetchError);
                
                const previousPeriodID = data?.[0].id;
                if (!previousPeriodID) return console.log('No previous period found.');

                const { data : updatedData, error : updateError } = await supabase
                    .from("periods")
                    .update({hefsek_date: selectedDate})
                    .eq('id', previousPeriodID);
                if (updateError) return console.log(updateError);
                console.log(updatedData);

                const hefsekEvent = {
                    id: `${previousPeriodID}-hefsek`,
                    title: 'Hefsek Taharah',
                    start: selectedDate,
                    groupID: previousPeriodID
                }
                addEvent(hefsekEvent);
                useZStore.getState().toggleRefetchFlag();
            }

            notifications.show({
                title: 'Event added successfully',
                message: 'The event has been added to the database.',
                color: 'green',
            });
            close();

        } catch (error : any){
            console.log('Form Errors:', errors);
            console.error('Error updating database:', error);
            notifications.show({
                title: 'Error adding event',
                message: error.message,
                color: 'red',
            });
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <Stack align='center' justify='center' w='90%' mx='auto'>
            <Controller
                name="eventType"
                control={control}
                render={({ field }) => (
                    <Select 
                        label="Type of Event" 
                        placeholder="Select a type" 
                        data={[
                            {value: 'start_date', label: 'Period Start'},
                            {value: 'hefsek_date', label: 'Hefsek Taharah'},
                        ]} 
                        {...field}
                        value={field.value ?? null}
                        onChange={field.onChange}
                    />
                )}
            />

            <Controller
                name="onah"
                control={control}
                render={({ field }) => (
                    <Select 
                        label="Time" 
                        placeholder="Select a time"
                        disabled={eventType === 'hefsek_date' ? true : false} 
                        data={[
                            {value: 'day', label: 'Before Sunset'},
                            {value: 'night', label: 'After Sunset'},
                        ]} 
                        {...field}
                        value={field.value ?? null}
                        onChange={field.onChange}
                    />
                )}
            />
            
            <Textarea 
                label="Notes" 
                placeholder="Enter any notes" 
                disabled={eventType === 'hefsek_date' ? true : false} 
                w='100%'
                mb={10}
                {...register('notes')}
            />

            <Button
                type='submit'
                color='pink'
                fullWidth
            > Add </Button>

        </Stack>
        </form>
    )
}

export default PeriodEventForm