import style from './ExpensePage.module.scss'

import ExpenseDateFilter from '../utilcomponents/ExpenseDateFilter';
import DataTableComponent from '../utilcomponents/DataTableComponent';
import { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; // for icons
import {getdataBasedOnURL} from '../../Utils/FetchingUtil';
import ActionButton from '../utilcomponents/Buttons/ActionButton';
import ButtonComponent from '../utilcomponents/Buttons/ButtonComponent';
import PrimaryModel from '../utilcomponents/Models/PrimaryModel';
import AddUpdateForm from '../utilcomponents/Forms/AddUpdateForm';

const ExpensePage =()=>{

     const [expenses, setExpenses]  = useState([]);
     const [loading, setloading]  = useState(true)
     const [modelActive, setmodelActive]  = useState(false)


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
        <ActionButton onClick={() => handleEdit(row)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#3B82F6' }}>
          <FaEdit />
        </ActionButton>
        <ActionButton onClick={() => handleDelete(row)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'red' }}>
          <FaTrash />
        </ActionButton>
      </div>
    ),
    ignoreRowClick: true,
    button: true,
  }
];

    useEffect(()=>{
      getdataBasedOnURL("http://localhost:3000/api/expenses/today",setExpenses,setloading)
    },[])




 function  getDatesfromFilter(dates){
       getdataBasedOnURL(`http://localhost:3000/api/expenses/date?start=${dates.startDate}&end=${dates.endDate}`,setExpenses,setloading)
      }

function AddExpense(){
  
     setmodelActive(true)
    

}
    return(

        <div className='mainContainer'>
            <div className={style.heading}>
                    <h1 >Expense page</h1>
                <ExpenseDateFilter handleDate={getDatesfromFilter}/>
                 <ButtonComponent handleClick={AddExpense}>Add Expense</ButtonComponent>
                  <PrimaryModel setModel={setmodelActive} modelStatus={modelActive}>   <AddUpdateForm formName={'Add Expense'} /></PrimaryModel>
                <DataTableComponent columns={columns} data={expenses} loading={loading}/>
            </div>
        </div>
    )
  
}

export default ExpensePage;