const analyticsService = require("../Utils/analyticsServices");
const { Sequelize } = require("sequelize");
const sendResponse = require("../Utils/sendResponse");
const userModel = require("../models/UserModel");
const categoryModel = require("../models/CategoryModel");
const messages = require("../Utils/Messages");


exports.getOverview = async (req, res) => {
  try {
    const { year, start, end, category } = req.query;
    const filters = { year, start, end, category };
    const filter1 = { year, start, end };

    const [total, categoryData, itemData, monthData, userData] = await Promise.all([
      analyticsService.getTotalExpense(filters),
      analyticsService.getGroupedData({
        ...filter1,
        groupField: "category.categoryName",
        labelField: "category.categoryName"
      }),
      analyticsService.getGroupedData({
        ...filters,
        groupField: "itemName",
        labelField: "itemName"
      }),
      analyticsService.getGroupedData({
        ...filters,
        groupField: Sequelize.literal("MONTH(date)"),
        labelField: Sequelize.literal("MONTH(date)")
      }),
      analyticsService.getGroupedData({
        ...filters,
        groupField: "userName",
        labelField: "userName"
      })
    ]);

    return sendResponse(res, 200, messages.statusText.success, messages.analytics.overviewFetched, {
      total,
      category: categoryData,
      items: itemData,
      months: monthData,
      users: userData
    });
  } catch (err) {
    console.error(err);
    return sendResponse(res, 500, messages.statusText.fail, messages.server.error, null);
  }
};

exports.getUsers = async (req, res) => {
  try {
    const { year, start, end } = req.query;
    const users = await analyticsService.getData(year, start, end, "user.id", "user.userName", userModel);

    if (!users || users.length === 0) {
      return sendResponse(res, 404, messages.statusText.fail, messages.analytics.usersNotFound, null);
    }

    return sendResponse(res, 200, messages.statusText.success, messages.analytics.usersFetched, users);
  } catch (err) {
    console.error(err);
    return sendResponse(res, 500, messages.statusText.fail, messages.server.error, null);
  }
};

exports.getCategories = async (req, res) => {
  try {
    const { year, start, end } = req.query;
    const categories = await analyticsService.getData(year, start, end, "category.id", "category.categoryName", categoryModel);

    if (!categories || categories.length === 0) {
      return sendResponse(res, 404, messages.statusText.fail, messages.analytics.categoriesNotFound, null);
    }

    return sendResponse(res, 200, messages.statusText.success, messages.analytics.categoriesFetched, categories);
  } catch (err) {
    console.error(err);
    return sendResponse(res, 500, messages.statusText.fail, messages.server.error, null);
  }
};

exports.getExpensesByCategories = async (req, res) => {
  try {
    const { year, start, end, category } = req.query;
    const expenses = await analyticsService.getAllExpensesBasedOnType(year, start, end, category);

    if (!expenses || expenses.length === 0) {
      return sendResponse(res, 404, messages.statusText.fail, messages.analytics.expensesNotFound, null);
    }

    return sendResponse(res, 200, messages.statusText.success, messages.analytics.expensesFetched, expenses);
  } catch (err) {
    console.error(err);
    return sendResponse(res, 500, messages.statusText.fail, messages.server.error, null);
  }
};

exports.getExpensesByUsers = async (req, res) => {
  try {
    const { year, start, end, userId } = req.query;
    const category = null;

    const expenses = await analyticsService.getAllExpensesBasedOnType(year, start, end, category, userId);

    if (!expenses || expenses.length === 0) {
      return sendResponse(res, 404, messages.statusText.fail, messages.analytics.expensesNotFound, null);
    }

    return sendResponse(res, 200, messages.statusText.success, messages.analytics.expensesFetched, expenses);
  } catch (err) {
    console.error(err);
    return sendResponse(res, 500, messages.statusText.fail, messages.server.error, null);
  }
};

exports.getTop5Expenses = async (req, res) => {
  try {
    const { year, start, end } = req.query;
    const topExpenses = await analyticsService.getTop5Expenses(year, start, end);

    if (!topExpenses || topExpenses.length === 0) {
      return sendResponse(res, 404, messages.statusText.fail, messages.analytics.topExpensesNotFound, null);
    }

    return sendResponse(res, 200, messages.statusText.success, messages.analytics.topExpensesFetched, topExpenses);
  } catch (err) {
    console.error(err);
    return sendResponse(res, 500, messages.statusText.fail, messages.server.error, null);
  }
};
