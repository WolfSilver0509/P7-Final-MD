const { Sequelize} = require('sequelize');

require('dotenv').config();


const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT,
    logging: false
} );


module.exports = sequelize;