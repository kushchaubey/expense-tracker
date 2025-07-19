

import Header from "../Common/Header";
import ClientNavBar from "../Common/ClientNavBar";
import ModeSwitcher from "../Common/ModeSwitcher";


const ClientLayout = ({handleModeSwitcher})=>{


    return(
       
        <Header>
           <ClientNavBar/>
           <ModeSwitcher handleModeSwitcher ={handleModeSwitcher}/>
        </Header>

    )
}


export default ClientLayout;