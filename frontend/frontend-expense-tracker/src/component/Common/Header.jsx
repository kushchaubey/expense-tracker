import styles from './Header.module.scss';


const Header = ({children})=>{

    return (

        <header className={styles.header}>
            <div className={styles.logo}>Expense-tracker</div>
           {children}
        </header>
    )
}

export default Header;