import { Link } from 'react-router-dom';
import style from './ClientNavBar.module.scss'


const ClientNavBar = ()=>{

    return (
 
        <nav className={style.nav}>
            <ul>
                <li><Link to="/">Expenses </Link></li>
                <li><Link to="/">Add Expense </Link></li>
            </ul>
        </nav>

    )
}

export default ClientNavBar;