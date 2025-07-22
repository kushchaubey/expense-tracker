import style from "./PrimaryModel.module.scss";
import { FaWindowClose } from "react-icons/fa";

const PrimaryModel = ({children,setModel, modelStatus})=>{

  
    function closeOnBackdrop(e) {
  if (e.target.classList.contains(style.backdrop)) {
    setModel(false);
  }
}

    function closeModelHandler(){
   
             setModel(false)
    }
    
     return(


        <div className={`${style.backdrop} ${modelStatus && style.active}`} onClick={closeOnBackdrop}>

                <div className={style.modelContainer}>
                
                     {children}

                  <div className={style.modelCancelButton} onClick={closeModelHandler}>

                 <FaWindowClose />


                  </div>
                </div>

        </div>
     )

}

export default PrimaryModel;