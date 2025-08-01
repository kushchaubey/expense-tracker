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
import DeleteExpense from '../utilcomponents/Forms/DeleteExpense';

import { ToastContainer } from 'react-toastify';

const ExpensePage =()=>{

     const [expenses, setExpenses]  = useState([]);
     const [loading, setloading]  = useState(true)
     const [modelActive, setmodelActive]  = useState(false)
     const [formName, setFormName]  = useState('')
     const [formID, setFormID]  = useState(null)
     const [itemName, setItemName]  = useState(null)

     const [deleteModel, setDelatemodelActive]  = useState(false)

    function AddExpense(){
        
          setFormName('Add');
          setmodelActive(true);
          

      }
     function handleEdit(row){
            
            
          setFormName('Update');  
          setFormID(row.id)
          setmodelActive(true)

     }
    function handleDelete(row){
      console.log(row)
      setFormID(row.id);   
      setItemName(row.itemName)  
      setDelatemodelActive(true);
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
        <ActionButton onClick={() => handleEdit(row)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#3B82F6' }} >
          <FaEdit />
        </ActionButton>
        <ActionButton onClick={() => handleDelete(row)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'red' }}>
          <FaTrash />
        </ActionButton>
      </div>
    ),
    ignoreRowClick: true,
   // button: true,
  }
];

    useEffect(()=>{
      fetchExpense();
    },[])


  function fetchExpense(){
      getdataBasedOnURL("http://localhost:3000/api/expenses/today",setExpenses,setloading)

  }


 function  getDatesfromFilter(dates){
       getdataBasedOnURL(`http://localhost:3000/api/expenses/date?start=${dates.startDate}&end=${dates.endDate}`,setExpenses,setloading)
}




    return(
     <>
      <ToastContainer
      
       position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      
      
      />

        <div className='mainContainer'>
            <div className={style.heading}>
                    <h1 >Expense page</h1>
                <ExpenseDateFilter handleDate={getDatesfromFilter}/>
                 <ButtonComponent handleClick={AddExpense} >Add Expense</ButtonComponent>
                  <PrimaryModel setModel={setmodelActive} modelStatus={modelActive}>   <AddUpdateForm formName={formName} id={formID} fetchExpense={fetchExpense} setmodelActive={setmodelActive}/></PrimaryModel>
                <DataTableComponent columns={columns} data={expenses} loading={loading} />

                   <PrimaryModel setModel={setDelatemodelActive} modelStatus={deleteModel}>  <DeleteExpense formID={formID} expensesName={itemName} fetchExpense={fetchExpense} dataURL={'http://localhost:3000/api/expenses/delete/'} setmodelActive={setDelatemodelActive}/> </PrimaryModel>

            </div>
        </div>

        </>
    )
  
}

export default ExpensePage;