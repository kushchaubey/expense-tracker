const  analyticsService  = require("../Utils/analyticsServices");
const { Op, Sequelize} = require('sequelize');
const sendResponse = require("../Utils/sendResponse");
const userModel = require("../models/UserModel");
const categoryModel = require("../models/CategoryModel");

exports.getOverview = async (req, res) => {
  try {
    const { year, start, end, category } = req.query;
    const filters = { year, start, end, category };
    const filter1 = { year, start, end };

    
    const [total, categoryData, itemData, monthData,userData] = await Promise.all([
      analyticsService.getTotalExpense(filters),
      analyticsService.getGroupedData({ ...filter1, groupField: 'category.categoryName', labelField: 'category.categoryName' }),
      analyticsService.getGroupedData({ ...filters, groupField: 'itemName', labelField: 'itemName' }),
analyticsService.getGroupedData({
  ...filters,
  groupField: Sequelize.literal('MONTH(date)'),
  labelField: Sequelize.literal('MONTH(date)')
}),


      analyticsService.getGroupedData({ ...filters, groupField: 'userName', labelField: 'userName' }),



]);
        return sendResponse(res, 409, "overView page retrived", {
      total,
      category: categoryData,
      items: itemData,
      months: monthData,
      users:userData
    });


  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.getUsers =async (req,res,next)=>{

  const {year,start,end} = req.query;
  
  const allUsers = await analyticsService.getData(year,start,end,'user.id','user.userName',userModel);

  if(allUsers){

    return sendResponse(res,200,"all users",allUsers)
  }else{
    return sendResponse(res,400,"users not found",null)

  }


}

exports.getCategories =async (req,res,next)=>{

  const {year,start,end} = req.query;
  
  const allcats = await analyticsService.getData(year,start,end,'category.id','category.categoryName',categoryModel);

  if(allcats){

    return sendResponse(res,200,"all users",allcats)
  }else{
    return sendResponse(res,400,"users not found",null)

  }


}


exports.getExpensesByCategories =async (req,res,next)=>{

  const {year,start,end,category} = req.query;
  
  const AllExpenses = await analyticsService.getAllExpensesBasedOnType(year,start,end,category);

  if(AllExpenses){

    return sendResponse(res,200,"all users",AllExpenses)
  }else{
    return sendResponse(res,400,"users not found",null)

  }


}

exports.getExpensesByUsers =async (req,res,next)=>{

  const {year,start,end,userId} = req.query;
  const category = null;
  const AllExpenses = await analyticsService.getAllExpensesBasedOnType(year,start,end,category,userId);

  if(AllExpenses){

    return sendResponse(res,200,"all users",AllExpenses)
  }else{
    return sendResponse(res,400,"users not found",null)

  }


}

exports.getTop5Expenses =async (req,res,next)=>{

  const {year,start,end} = req.query;
  
  const allUsers = await analyticsService.getTop5Expenses(year,start,end);

  if(allUsers){

    return sendResponse(res,200,"all users",allUsers)
  }else{
    return sendResponse(res,400,"users not found",allUsers)

  }
}
