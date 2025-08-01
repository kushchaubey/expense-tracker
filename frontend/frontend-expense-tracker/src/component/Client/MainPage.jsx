import style from './Mainpage.module.scss'

import ExpenseDateFilter from '../utilcomponents/ExpenseDateFilter';
import DataTableComponent from '../utilcomponents/DataTableComponent';
import { useEffect, useState } from 'react';
import {getdataBasedOnURL} from '../../Utils/FetchingUtil';
import ButtonComponent from '../utilcomponents/Buttons/ButtonComponent';
import PrimaryModel from '../utilcomponents/Models/PrimaryModel';
import AddUpdateForm from '../utilcomponents/Forms/AddUpdateForm';
import DeleteExpense from '../utilcomponents/Forms/DeleteExpense';
import { FaEdit, FaTrash } from 'react-icons/fa'; // for icons
import ActionButton from '../utilcomponents/Buttons/ActionButton';
import { ToastContainer } from 'react-toastify';

const ExpensePage =({dataURL,pageName,dataURLDate, columns})=>{

     const [expenses, setExpenses]  = useState([]);
     const [loading, setloading]  = useState(true)
     const [modelActive, setmodelActive]  = useState(false)
     const [formName, setFormName]  = useState('')
     const [formID, setFormID]  = useState(null)
     const [itemName, setItemName]  = useState(null)

     const [deleteModel, setDelatemodelActive]  = useState(false)

     const actionButtons =  {
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


const columnsWithActions = [...columns, actionButtons];

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
      const name = row.itemName || row.userName || row.categoryName
      console.log(row)
      setFormID(row.id);   
      setItemName(name)  
      setDelatemodelActive(true);
     }

    useEffect(()=>{
      fetchExpense();
    },[expenses])


  function fetchExpense(){
      getdataBasedOnURL(dataURL,setExpenses,setloading)

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
                    <h1 >{pageName}</h1>
                {pageName=="Expense Page" && <ExpenseDateFilter handleDate={getDatesfromFilter}/>}
                 <ButtonComponent handleClick={AddExpense} >Add {pageName.split(" ")[0]}</ButtonComponent>
                  <PrimaryModel setModel={setmodelActive} modelStatus={modelActive}>   <AddUpdateForm formName={formName} id={formID} fetchExpense={fetchExpense} setmodelActive={setmodelActive}/></PrimaryModel>
                <DataTableComponent columns={columnsWithActions} data={expenses} loading={loading} />

                   <PrimaryModel setModel={setDelatemodelActive} modelStatus={deleteModel}>  <DeleteExpense formID={formID} expensesName={itemName} fetchExpense={fetchExpense} dataURL={'http://localhost:3000/api/expenses/delete/'} setmodelActive={setDelatemodelActive}/> </PrimaryModel>

            </div>
        </div>

        </>
    )
  
}

export default ExpensePage;