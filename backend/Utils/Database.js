const Sequelize = require("sequelize");

const sequelize = new Sequelize("expense-tracker","root","Kush@123",{
    host:"localhost",
    dialect:"mysql",
    port:3307
})

module.exports = sequelize;