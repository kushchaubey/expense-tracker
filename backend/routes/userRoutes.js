const express = require("express");

const userRoute = express.Router();

const userController = require("../controllers/userController");

const validationsMiddleware  = require("../middlewares/validationsMiddleware");


userRoute.get("/",userController.getUsers);
userRoute.get("/:id",userController.getUserByID);
userRoute.post("/",validationsMiddleware.validateUSER,userController.postAddUser);
userRoute.put("/:id",validationsMiddleware.validateUSER,userController.updateUser);
userRoute.delete("/delete/:id",userController.deleteUser);


module.exports = userRoute;