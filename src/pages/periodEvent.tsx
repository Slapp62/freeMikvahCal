import { Button, Select, Stack, Textarea } from "@mantine/core"

const PeriodEvent = () => {
    return (
        <form>
            <Stack align='center' justify='center' w='90%' mx='auto'>
                <Select 
                    label="Type of Event" 
                    placeholder="Select a type" 
                    data={['Period Start', 'Period End (Hefsek Taharah)']} 
                />

                <Select 
                    label="Day or Night" 
                    placeholder="Select a time" 
                    data={['Day', 'Night']} 
                />
                
                <Textarea 
                    label="Notes" 
                    placeholder="Enter notes" 
                    w='100%'
                    mb={10}
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

export default PeriodEvent