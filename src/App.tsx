import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Notifications } from '@mantine/notifications';
import { theme } from "./theme";
import { AppRouter } from "./routing/AppRouter";
import { AuthProvider } from "./context/AuthProvider";


export default function App() {
  return (
    <AuthProvider>
        <MantineProvider theme={theme}>
            <Notifications/>
            <AppRouter/>
        </MantineProvider> 
    </AuthProvider>);
}
