
const { where } = require("sequelize");
const sendResponse = require("../Utils/sendResponse");
const categoryModel = require("../models/CategoryModel");
const expenesesModel = require("../models/ExpenseModel");
const messages = require("../Utils/Messages.js")



module.exports.getAllCategories = (req,res,next)=>{
             console.log(messages.statusText.success);

    categoryModel.findAll({
        attributes:["id","categoryName"]
    })
    .then((categories)=>{
        console.log(messages.statusText.success);
      return sendResponse(res, 200, messages.statusText.success, messages.crud.categoryRetrieved, categories);
    })
    .catch(err=>
        {
         console.log(err);
      return sendResponse(res, 500, messages.statusText.fail, messages.server.error, null);
    }

    )


}

module.exports.AddCategory = (req,res,next)=>{
     
    const categoryData = req.body
    categoryModel.findOne({
        where:{
            categoryName: categoryData.categoryName,
        }
      

    })
    .then((existing)=>{
         console.log("existing");
        if(existing){
        return sendResponse(res, 409, messages.statusText.fail , messages.validation.categoryAlreadyExists, null);
        }

         return categoryModel.create(categoryData);

    })
    .then((result)=>{
   
        if(result && !result.statusCode){
        return sendResponse(res, 201, messages.statusText.success, messages.crud.categoryCreated, result);

        }
    })
    .catch(err=>
     {
         console.log(err);
      return sendResponse(res, 500, messages.statusText.fail, messages.server.error, null);
    }
    )  


}


module.exports.getCategoryByID = (req,res,next)=>{
     
    const categoryID = req.params.id
    categoryModel.findByPk(categoryID,{
        attributes:["categoryName"]
    })
    .then((category)=>{

        if(category){
        return sendResponse(res, 200, messages.statusText.success, messages.crud.categoryRetrieved, category);
        }else{
     
        return sendResponse(res, 404, messages.statusText.fail, messages.crud.categoryNotFound, null);

        }

    })
    .catch(err=>
     {
    console.log(err);
      return sendResponse(res, 500, messages.statusText.fail, messages.server.error, null);
    }
    )  


}


module.exports.updateCategory = (req,res,next)=>{
     
    const categoryData = req.body;

    categoryModel.findOne({
        where:{
            categoryName : categoryData.categoryName,
        }
    })
    .then((existingCategory)=>{

        if(existingCategory && existingCategory.id != req.params.id){
        return sendResponse(res, 409, messages.statusText.fail, messages.validation.categoryAlreadyExists, null);
        }
         
        return   categoryModel.update(categoryData,{
        where:{
            id:req.params.id
        }
    })
    })
    .then((category)=>{

        if(category){
        return sendResponse(res, 200, messages.statusText.success, messages.crud.categoryUpdated, category);
        }else{
     
        return sendResponse(res, 400, messages.statusText.fail, messages.crud.categoryNotUpdated, null);

        }

    })
    .catch(err=>
     {
    console.log(err);
      return sendResponse(res, 500, messages.statusText.fail, messages.server.error, null);
    }
    )  


}


module.exports.deleteCategory = (req,res,next)=>{
     
expenesesModel.findOne({where:{"categoryId":req.params.id}})
      .then((result)=>{

        if(result){


        return sendResponse(res, 400, messages.statusText.fail, messages.crud.categoryCantDelete, null);

        }else{

    return categoryModel.destroy({
        where:{
            id : req.params.id,
        }
      })
    }
    })
     .then((result)=>{
            if(result){
        return sendResponse(res, 200, messages.statusText.success, messages.crud.categoryDeleted, result);
            }else{
        return sendResponse(res, 400, messages.statusText.fail, messages.crud.categoryNotDeleted, null);
    
            }
          }
        )
        .catch((err)=>{
              console.log(err);
      return sendResponse(res, 500, messages.statusText.fail, messages.server.error, null);
        })


}