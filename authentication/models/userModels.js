const { Model, DataTypes } = require("sequelize");

//require createDB
const sequelize = require("../config/db");

class User extends Model {};

User.init(
    {
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        }
    },
   
    {
        sequelize,modelName: "user" // This will be same as table name
    }
    
)

module.exports = User;