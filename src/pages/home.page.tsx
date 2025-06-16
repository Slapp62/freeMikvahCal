import { Button, Title } from "@mantine/core";
import { Link } from "react-router-dom";

const HomePage = () => {
    return <>
        <Title>Home</Title>
        <Button component={Link} to="/login">Login</Button>    
        <Button component={Link} to="/register">Register</Button>
        <Button component={Link} to="/calendar">Calendar</Button>
    </>
};

export default HomePage