

const expenseModel = require("../models/ExpenseModel");
const userModel = require("../models/UserModel");
const categoryModel = require("../models/CategoryModel");
const sendResponse = require("../Utils/sendResponse");
const {Sequelize,Op} = require("sequelize");
const analyticsService = require('../Utils/analyticsServices');
const validation = require("../validations/validation")

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
        
        return sendResponse(res,400,"expenses are not available");
    }

      return sendResponse(res,200,"all the expenses",expeneses);
})
.catch((err)=>{
       return sendResponse(res,500,"Internal server Error")
})



}


exports.getAllExpensesByTodayDate= (req,res,next)=>{
    const todayDate = analyticsService.getTodaysDate();
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
        
    where:analyticsService.getWhereClause({start:todayDate,end:todayDate}),
    raw:true
        
    }).then((response)=>{

        if(response.length>0){
                   return sendResponse(res,200,`Expenses of ${analyticsService.getTodaysDate()}`,response)

        }else{
                  return sendResponse(res,200,'No expense found today',null)
 
        }
    }).catch(err=>{
        console.log(err);
       return sendResponse(res,500,"Internal server Error",null)

    })

    


        
         
         
     
    

}

exports.getAllExpensesByDate= (req,res,next)=>{

    var {start,end}= req.query;


   const  sartDate = validation.validateCategoty(start);

       
   const  endDate = validation.validateCategoty(end);
  
   const  checkDate = validation.validateDatesContinuity(start,end)

   if(sartDate.errors.length >0 || endDate.errors.length > 0){
      console.log(sartDate.errors)
     return sendResponse(res,400,'start date or end date not valid',null)

   }

   if(checkDate.errors.length>0){
         return sendResponse(res,400,'end date must be after start date or same date',null)

   }

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
        
    where:analyticsService.getWhereClause({start:start,end:end}),
    raw:true
        
    }).then((response)=>{

        if(response.length>0){
                   return sendResponse(res,200,`Expenses of ${analyticsService.getTodaysDate()}`,response)

        }else{
                  return sendResponse(res,200,'No expense found today',null)
 
        }
    }).catch(err=>{
        console.log(err);
       return sendResponse(res,500,"Internal server Error",null)

    })

    


        
         
         
     
    

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