import style from './ButtonComponent.module.scss';


const ButtonComponent = ({children,handleClick,buttonDisabled})=>{
 
    return(

        <button className={style.buttonComponent} onClick={handleClick} disabled={buttonDisabled}>
                 {children}
        </button>
    )

}


export default ButtonComponent