const { Op, fn, col } = require('sequelize');
const expenseModel = require('../models/ExpenseModel');
const categoryModel = require('../models/CategoryModel');

const getDateFilter = (year, start, end) => {
  const now = new Date();
  if (start && end) {
    return { [Op.between]: [start, end] };
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

const getWhereClause = ({ year, start, end, category }) => {
  const where = {
    date: getDateFilter(year, start, end),
  };

  if (category) {
    where.categoryId = category;
  }

  return where;
};

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
  const total = await expenseModel.findOne({
    attributes: [[fn('SUM', col('cost')), 'total']],
    where: getWhereClause({ year, start, end, category }),
    raw: true,
  });

  return total.total;
};

module.exports = {
  getWhereClause,
  getGroupedData,
  getTotalExpense
};
