import style from './ActionButton.module.scss';

const ActionButton =({children,...props})=>{
   
    return(
        <button className={style.actionButton} {...props}>
            {children}
        </button>
    )
}

export default ActionButton

