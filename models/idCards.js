const { DataTypes } = require('sequelize')

module.exports = model

function model(sequelize) {
    const attributes = {
        name: { type: DataTypes.STRING },
        description: {type: DataTypes.STRING},
        price: { type: DataTypes.INTEGER },
        image: {type: DataTypes.STRING},
        dates: {type: DataTypes.STRING}

    }
    return sequelize.define('idCards', attributes)
}