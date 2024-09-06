const { DataTypes } = require('sequelize')

module.exports = model;

function model(sequelize) {
    const attributes = {
        merchantName: {type: DataTypes.STRING},
        merchantRef: { type: DataTypes.STRING, unique: true},
        refNo: { type: DataTypes.STRING, unique: true },
        transactionID: { type: DataTypes.STRING},
        amount: { type: DataTypes.STRING },
        cardType: { type: DataTypes.STRING},
        cardNo: { type: DataTypes.STRING },
        message: { type: DataTypes.STRING},
        orderSelected: { type: DataTypes.STRING},
        status: { type: DataTypes.ENUM('initiated', 'processing', 'accept', 'decline') },
        expires: { type: DataTypes.DATE },
        rawResponse: {type: DataTypes.JSON},
        metadata: { type: DataTypes.JSON},
        isExpired: {
            type: DataTypes.VIRTUAL,
            get() { return Date.now() >= this.expires }
        },  
        isActive: {
            type: DataTypes.VIRTUAL,
            get() { return !this.isExpired }
        },
        doneAt: { type: DataTypes.DATE }
    }
    return sequelize.define('transaction', attributes)
}