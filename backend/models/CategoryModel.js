const Sequelize = require("sequelize");
const sequelize = require("../Utils/Database");

// Category model is created
const categoryModel  = sequelize.define("category",{

    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    categoryName:{
        type:Sequelize.STRING,
        allowNull:false,
        unique: true

    },
    
   

})
// Category model is exported

module.exports = categoryModel;