import { Flex } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Navigation/Header";
import { Footer } from "../components/Navigation/Footer";
import { useSupabaseAuth } from "../hooks/useSupabaseAuth";


export function Layout() {
    useSupabaseAuth();
    
    return (
      <>
        <Flex direction='column' mih='100vh'>
          
            <Header />
            
            <main style={{flex: 1, margin: 0, }}>
            <Outlet />
            </main>
            
            <Footer/>

        </Flex>
      </>
    );
  }