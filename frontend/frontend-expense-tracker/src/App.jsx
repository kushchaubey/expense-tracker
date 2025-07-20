
import { useState } from 'react'
import './App.css'

import ClientLayout from './component/Client/ClientLayout.JSX'
import ExpensePage from './component/Client/ExpensePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  const [switchModeClass, setSwitchModeClass] =  useState('');

  function handleModeSwitcher(){
    
          if(switchModeClass=="dark"){
             setSwitchModeClass('')
          }else{
            setSwitchModeClass("dark");
          }
   
  }


const router = createBrowserRouter([

    {
       path:"/",
       element:<div className={`topContainer ${switchModeClass}`}> <ClientLayout handleModeSwitcher = {handleModeSwitcher}/></div>,
       children:[

      {
         path:"/",
         element:<ExpensePage/>
      },
         
      {
         path:"/add-expense",
         element:<h1>Add expense page</h1>
      }

    
      
      
      
      ]
    },
    {
       path:"/admin",
       element: <h1>hello world</h1>,
    }

]);

 return <RouterProvider router={router}/>

}

export default App  
