const { Op, fn, col, where } = require('sequelize');
const expenseModel = require('../models/ExpenseModel');
const categoryModel = require('../models/CategoryModel');
const userModel = require('../models/UserModel');


const  getDateFilter = (year, start, end) => {
  console.log("start:", start);
   console.log("end:", end);

  const now = new Date();
  if (start && end) {
       console.log("n");
const startDate = new Date(`${start}T00:00:00Z`); // UTC start of day
   
 const endDate = new Date(`${end}T23:59:59Z`);     // UTC end of day

  return { [Op.between]: [start, endDate] };

  } else if (year) {
    return {
      [Op.between]: [`${year}-01-01`, `${year}-12-31`]
    };
  } else {
    return {
      [Op.between]: [`${now.getFullYear()}-01-01`, `${now.getFullYear()}-12-31`]
    };
  }
};

const getWhereClause = ({ year, start, end, category, userID }) => {
  const where = {
    date: getDateFilter(year, start, end),
  };

  if (category) {
    where.categoryId = category;
  }else if(userID){
    where.userId = userID;

  }

  return where;
};

const getTodaysDate = ()=>{
const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
const dd = String(today.getDate()).padStart(2, '0');
return `${yyyy}-${mm}-${dd}`;

}

// Generic fetch grouped data (e.g. by category, item, month, day)
const getGroupedData = async ({ groupField, labelField, year, start, end, category, limit = 5 }) => {
  return await expenseModel.findAll({
    attributes: [
      [fn('SUM', col('cost')), 'totalCost'],
      [typeof  labelField === 'string' ? col(labelField) : labelField, 'label']
    ],
    include: [
      {
        model: categoryModel,
        attributes: [], // Hide joins from response
      },{
        model: userModel,
        attributes: [], // Hide joins from response
      }
    ],
    where: getWhereClause({ year, start, end, category }),
    group: [typeof groupField === 'string' ? col(groupField) : groupField],
    order: [[fn('SUM', col('cost')), 'DESC']],
    limit,
    raw: true,
  });
};

const getTotalExpense = async ({ year, start, end, category }) => {
  console.log(start);
  const total = await expenseModel.findOne({
    attributes: [[fn('SUM', col('cost')), 'total']],
    where: getWhereClause({ year, start, end, category }),
    raw: true,
  });

  return total.total;
};



const getData = async (year,start,end,dataId,dataName,dataModel)=>{

  console.log(dataName)
   const alldata =  await expenseModel.findAll({

    attributes:[[col(dataId),'ID'],[col(dataName),'name'], [fn("sum",col('cost')), 'totalAmount']],
    include:{
      model:dataModel,
      attributes:[]
    },
    group:[col(dataId), col(dataName)],
    where:getWhereClause({year,start,end}),
    order:[['totalAmount','DESC']],
    raw:true
   });



   return alldata;
}


const getTop5Expenses = async (year,start,end)=>{

   const top5Expense =  await expenseModel.findAll({

    attributes:['itemName',[fn('SUM', col('cost')),'totalcost']],
    group:'itemName',
    where:getWhereClause({year,start,end}),
    order:[['totalcost','DESC']],
    limit:5,
    raw:true
   });



   return top5Expense;
}


const getAllExpensesBasedOnType = async (year,start,end,category,userID)=>{

   
   const getAllExpenses =  await expenseModel.findAll({
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
    attributes:["id","itemName","cost", [fn('DATE', col('date')), 'onlyDate']],


    where:getWhereClause({year,start,end,category,userID})
   
    
})


   return getAllExpenses;
}


module.exports = {
  getWhereClause,
  getGroupedData,
  getTotalExpense,
  getData,
  getTop5Expenses,
  getAllExpensesBasedOnType,
  getTodaysDate
};
