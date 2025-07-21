
const validateExpenseFormData = (data) => {
  const errors = [];

  if (!data.itemName || data.itemName.trim().length < 2) {
    errors.push("Invalid or missing name.");
  }

  if (!data.category || typeof data.category !== "string") {
    errors.push("Category is required.");
  }

  if (!data.cost || isNaN(data.cost) || Number(data.cost) <= 0) {
    errors.push("Cost must be a number greater than 0.");
  }

  if (data.date && isNaN(Date.parse(data.date))) {
    errors.push("Invalid date format.");
  }

  return {

    isValid: errors.length === 0,
    errors,
  };
};

module.exports.formValidation = validateExpenseFormData;

module.exports.validateDate = (date,)=>{
    const errors = []

    if(!date || isNaN(Date.parse(date))){
      errors.push("invalid date format.")
    }

    return{
        isValid: errors.length==0,
        errors
    }

}

module.exports.validateDatesContinuity= (startDate,endDate)=>{
    const errors = []
   if ((new Date(startDate) > new Date(endDate)) ||(new Date(startDate) == new Date(endDate)) ){
    
    errors.push("End date must be after the start date or the same date")

   }

    return{
        isValid: errors.length==0,
        errors
    }
}

module.exports.validateUSER = (userName,userPass)=>{
    const errors = []

    if(!userName || userName.trim().length < 2){
      errors.push("UserName is invalid or less than charecter")
    }
    
    if(!userPass || userPass.trim().length < 8){
      errors.push("Password is invalid or less than 8 charecter")
    }

    return{
        isValid: errors.length==0,
        errors
    }

}

module.exports.validateCategoty = (category)=>{
    const errors = []

    if(!category || category.trim().length < 2){
      errors.push("category name is invalid or less than 2 charecters")
    }
    
  

    return{
        isValid: errors.length==0,
        errors
    }

}


