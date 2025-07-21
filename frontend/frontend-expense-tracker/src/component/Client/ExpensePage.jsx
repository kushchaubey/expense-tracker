import style from './ExpensePage.module.scss'

import ExpenseDateFilter from '../utilcomponents/ExpenseDateFilter';
import DataTableComponent from '../utilcomponents/DataTableComponent';
import { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; // for icons
import {getdataBasedOnURL} from '../../Utils/FetchingUtil';

const ExpensePage =()=>{

     const [expenses, setExpenses]  = useState([])

     function handleEdit(row){
             console.log(row.id);
     }
    function handleDelete(row){
             console.log(row.id);
     }
      
const columns = [
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
    {
    name: 'Actions',
    cell: row => (
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={() => handleEdit(row)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#3B82F6' }}>
          <FaEdit />
        </button>
        <button onClick={() => handleDelete(row)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'red' }}>
          <FaTrash />
        </button>
      </div>
    ),
    ignoreRowClick: true,
    button: true,
  }
];

    useEffect(()=>{


        // axios.get("http://localhost:3000/api/expenses/today")
        //     .then((res)=>{
               
        //         setExpenses(res.data.data)
        //     })
        //     .catch((err)=>{
        //         console.log(err)
        //     })

    getdataBasedOnURL("http://localhost:3000/api/expenses/today",setExpenses)


    },[])




 function  getDatesfromFilter(dates){
        
        //  axios.get(`http://localhost:3000/api/expenses/date?start=${dates.startDate}&end=${dates.endDate}`)
        //     .then((res)=>{
              
        //         setExpenses(res.data.data)
        //     })
        //     .catch((err)=>{
        //         console.log(err)
        //     })
        

                   getdataBasedOnURL(`http://localhost:3000/api/expenses/date?start=${dates.startDate}&end=${dates.endDate}`,setExpenses)

    }
    return(

        <div className='mainContainer'>


            <div className={style.heading}>
                    <h1 >Expense page</h1>
                  
                <ExpenseDateFilter handleDate={getDatesfromFilter}/>

                <DataTableComponent columns={columns} data={expenses}/>
            </div>
              



    


        </div>
    )
}

export default ExpensePage;