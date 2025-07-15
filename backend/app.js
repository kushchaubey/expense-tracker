require('dotenv').config();


const express = require("express");
const app = express();


//Importing Dbs
const sequelize = require("./Utils/Database");

//Importing models
const expenseModel = require("./models/ExpenseModel");
const categoryModel = require("./models/CategoryModel");
const userModel = require("./models/UserModel");

//Importing routes
const expensesRoutes = require("./routes/ExpenseRoutes");
const userRoute = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");


app.use(express.json());
app.use(express.urlencoded({extended:false}));






app.use("/api/expenses",expensesRoutes);

app.use("/api/users",userRoute);
app.use("/api/categories",categoryRoutes);

//Model associations
userModel.hasMany(expenseModel);
expenseModel.belongsTo(userModel, {
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE'
});

categoryModel.hasMany(expenseModel);
expenseModel.belongsTo(categoryModel, {
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE'
});


//syncing of models with table.

sequelize.sync()
.then(result=>console.log(result))
.catch(err=>console.log(err));

app.listen(3000,()=>{
    console.log("server running on port 3000");
})

