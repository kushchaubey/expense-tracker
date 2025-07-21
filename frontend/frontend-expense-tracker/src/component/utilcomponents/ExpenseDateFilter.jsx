import style from './ExpenseDateFilter.module.scss'

import DateInput from './DateInput';
import { useState } from 'react';

const ExpenseDateFilter = ({handleDate})=>{


  const [dateValue, setDateValue]  = useState({

    startDate:'',
    endDate:'',
  });
  const [errs, setErrs]  = useState({});



  const handleDateOnChange = (event)=>{

    const inputValue  = event.target.value;
    const inputName  = event.target.name;

          setDateValue((prev)=>{return{
                    ...prev,
                    
                    [inputName]:inputValue,}
          });
         
          
          
        setErrs({}); // Clear errors on input change

          
  }


  const handleFilterSubmit =()=>{

const errorObj = {};
          
           

          if(!dateValue.startDate) errorObj.startDate = "please select the start date";
          
          if(!dateValue.endDate) errorObj.endDate = "please select the end date";


      if (dateValue.startDate && dateValue.endDate && new Date(dateValue.startDate) > new Date(dateValue.endDate)) {
            errorObj.endDate = "End date must be after start date.";
        }


          if(errorObj.startDate || errorObj.endDate){
            setErrs(errorObj);
          }else{
            handleDate(dateValue);
          }

  }

       
    return(

        <div className={style.expenseFilterContainer}>


        <div className={style.formGroup}>
        <label htmlFor="startDate">Start Date:</label>
             <DateInput 
             name={'startDate'} 
             id={'startDate'} 
             handleDate={handleDateOnChange}
             value={dateValue.startDate}
             errors={errs.startDate}

             
             
             >
             </DateInput>

        </div>
        

        <div className={style.formGroup}>
        
        <label htmlFor="endDate">End Date:</label>

             <DateInput
        

             name={'endDate'} 
             id={'endDate'}
             handleDate={handleDateOnChange}
             value={dateValue.endDate}
             errors={errs.endDate} 
             >

             </DateInput>


        </div>

      <button type='button' className={style.filterButton} onClick={handleFilterSubmit}>Filter</button>

        </div>
    );

}

export default ExpenseDateFilter;