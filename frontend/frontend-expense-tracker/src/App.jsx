
import { useState } from 'react'
import './App.css'

import ClientLayout from './component/Client/ClientLayout.JSX'
import MainPage from './component/Client/MainPage';


import { createBrowserRouter, RouterProvider } from 'react-router-dom';


const Expense = [
	{
		name: 'Title',
		selector: row => row.itemName,
		sortable: true,
	},
    {
		name: 'Cost',
		selector: row => row.cost,
		sortable: true,
	},
    {
		name: 'Category',
		selector: row => row['category.categoryName'],
		sortable: true,
	},
       {
		name: 'User',
		selector: row => row['user.userName'],
		sortable: true,
	},
	{
		name: 'Date',
		selector: row => row.onlyDate,
		sortable: true,
	},
   
];
const users = [
	{
		name: 'User',
		selector: row => row.userName,
		sortable: true,
	}
    
   
];
const category = [
	{
		name: 'category',
		selector: row => row.categoryName,
		sortable: true,
	}
    
   
];

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
         element:<MainPage pageName="Expense Page" dataURL="http://localhost:3000/api/expenses/today" columns={Expense}/>
      },
         

      {
         path:"/categories",
         element:<MainPage pageName="Categories Page" dataURL="http://localhost:3000/api/categories" columns={category} formType="category" updateURL='http://localhost:3000/api/categories/'/>
      },

        {
         path:"/analytics",
         element:<h1>Analytics page</h1>
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
