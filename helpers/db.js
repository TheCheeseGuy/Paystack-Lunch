const config = require('../config.json')
const mysql = require('mysql2/promise')
const { Sequelize } = require('sequelize')

module.exports = db = {}

initialize()

async function initialize() {
    const { host, port, user, password, database } = config.database
    const connection = await mysql.createConnection({ host, port, user, password })
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`)

    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' })
    db.Transaction = require('../models/transactionModel')(sequelize)
    db.FieldTrip = require('../models/fieldTripModel')(sequelize)
    db.DayOfWeek = require('../models/dayOfWeek')(sequelize)
    db.AsaActivity = require('../models/asaActivity')(sequelize)
    db.IdCards = require('../models/idCards')(sequelize)
    db.LaptopRental = require('../models/laptopRental')(sequelize)
    

    // db.DayOfWeek.hasMany(db.Menu, { foreignKey: 'dayOfWeekId', as: 'dayOfWeek' })
    // db.Menu.belongsTo(db.DayOfWeek, { foreignKey: 'dayOfWeekId', as: 'dayOfWeek' })

    await sequelize.sync()
}