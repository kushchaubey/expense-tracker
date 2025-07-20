

import Header from "../Common/Header";
import ClientNavBar from "../Common/Client/ClientNavBar";
import ModeSwitcher from "../Common/ModeSwitcher";
import { Outlet } from "react-router-dom";


const ClientLayout = ({handleModeSwitcher})=>{


    return(
       <>
        <Header>
           <ClientNavBar/>
           <ModeSwitcher handleModeSwitcher ={handleModeSwitcher}/>
        </Header>

        <Outlet/>
        </>
    )
}


export default ClientLayout;