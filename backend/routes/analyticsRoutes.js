const express = require("express");

const analyticsController = require("../controllers/analyticsController");
const analyticsRoutes = express.Router();


analyticsRoutes.get("/overViewPage/",analyticsController.getOverview);

module.exports = analyticsRoutes;