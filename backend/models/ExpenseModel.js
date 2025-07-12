const Sequelize = require("sequelize");
const sequelize = require("../Utils/Database");

const userModel  = sequelize.define("user",{

    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    itemName:{
        type:Sequelize.STRING,
        allowNull:false

    },
    
    date:{
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,

    }




})

module.exports = userModel;