import { NavLink } from 'react-router-dom';
import style from './ClientNavBar.module.scss'
import {useLocation  } from 'react-router-dom';

const ClientNavBar = ()=>{
 
    const location = useLocation();
    
    return (
 
        <nav className={style.nav}>
            <ul>
                <li><NavLink  to="/" className={({ isActive }) => isActive ? style.active : ''}>Expenses </NavLink></li>
                <li><NavLink  to="/users" className={({ isActive }) => isActive ? style.active : ''} >Users </NavLink></li>
                <li><NavLink  to="/categories" className={({ isActive }) => isActive ? style.active : ''} >Categories </NavLink></li>
                <li><NavLink  to="/analytics" className={({ isActive }) => isActive ? style.active : ''} >Analytics </NavLink></li>

            </ul>
        </nav>

    )
}

export default ClientNavBar;