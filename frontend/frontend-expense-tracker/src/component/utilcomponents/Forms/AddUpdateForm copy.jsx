import style from './AddUpdateForm.module.scss';
import ButtonComponent from '../Buttons/ButtonComponent';
import { useEffect, useState } from 'react';
import { formValidation } from '../../../Utils/formValidation';
import {getdataBasedOnURL} from '../../../Utils/FetchingUtil'
import axios from 'axios';
import { toast } from 'react-toastify';
const AddUpdateForm = ({ formName ,id,fetchExpense,setmodelActive}) => {


  const [formData, setFormData] = useState({
    itemName: '',
    cost: '',
    category: '',
    user: '',
    date: ''
  });

 const [users,setUsers] = useState([])
 const [categories,setCategories] = useState([])
 const [loading,setloading] = useState(false)



  const [errors,setErrors] = useState({
    itemName: '',
    cost: '',
    category: '',
    user: '',
    date: ''
  })


 

  useEffect( ()=> {
            
    let newDate = new Date();
   let todaysDate = newDate.toISOString().split('T')[0];
    getdataBasedOnURL("http://localhost:3000/api/categories",setCategories,setloading);
     getdataBasedOnURL("http://localhost:3000/api/users",setUsers,setloading)
    if(formName=='Add'){
     

  setFormData({
    itemName: '',
    cost: '',
    category: '',
    user: '',
    date: ''
  })

    

     setFormData((prev) => ({
      ...prev,
      date: todaysDate,
    }))
    }
    else if(formName=='Update'){


    
       getExpenseById();
 

    }
  },[formName,id]);


   


   const getExpenseById =  ()=>{

    axios.get(`http://localhost:3000/api/expenses/${id}`)
    .then((res) => {
         
       if(res.data.statusText=="success"){
      setFormData(res.data.data); // ✔️ works if your API response format is { data: { ... } }
     /// console.log(formData);
      setloading(false)
       }
    })
    .catch((err) => {
      console.error('Error fetching data:', err); // more descriptive
      setFormData([]); // optional: clear state on error
    });

   }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    let errMessage = ''

    switch(name){

      case 'itemName':
         errMessage = formValidation.validateItemName(value);
      break;

      case 'cost':
         errMessage = formValidation.validateCost(value);
      break;

      case 'category':
         errMessage = formValidation.validateCategory(value);
      break;

      case 'user':
         errMessage = formValidation.validateUser(value);
      break;
         
      case 'date':
         errMessage = formValidation.validateDate(value);
      break;
    }


      setErrors(prev=>{
         return (
            {
              ...prev,
              [name]:errMessage
            }
         )
      }
  

      )
    
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newError = {
    itemName: formValidation.validateItemName(formData.itemName),
    cost: formValidation.validateCost(formData.cost),
    category:formValidation.validateCategory(formData.category),
    user: formValidation.validateUser(formData.user),
    date: formValidation.validateDate(formData.date)
  }

  
    setErrors(newError);

     //setErrors(newError); // update UI with errors
  const hasError = Object.values(newError).some(error => error !== '');
  if (!hasError) {
    
  
    if(formName=="Add"){

 axios.post('http://localhost:3000/api/expenses', formData)
  .then(function (response) {
  
    if(response.data.statusText=="success"){
       toast.success(response.data.message)
    }
  
    fetchExpense();
    setmodelActive(false);
    setFormData({
    itemName: '',
    cost: '',
    category: '',
    user: '',
    date: formData.date
  })
  }).catch(function () {
    toast.error("Something went wrong!")
  });
   
}else{
   

  const updateData = {
    ...formData,
   user: formData.user.id,
  category: formData.category.id


  };
  
 

  console.log(updateData)
  axios.put(`http://localhost:3000/api/expenses/update/${formData.id}`,updateData)
  .then(function (response) {
  
    if(response.data.statusText=="success"){
       toast.success(response.data.message)
    }
    fetchExpense();
    setmodelActive(false);
  }).catch(function () {
    toast.error("Something went wrong!")
  });

}
  } else {
       toast.error("Validation failed")

  }
};


  

  if(loading){
   return (
      <h1>loading</h1>
   )
  }
  
  if(formName==="Add" && (users.length == 0 || categories.length == 0)){
   return(
      <h1>No category or user found</h1> 
   )
  }
  return (
    <div className={style.formConatainer}>
      <h3>{formName} Expense</h3>
      <form onSubmit={handleSubmit}>

        <div className={style.formGroup}>
          <label htmlFor="itemName">Item Name</label>
          <input type="text" id="itemName" name="itemName" value={formData.itemName} onChange={handleChange} />
          <div className={style.error}>{errors.itemName}</div>
        </div>

        <div className={style.formGroup}>
          <label htmlFor="cost">Cost</label>
          <input type="number" id="cost" name="cost" value={formData.cost} onChange={handleChange} />
          <div className={style.error}>{errors.cost}</div>
        </div>

        <div className={style.formGroup}>
          <label htmlFor="categories">Category</label>
      {formName==='Add'? (<select id="categories" name="category" value={formData.category} onChange={handleChange}>

            <option value="">Select</option>)
              {categories.map((data)=>{
                if(data.id !== formData.category.id){
  
                  return <option value={data.id} key={data.id}>{data.categoryName}</option>

                }
            })}
            
          </select>):(

<select id="categories" name="category" value={formData.category} onChange={handleChange}>

            <option value={formData.category.id || " "}>{formData.category.categoryName|| 'select'}</option>)
              { categories.filter((cat) => cat.id !== formData.category?.id).map((data)=>{
              
          
                  return <option value={data.id} key={data.id}>{data.categoryName}</option>

                
            })}
            
          </select>)}

          
          <div className={style.error}>{errors.category}</div>
        </div>

        <div className={style.formGroup}>
          <label htmlFor="users">User</label>
         {formName==='Add'? (<select id="users" name="user" value={formData.user} onChange={handleChange}>
            <option value="">Select</option>
             {users.map((data)=>{
               return <option value={data.id} key={data.id}>{data.userName}</option>
            })}
         
            
          </select>):
            
            (
            <select id="users" name="user" value={formData.user} onChange={handleChange}>
                  <option value={formData.user.id}>{formData.user.userName}</option>
                  {
                  
                  users.filter((usr)=>usr.id!==formData.user.id).map((data)=>{
                    return <option value={data.id} key={data.id}>{data.userName}</option>
                  })}
              
          </select>)}
          <div className={style.error}>{errors.user}</div>
        </div>

        <div className={style.formGroup}>
          <label htmlFor="date">Date</label>
          <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} />
          <div className={style.error}>{errors.date}</div>
        </div>

        <div className={style.formGroup}>
          <ButtonComponent>{formName} Expense</ButtonComponent>
        </div>

      </form>
    </div>
  );
};

export default AddUpdateForm;


     
