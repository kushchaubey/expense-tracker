import style from './ExpenseDateFilter.module.scss'

import DateInput from './DateInput';

const ExpenseDateFilter = ()=>{

     function getDate(event){
    
            if(!event.target.value){
                console.log("error ")
            }else{
                var parseDated = new Date(event.target.value);
                console.log(parseDated.getFullYear());
            }
            
        }
       
    return(

        <div className={style.expenseFilterContainer}>


        <div className={style.formGroup}>
        <label htmlFor="startDate">Start Date:</label>
             <DateInput 
             name={'startDate'} 
             id={'startDate'} 
             handleDate={getDate}>
            
             </DateInput>
        </div>
        
        <div className={style.formGroup}>

        <label htmlFor="endDate">End Date:</label>

             <DateInput
        

             name={'endDate'} 
             id={'endDate'} 
             handleDate={getDate}>

             </DateInput>
        </div>

      <button type='button' className={style.filterButton}>Filter</button>

        </div>
    );

}

export default ExpenseDateFilter;