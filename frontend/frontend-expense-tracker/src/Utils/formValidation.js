export const formValidation = {
  validateItemName(itemName) {
    if (!itemName || itemName.trim().length < 3) {
      return "Item name must be at least 3 characters long";
    }
    return "";
  },

  validateCost(cost) {
    if (!cost || isNaN(cost) || Number(cost) <= 0) {
      return "Cost must be a positive number";
    }
    return "";
  },

  validateCategory(category) {
    if (!category || category === "") {
      return "Please select a category";
    }
    return "";
  },

  validateUser(user) {
    if (!user || user === "") {
      return "Please select a user";
    }
    return "";
  },

validateDate(date) {
  if (!date || date.trim() === "") {
    return "Please select a date";
  }

  const inputDate = new Date(date);
  if (isNaN(inputDate.getTime())) {
    return "Invalid date format";
  }

  // Optional: prevent future dates
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Remove time part

  console.log(today)
  if (inputDate.setHours(0, 0, 0, 0) > today) {
    return "Date cannot be in the future";
  }

  return "";
},

validateDateformat(date){
 const inputDate = new Date(date);
  if (isNaN(inputDate.getTime())) {
    return "Invalid date format";
  }
}
};
