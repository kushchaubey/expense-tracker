
import style from './ModeSwitcher.module.scss'
const ModeSwitcher = ({handleModeSwitcher})=>{

    
    return(

        <div className={style.modeSwitcherContainer}>
            <div className={style.swithBox}>
                <input type="checkbox" onChange={handleModeSwitcher}/>
                <span className={style.rounded }></span>
            </div>
        </div>
    )

}

export default ModeSwitcher;