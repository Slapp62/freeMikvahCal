import { Stack, Title, Text, Button } from "@mantine/core";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <Stack mx='auto' mt={20} align='center' justify='center' w={500} >
            <Title order={1} c='pink'>The Free Mikvah Calendar</Title>
            <Title order={2} c='purple'>Making family purity easy for everyone</Title>
            <Text fw={500} c='purple'>Sign up now and start your own calendar</Text>
            <Button component={Link} to='/register' size="lg">Sign Up</Button>
        </Stack>
    );
};

export default HomePage