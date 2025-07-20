import style from './ExpensePage.module.scss'

import DateInput from '../utilcomponents/DateInput';

const ExpensePage =()=>{


    function getDate(event){

        if(!event.target.value){
            console.log("error ")
        }else{
            var parseDated = new Date(event.target.value);
            console.log(parseDated.getFullYear());
        }
        
    }
    return(

        <div className='mainContainer'>


            <div className={style.heading}>
                    <h1 >Expense page</h1>
                  
                  <DateInput handleDate={getDate}></DateInput>
                       <DateInput ></DateInput>


            </div>
              



    


        </div>
    )
}

export default ExpensePage;