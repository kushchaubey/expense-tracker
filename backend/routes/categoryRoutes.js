const express = require("express");
const categoryRoutes = express.Router();
const validationsMiddleware = require("../middlewares/validationsMiddleware");
const categoryController = require("../controllers/categoryController");


categoryRoutes.get('/',categoryController.getAllCategories);
categoryRoutes.post('/',validationsMiddleware.validateCategoty,categoryController.AddCategory);
categoryRoutes.get('/:id',categoryController.getCategoryByID);
 categoryRoutes.put('/:id',validationsMiddleware.validateCategoty,categoryController.updateCategory);
 categoryRoutes.delete('/:id',categoryController.deleteCategory);

module.exports = categoryRoutes;