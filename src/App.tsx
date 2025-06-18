import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Notifications } from '@mantine/notifications';
import { theme } from "./theme";
import { AppRouter } from "./routing/AppRouter";


export default function App() {
  return (
    <MantineProvider theme={theme}>
        <Notifications/>
        <AppRouter/>
    </MantineProvider>    
  );
}
