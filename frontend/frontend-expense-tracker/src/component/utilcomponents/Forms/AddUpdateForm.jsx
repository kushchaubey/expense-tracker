import style from './AddUpdateForm.module.scss';
import ButtonComponent from '../Buttons/ButtonComponent';

const AddUpdateForm = ({formName})=>{

     
     return(

        <div className={style.formConatainer}>
                  <h3>{formName}</h3>
             <form onSubmit=''>

              <div className={style.formGroup}>
                <label htmlFor="itemName">Item Name</label>
                <input type="text" id="itemName" name='itemName' placeholder='Item Name' value=''/>
                <div className={style.error}>error</div>
              </div>
              <div className={style.formGroup}>
                <label htmlFor="cost">Cost</label>
                <input type="number" id="cost" name='cost' placeholder='cost' value=''/>
                 <div className={style.error}>error</div>
              </div>
              <div className={style.formGroup}>
                 <label htmlFor="categories">Category</label>
                 <select  id="categories" name='categories' placeholder='categories'>
                    <option value=''>hello</option>
                 </select>
                  <div className={style.error}>error</div>
               
              </div>
              <div className={style.formGroup}>
                 <label htmlFor="users">User</label>
                 <select  id="users" name='users' placeholder='users'>
                    <option value=''>world</option>
                 </select>
                <div className={style.error}>error</div>
              </div>
                
                <div className={style.formGroup}>
                 <label htmlFor="Date">Date</label>
               <input type="date" id="date" name='date' placeholder='date' value=''/>

               <div className={style.error}>error</div>
             </div>
              <div className={style.formGroup}>
                <ButtonComponent>{formName}</ButtonComponent>
              </div>

             </form>

        </div>


     )

     


}

export default AddUpdateForm;