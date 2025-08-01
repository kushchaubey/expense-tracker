

const expenseModel = require("../models/ExpenseModel");
const userModel = require("../models/UserModel");
const categoryModel = require("../models/CategoryModel");
const sendResponse = require("../Utils/sendResponse");
const {Sequelize,Op, json} = require("sequelize");
const analyticsService = require('../Utils/analyticsServices');
const validation = require("../validations/validation")
const messages = require("../Utils/Messages");
const { raw } = require("mysql2");

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
        
        return sendResponse(res, 404, messages.statusText.fail, messages.expense.notFound, null);
    }

      return sendResponse(res, 200, messages.statusText.success, messages.expense.fetched, expeneses);
})
.catch((err)=>{
      return sendResponse(res, 500, messages.statusText.fail, messages.server.error, null);
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
        return sendResponse(res, 200, messages.statusText.success, messages.expense.todayFetched, response);

        }else{
      return sendResponse(res, 200, messages.statusText.success, messages.expense.noToday, null);
 
        }
    }).catch(err=>{
        console.log(err);
      return sendResponse(res, 500, messages.statusText.fail, messages.server.error, null);

    })

    


        
         
         
     
    

}

exports.getAllExpensesByDate= (req,res,next)=>{

    var {start,end}= req.query;


   const  sartDate = validation.validateCategoty(start);

       
   const  endDate = validation.validateCategoty(end);
  
   const  checkDate = validation.validateDatesContinuity(start,end)

   if(sartDate.errors.length >0 || endDate.errors.length > 0){
      console.log(sartDate.errors)
    return sendResponse(res, 400, messages.statusText.fail, messages.expense.invalidDate, null);

   }

   if(checkDate.errors.length>0){
    return sendResponse(res, 400, messages.statusText.fail, messages.expense.invalidRange, null);

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
        return sendResponse(res, 200, messages.statusText.success, messages.expense.fetched, response);

        }else{
      return sendResponse(res, 200, messages.statusText.success, messages.expense.noDataInRange, null);
 
        }
    }).catch(err=>{
        console.log(err);
      return sendResponse(res, 500, messages.statusText.fail, messages.server.error, null);

    })

    


        
         
         
     
    

}

exports.AddExpense = (req, res, next) => {
    let existingUserOBJ;

    const { itemName, cost, category, date, user } = req.body;

    userModel.findByPk(user)
        .then((existingUser) => {
            if (!existingUser) {
        return sendResponse(res, 404, messages.statusText.fail, messages.expense.userNotExist, null);
            }

            existingUserOBJ = existingUser;
            return categoryModel.findByPk(category);
        })
        .then((existingCategory) => {
            if (!existingCategory) {
        return sendResponse(res, 404, messages.statusText.fail, messages.expense.categoryNotExist, null);
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
        return sendResponse(res, 400, messages.statusText.fail, messages.expense.notAdded, null);
            }

      return sendResponse(res, 201, messages.statusText.success, messages.expense.added, result);
        })
        .catch((err) => {
            console.log(err);
      return sendResponse(res, 500, messages.statusText.fail, messages.server.error, null);
        });
};


exports.updateExpense = (req,res,next)=>{

   let existingUserOBJ;

    const { itemName, cost, category, date, user } = req.body;
    console.log("Received body:", req.body);


    userModel.findByPk(user)
        .then((existingUser) => {
            if (!existingUser) {
        return sendResponse(res, 404, messages.statusText.fail, messages.expense.userNotExist, null);
            }

            existingUserOBJ = existingUser;
            return categoryModel.findByPk(category);
        })
        .then((existingCategory) => {
            if (!existingCategory) {
        return sendResponse(res, 404, messages.statusText.fail, messages.expense.categoryNotExist, null);
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
            if (result[0] === 0) {
        return sendResponse(res, 400, messages.statusText.fail, messages.expense.notUpdated, null);
            }

      return sendResponse(res, 200, messages.statusText.success, messages.expense.updated, result);
        })
        .catch((err) => {
            console.log(err);
      return sendResponse(res, 500, messages.statusText.fail, messages.server.error, null);
        });

}


exports.deleteExpense = (req,res,next)=>{

   
    expenseModel.destroy({
          where: {
            id: req.params.id,
         },})

      .then((result)=>{
        if(result){
        return sendResponse(res, 200, messages.statusText.success, messages.expense.deleted, result);
        }else{
      return sendResponse(res, 400, messages.statusText.fail, messages.expense.notDeleted, null);

        }
      }
    )
    .catch((err)=>{
          console.log(err);
      return sendResponse(res, 500, messages.statusText.fail, messages.server.error, null);
    })
    

}

exports.getExpensesByID = (req,res,next)=>{

      expenseModel.findByPk(req.params.id,{
  attributes:['id','itemName','date','cost'],
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
})
      .then((response)=>{
        
       const newResponse = {
    ...response.toJSON(), 
    date: response.date.toISOString().split("T")[0], // safely format date
  };
      //console.log(data.date)
        return sendResponse(res, 200, messages.statusText.success, ' ' , newResponse);

      })
      .catch((error)=>{
        console.log(error);

        return sendResponse(res, 500, messages.statusText.fail, messages.server.error, null);
    
      })
 
}