import { Flex } from "@mantine/core";
import { Outlet } from "react-router-dom";


export function Layout() {

    return (
      <>
        <Flex direction='column' mih='100vh'>
          
            {/* <Header /> */}
            
            <main style={{flex: 1, margin: 0, }}>
            <Outlet />
            </main>
            
            {/* <Footer/> */}

        </Flex>
      </>
    );
  }