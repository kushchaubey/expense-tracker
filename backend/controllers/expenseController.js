

const expenseModel = require("../models/ExpenseModel");
const userModel = require("../models/UserModel");
const categoryModel = require("../models/CategoryModel");
const sendResponse = require("../Utils/sendResponse");
const Sequelize = require("sequelize");
const sequelize = require("../Utils/Database");


exports.getAllExpenses= (req,res,next)=>{
      
expenseModel.findAll({
     include: [
    {
      model: userModel,
      attributes: ['id', 'userName']
    },
    {
      model: categoryModel,
      attributes: ['id', 'categoryName']
    },
],
    attributes:["id","itemName","cost", [Sequelize.fn('DATE', Sequelize.col('date')), 'onlyDate']],


   
    
})
.then((expeneses)=>{
    if(!expeneses){
        
        return sendResponse(res,400,"expenses are not available",null);
    }

      return sendResponse(res,200,"all the expenses",expeneses);
})
.catch((err)=>{
       return sendResponse(res,500,"Internal server Error",null)
})



}


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

            return expenseModel.update({
                itemName: itemName,
                date: date,
                cost: cost,
                categoryId: existingCategory.id,
            },{
                where:{
                    "id":req.params.id
                }
            });
        })
        .then((result) => {
            if (!result) {
                return sendResponse(res, 401, "Expense not updated", null);
            }

            return sendResponse(res, 200, "Expense updated", result);
        })
        .catch((err) => {
            console.log(err);
            return sendResponse(res, 500, "Internal server error", null);
        });

}


exports.deleteExpense = (req,res,next)=>{

   
    expenseModel.destroy({
          where: {
            id: req.params.id,
         },})

      .then((result)=>{
        if(result){
           return sendResponse(res,201,'Expense deleted',result)
        }else{
            return sendResponse(res,400,'expense not deleted',null)

        }
      }
    )
    .catch((err)=>{
          console.log(err);
          return sendResponse(res,500,'internal server error',null)
    })
    

}