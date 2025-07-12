const express = require("express");

const routes = express.Router();

const validationsMiddleware  = require("../middlewares/validationsMiddleware");

const expensesController = require("../controllers/expenseController");

routes.get("/:date",expensesController.getAllExpensesByDate);

routes.post("/expenses",validationsMiddleware.formValidationMiddleWare,expensesController.AddExpense)


routes.put("/expenses/:id",expensesController.updateExpense)

routes.delete("/expenses/:id",expensesController.deteExpense)


module.exports = routes;