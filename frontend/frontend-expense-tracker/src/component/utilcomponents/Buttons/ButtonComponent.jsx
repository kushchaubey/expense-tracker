import style from './ButtonComponent.module.scss';


const ButtonComponent = ({children,handleClick})=>{
 
    return(

        <button className={style.buttonComponent} onClick={handleClick}>
                 {children}
        </button>
    )

}


export default ButtonComponent