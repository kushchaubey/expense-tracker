
import style from './DateInput.module.scss'

const DateInput = ({name,id,value,errors,handleDate})=>{
  return(

    <div className={style.dateButton}>
    
       <input type="date" name={name} id={id} value={value} onChange={handleDate}/>
        <div className={style.error}>{errors}</div>
    </div>
 )
    
    
}

export default DateInput;