import style from './ExpensePage.module.scss'

import ExpenseDateFilter from '../utilcomponents/ExpenseDateFilter';

const ExpensePage =()=>{


    return(

        <div className='mainContainer'>


            <div className={style.heading}>
                    <h1 >Expense page</h1>
                  
                <ExpenseDateFilter/>


            </div>
              



    


        </div>
    )
}

export default ExpensePage;