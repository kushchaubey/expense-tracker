const express = require("express");

const analyticsController = require("../controllers/analyticsController");
const analyticsRoutes = express.Router();


analyticsRoutes.get("/overViewPage/",analyticsController.getOverview);
analyticsRoutes.get("/getUsers/",analyticsController.getUsers);
analyticsRoutes.get("/getCategories/",analyticsController.getCategories);
analyticsRoutes.get("/getTop5Expenses/",analyticsController.getTop5Expenses);
analyticsRoutes.get("/getExpenseByCategories/",analyticsController.getExpensesByCategories);
analyticsRoutes.get("/getExpenseByUsers/",analyticsController.getExpensesByUsers);


module.exports = analyticsRoutes;