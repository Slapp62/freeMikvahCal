import { Button, Select, Stack, Textarea } from "@mantine/core"
import { supabase } from "../lib/supabaseClient"
import { notifications } from "@mantine/notifications"
import { Controller, useForm } from "react-hook-form"

type PeriodEventValues = {
    eventType?: 'start_date' | 'hefsek_date';
    onah?: 'day' | 'night';
    notes?: string;
}

const PeriodEventForm = ({selectedDate, close} : {selectedDate: string | null, close: () => void}) => {

    const { register, handleSubmit, watch, control, formState: { errors } } = useForm<PeriodEventValues>(); 
    const eventType = watch('eventType')
    const onSubmit = async (formData : PeriodEventValues) => {
        try {
            if (formData.eventType === 'start_date') {
                const { data,error } = await supabase.from("periods").insert({
                    start_date: selectedDate ,
                    onah: formData.onah,
                    notes: formData.notes
                }); 
                console.log(data);
                if (error) return console.log(error);
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