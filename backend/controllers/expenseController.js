

const expenseModel = require("../models/ExpenseModel");
const userModel = require("../models/UserModel");
const categoryModel = require("../models/CategoryModel");
const sendResponse = require("../Utils/sendResponse");


exports.getAllExpensesByDate= (req,res,next)=>{
      

    try{
        
       return res.status(200).send({message:`its a get all route by date ${req.params.date}`})
         
         
     
    }catch(err){
        console.log(err);
    }

}

exports.AddExpense = (req, res, next) => {
    let existingUserOBJ;

    const { itemName, cost, category, date, user } = req.body;

    userModel.findByPk(user)
        .then((existingUser) => {
            if (!existingUser) {
                return sendResponse(res, 409, "User not exists", null);
            }

            existingUserOBJ = existingUser;
            return categoryModel.findByPk(category);
        })
        .then((existingCategory) => {
            if (!existingCategory) {
                return sendResponse(res, 409, "Category not exists", null);
            }

            return existingUserOBJ.createExpense({
                itemName: itemName,
                date: date,
                cost: cost,
                categoryId: existingCategory.id,
            });
        })
        .then((result) => {
            if (!result) {
                return sendResponse(res, 401, "Expense not added", null);
            }

            return sendResponse(res, 200, "Expense added to category", result);
        })
        .catch((err) => {
            console.log(err);
            return sendResponse(res, 500, "Internal server error", null);
        });
};


exports.updateExpense = (req,res,next)=>{

    try{
           res.status(200).send({data:req.body})

    }catch(err){
        console.log(err);
    }

}


exports.deteExpense = (req,res,next)=>{

    try{
           res.status(200).send({data:req.body})

    }catch(err){
        console.log(err);
    }

}