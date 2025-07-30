
const messages = require("../Utils/Messages");

const validateExpenseFormData = (data) => {
  const errors = [];

  if (!data.itemName || data.itemName.trim().length < 2) {
    errors.push(messages.validation.invalidName);
  }

  if (!data.category || typeof data.category !== "string") {
    errors.push(messages.validation.invalidCat);
  }

  if (!data.cost || isNaN(data.cost) || Number(data.cost) <= 0) {
    errors.push(messages.validation.invalidCost);
  }

  if (data.date && isNaN(Date.parse(data.date))) {
    errors.push(messages.validation.invalidDate);
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
      errors.push(messages.validation.invalidDate)
    }

    return{
        isValid: errors.length==0,
        errors
    }

}

module.exports.validateDatesContinuity= (startDate,endDate)=>{
    const errors = []
   if ((new Date(startDate) > new Date(endDate)) ||(new Date(startDate) == new Date(endDate)) ){
    
    errors.push(messages.validation.invalidEndDate)

   }

    return{
        isValid: errors.length==0,
        errors
    }
}

module.exports.validateUSER = (userName,userPass)=>{
    const errors = []

    if(!userName || userName.trim().length < 2){
      errors.push(messages.validation.invalidUserName)
    }
    
    if(!userPass || userPass.trim().length < 8){
      errors.push(messages.validation.invalidPass)
    }

    return{
        isValid: errors.length==0,
        errors
    }

}

module.exports.validateCategoty = (category)=>{
    const errors = []

    if(!category || category.trim().length < 2){
      errors.push(messages.validation.invalidCat)
    }
    
  

    return{
        isValid: errors.length==0,
        errors
    }

}


