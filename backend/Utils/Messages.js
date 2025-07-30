module.exports = message={

    validation:{
       
        invalidName:"Invalid or missing name.",
        invalidCat:"category name is invalid or less than 2 charecters",
        invalidCost:"Category is required.",
        invalidDate:"Invalid date format.",
        invalidEndDate:"End date must be after the start date or the same date",
        invalidUserName:"UserName is invalid or less than 2 charecter",
        invalidPass:"Password is invalid or less than 8 charecter",
        userAlreadyExists:"User already exists with this username",
        categoryAlreadyExists: "This category name already exists",

        
    },

    crud:{

        UserCreated:"User created successfully!",
        userRetrived:"user or users successfully retrieved",
        userNotfound:"user or users not found",
        userUpdated:"User Updated",
        userNotUpdated:"User not Updated",
        userCantDelete:"user has expenses cannot detelte the user",
        userDeleted:"User Deleted",
        userNotDeleted:"User not Deleted",
        categoryCreated: "Category created successfully!",
        categoryRetrieved: "Category or categories successfully retrieved",
        categoryNotFound: "Category not found",
        categoryUpdated: "Category updated successfully",
        categoryNotUpdated: "Category not updated",
        categoryDeleted: "Category deleted successfully",
        categoryNotDeleted: "Category not deleted",
        categoryCantDelete: "This category is used in expenses, can't delete it"

    },

    statusText:{
        success:"success",
        fail:"error"
    },

    server:{
      error: "Internal server error"
    },
    expense: {
        notFound: "Expenses are not available",
        fetched: "All the expenses retrieved successfully",
        todayFetched: "Today's expenses retrieved successfully",
        noToday: "No expense found today",
        noDataInRange: "No expense found in this date range",
        invalidDate: "Start date or end date not valid",
        invalidRange: "End date must be after start date or same date",
        userNotExist: "User does not exist",
        categoryNotExist: "Category does not exist",
        added: "Expense added successfully",
        notAdded: "Expense not added",
        updated: "Expense updated successfully",
        notUpdated: "Expense not updated",
        deleted: "Expense deleted successfully",
        notDeleted: "Expense not deleted"
  },
  analytics: {
        overviewFetched: "Overview data retrieved successfully",
        usersFetched: "Users retrieved successfully",
        usersNotFound: "No users found",
        categoriesFetched: "Categories retrieved successfully",
        categoriesNotFound: "No categories found",
        expensesFetched: "Expenses retrieved successfully",
        expensesNotFound: "No expenses found",
        topExpensesFetched: "Top 5 expenses retrieved successfully",
        topExpensesNotFound: "No top expenses found"
}

    
}