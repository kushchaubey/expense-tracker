const Sequelize = require("sequelize");
const sequelize = require("../Utils/Database");


//User Model is created

const userModel  = sequelize.define("user",{

    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    userName:{
        type:Sequelize.STRING,
        allowNull:false,
        unique: true,

    },
    
    userPassword:{
        type:Sequelize.STRING,
        allowNull:false,
        set(value) {
      // Storing passwords in plaintext in the database is terrible.
      // Hashing the value with an appropriate cryptographic hash function is better.
         this.setDataValue('userPassword', hash(value));
    },

    },

})


//User Model is exported
module.exports = userModel;