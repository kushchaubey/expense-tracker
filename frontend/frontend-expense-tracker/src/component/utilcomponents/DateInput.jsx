
import style from './DateInput.module.scss'

const DateInput = ({name,id,value,handleDate})=>{
  return(

    <div className={style.dateButton}>
    
       <input type="date" name={name} id={id} value={value} onChange={handleDate}/>

    </div>
 )
    
    
}

export default DateInput;