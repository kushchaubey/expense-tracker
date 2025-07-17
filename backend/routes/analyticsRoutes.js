const express = require("express");

const analyticsController = require("../controllers/analyticsController");
const analyticsRoutes = express.Router();


analyticsRoutes.get("/overViewPage/",analyticsController.getOverview);
analyticsRoutes.get("/getUsers/",analyticsController.getUsers);
analyticsRoutes.get("/getCategories/",analyticsController.getUsers);
analyticsRoutes.get("/getTop5Expenses/",analyticsController.getTop5Expenses);


module.exports = analyticsRoutes;