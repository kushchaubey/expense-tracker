import style from './ExpensePage.module.scss'
import axios from 'axios';

import ExpenseDateFilter from '../utilcomponents/ExpenseDateFilter';
import { useEffect, useState } from 'react';

const ExpensePage =()=>{

     const [expenses, setExpenses]  = useState([])

    useEffect(()=>{


        axios.get("http://localhost:3000/api/expenses/today")
            .then((res)=>{
                console.log(res.data.data);
                setExpenses[res.data.data]
            })
            .catch((err)=>{
                console.log(err)
            })




    },[])




 function  getDatesfromFilter(dates){
        console.log(dates);
    }
    return(

        <div className='mainContainer'>


            <div className={style.heading}>
                    <h1 >Expense page</h1>
                  
                <ExpenseDateFilter handleDate={getDatesfromFilter}/>
                

            </div>
              



    


        </div>
    )
}

export default ExpensePage;