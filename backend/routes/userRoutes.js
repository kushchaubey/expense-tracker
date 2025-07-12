const express = require("express");

const userRoute = express.Router();

const userController = require("../controllers/userController");


userRoute.get("/",userController.getUsers);
userRoute.get("/:id",userController.getUserById);
userRoute.post("/:id",userController.postAddUser);
userRoute.put("/:id",userController.postupdateUser);
userRoute.delete("/:id",userController.deleteUser);


module.exports = userRoute;