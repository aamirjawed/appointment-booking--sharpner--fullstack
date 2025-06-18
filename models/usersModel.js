const {Sequelize, DataTypes}  = require('sequelize')
const sequelize = require('../utils/db-connection.js')


const User = sequelize.define('users', {
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },

    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    phone_no:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

module.exports = {User}