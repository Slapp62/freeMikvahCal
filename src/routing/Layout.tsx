import { Flex } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Navigation/Header";
import { Footer } from "../components/Navigation/Footer";
import { useSupabaseAuth } from "../hooks/useSupabaseAuth";
import classes from './Layout.module.css'


export function Layout() {
    useSupabaseAuth();
    
    return (
      <>
        <Flex direction='column' mih='100vh' className={classes.wrapper}>
          
            <Header />
            
            <main style={{flex: 1, margin: 0}}>
            <Outlet />
            </main>
            
            <Footer/>

        </Flex>
      </>
    );
  }