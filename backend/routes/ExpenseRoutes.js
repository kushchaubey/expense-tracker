const express = require("express");

const routes = express.Router();

const validationsMiddleware  = require("../middlewares/validationsMiddleware");

const expensesController = require("../controllers/expenseController");

routes.get("/today/",expensesController.getAllExpensesByTodayDate);
routes.get("/date/",expensesController.getAllExpensesByDate);

routes.get("/",expensesController.getAllExpenses);
routes.get("/:id",expensesController.getExpensesByID);

routes.post("/",validationsMiddleware.formValidationMiddleWare,expensesController.AddExpense)


 routes.put("/update/:id",validationsMiddleware.formValidationMiddleWare,expensesController.updateExpense)

 routes.delete("/delete/:id",expensesController.deleteExpense)


module.exports = routes;