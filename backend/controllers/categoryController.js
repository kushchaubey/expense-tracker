
const { where } = require("sequelize");
const sendResponse = require("../Utils/sendResponse");
const categoryModel = require("../models/CategoryModel");
const expenesesModel = require("../models/ExpenseModel");



module.exports.getAllCategories = (req,res,next)=>{
     
    categoryModel.findAll({
        attributes:["categoryName"]
    })
    .then((categories)=>{
        return sendResponse(res,200,"all categories",categories)
    })
    .catch(err=>
        {
         console.log(err);
         return sendResponse(res,500,"Internal server error",null)
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
          return sendResponse(res,409,"this category is already existed",null)
        }

         return categoryModel.create(categoryData);

    })
    .then((result)=>{
   
        if(result && !result.statusCode){
         return sendResponse(res,201,"category is created",result)

        }
    })
    .catch(err=>
     {
         console.log(err);
         return sendResponse(res,500,"Internal server error",null)
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
          return sendResponse(res,200,"category found ",category)
        }else{
     
          return sendResponse(res,400,"Category not found ",category)

        }

    })
    .catch(err=>
     {
    onsole.log(err);
         return sendResponse(res,500,"Internal server error",null)
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
            return sendResponse(res,409,"this category name is already exists",null)
        }
         
        return   categoryModel.update(categoryData,{
        where:{
            id:req.params.id
        }
    })
    })
    .then((category)=>{

        if(category){
          return sendResponse(res,200,"category updated ",category)
        }else{
     
          return sendResponse(res,400,"Category not updated ",category)

        }

    })
    .catch(err=>
     {
    console.log(err);
         return sendResponse(res,500,"Internal server error",null)
    }
    )  


}


module.exports.deleteCategory = (req,res,next)=>{
     
expenesesModel.findOne({where:{"categoryId":req.params.id}})
      .then((result)=>{

        if(result){


          return sendResponse(res,400,'This category is used in expenses, Can\'t detete it');

        }

    return categoryModel.destroy({
        where:{
            id : req.params.id,
        }
      })

    })
     .then((result)=>{
            if(result){
               return sendResponse(res,201,'category deleted',result)
            }else{
                return sendResponse(res,400,'category not deleted',null)
    
            }
          }
        )
        .catch((err)=>{
              console.log(err);
              return sendResponse(res,500,'internal server error',null)
        })


}