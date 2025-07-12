
require('dotenv').config();


const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DBNAME,process.env.DBUSERNAME,process.env.DBPASS,{
    host:"localhost",
    dialect:"mysql",
    port:process.env.PORT
})

module.exports = sequelize;