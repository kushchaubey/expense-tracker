const express = require("express");

const routes = express.Router();


const expensesController = require("../controllers/expenseController");

routes.get("/:date",expensesController.getAllExpensesByDate);

routes.post("/expenses",expensesController.AddExpense)


routes.put("/expenses/:id",expensesController.updateExpense)

routes.delete("/expenses/:id",expensesController.deteExpense)


module.exports = routes;