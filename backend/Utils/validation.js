
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

module.exports = validateExpenseFormData;

module.exports.validateDate = (date)=>{
    const errors = []

    if(!date || isNaN(Date.parse(date))){
      errors.push("invalid date format.")
    }

    return{
        isValid: errors.length==0,
        errors
    }

}