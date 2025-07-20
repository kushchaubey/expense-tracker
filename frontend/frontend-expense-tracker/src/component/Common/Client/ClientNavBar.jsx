import { NavLink } from 'react-router-dom';
import style from './ClientNavBar.module.scss'
import {useLocation  } from 'react-router-dom';

const ClientNavBar = ()=>{
 
    const location = useLocation();
    
    return (
 
        <nav className={style.nav}>
            <ul>
                <li><NavLink  to="/" className={({ isActive }) => isActive ? style.active : ''}>Expenses </NavLink></li>
                <li><NavLink  to="/add-expense" className={({ isActive }) => isActive ? style.active : ''} >Add Expense </NavLink></li>
            </ul>
        </nav>

    )
}

export default ClientNavBar;