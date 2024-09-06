const { DataTypes } = require('sequelize')

module.exports = model

function model(sequelize) {
    const attributes = {
        name: { type: DataTypes.STRING },
        description: {type: DataTypes.STRING},
        price: { type: DataTypes.INTEGER },
        dates: {type: DataTypes.STRING},
        sessions: {type: DataTypes.STRING},
        image: {type: DataTypes.STRING}

    }
    return sequelize.define('asaActivity', attributes)
}

