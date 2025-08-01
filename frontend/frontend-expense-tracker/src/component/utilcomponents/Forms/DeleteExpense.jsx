import axios from 'axios';
import ButtonComponent from '../Buttons/ButtonComponent';
import style from './DeleteExpense.module.scss';
import { toast } from 'react-toastify';


const DeleteExpense = ({formID, expensesName,dataURL,setmodelActive,fetchExpense})=>{

    
    function handleDelete(){
      console.log(dataURL+formID)
          axios.delete(dataURL+formID)
          .then((result)=>{
            if(result.data.statusText=="success"){
                toast.success(result.data.message)
                setmodelActive(false);       
                fetchExpense();    
            }else{
                
              setmodelActive(false); 
              toast.success(result.data.message||"Not deleted")  
            }
          })
          .catch((err)=>{
            console.log(err);
            toast.error("something went wrong!")
          })
    }
  function handleCancel(){

        setmodelActive(false)
        console.log("handleCancel")
    }
    return(
        <div>

            <h1>Delete {expensesName}</h1>
            <div className={style.deleteActions}>
               <ButtonComponent handleClick={handleDelete}>Delete</ButtonComponent>
               <ButtonComponent handleClick={handleCancel}>Cancel</ButtonComponent>
            </div>
            
        </div>
    )
}

export default DeleteExpense