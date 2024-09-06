 const { DataTypes } = require ('sequelize')

 module.exports = model

 function model(sequelize){
    const attributes = {
        day: DataTypes.STRING
    }
    return sequelize.define('dayOfWeek', attributes)

 }
