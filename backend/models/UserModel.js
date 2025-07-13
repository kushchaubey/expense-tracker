const Sequelize = require("sequelize");
const sequelize = require("../Utils/Database");
const bcrypt = require('bcrypt');
const saltRounds = 10; // You can adjust this value as needed

const plainPassword = 'user_password';

bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(plainPassword, salt, function(err, hash) {
        if (err) throw err;
        // Store the 'hash' in your database
    });
});

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
      

    },

})


//User Model is exported
module.exports = userModel;