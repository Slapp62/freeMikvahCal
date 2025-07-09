import {
  Box, Burger, Button, Divider, Drawer, Flex, Text, Group, ScrollArea,
  useMantineColorScheme,
  ActionIcon,
  Image,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './Header.module.css';
import { LightDarkToggle } from './LightDarkToggle'
//import { Logo } from './Logo';
import clsx from 'clsx';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import useStore from '../../Zstore.ts';
import { IconSettings } from '@tabler/icons-react';

  
  export function Header() {
    const logo = '../../../public/logo-v1.png';
    const session = useStore((state) => state.session);
    const clearSession = useStore((state) => state.clearSession);
    const jumpTo = useNavigate();
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const { colorScheme } = useMantineColorScheme();
  
    const logoutHandler = async () => {
        const { error } = await supabase.auth.signOut()
        if (!error) {
           clearSession();
        } else {
            console.error('Logout error:', error)
        }
        jumpTo('/');
    }
    

    return (
      <Box className={clsx(classes.navbarTop)}>
        <header className={clsx(colorScheme === 'light' ? classes.navbarLight : classes.navbarDark, classes.header)}>
        <Flex justify="space-between" align="center" h='100%' py={10} w='85%' mx='auto'>
            
            <Group visibleFrom="md" gap={5} align='flex-end'>
            <Image src={logo} alt="Logo" w={150} style={{objectFit: 'fill'}}/>
              <Link  to="/" className={classes.link}>
                <Text fw={700}>Home</Text>
              </Link>

              <Link to="/about" className={classes.link} >
                <Text fw={700}>About</Text>
              </Link>

              {session && (
              <Link to="/calendar" className={classes.link} >
                <Text fw={700}>Calendar</Text>
              </Link>)}
            </Group>

            <Group>
              <Group visibleFrom="xs">
                {!session && ( <>
                <Button component={Link} to='/login' variant="outline">Login</Button>
                <Button component={Link} to='/register'>Sign Up</Button>
                </>)}

                {session && <Button variant="outline" onClick={logoutHandler}>Logout</Button>}
              </Group>

              <Group >
                <ActionIcon variant='default' size={35}>
                    <IconSettings/>
                </ActionIcon>
                <LightDarkToggle />
                <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="md" />
              </Group>
              
            </Group>
            
          </Flex>
        </header>
  
        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          size="60%"
          padding="md"
          title="TheFreeMikvahCal"
          hiddenFrom="md"
          zIndex={1000000}
        >
        <ScrollArea h="calc(100vh - 80px" mx="-sm" >
            <Divider/>
                <Flex direction="column" my={20}>
                    <Link to="/" className={classes.link} onClick={closeDrawer}>
                        <Text fz={15} c='indigo' fw={700}>HOME</Text>
                    </Link>

                    <Link to="/about" className={classes.link} onClick={closeDrawer}>
                        <Text fz={15}  c='indigo' fw={700}>ABOUT</Text>
                    </Link>
                </Flex>
            <Divider my="md" />

            <Flex justify="space-evenly" ta="center" p="sm" gap={5} direction="column">
              
                {!session && (<>
                    <Button component={Link} to='/login' onClick={closeDrawer} w="95%" variant="outline">Login</Button>
                    <Button  component={Link} to='/register' onClick={closeDrawer} w="95%">Register</Button>
                </>)}
              
                {session && (
                <Button variant="outline" onClick={() => {
                    logoutHandler(); 
                    closeDrawer()}}
                > Logout </Button>)}
            </Flex>
          </ScrollArea>
        </Drawer>
      </Box>
    
    );
  }