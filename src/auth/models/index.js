'use strict';

const { Sequelize, DataTypes } = require("sequelize");

const usersModel = require('./users.model');

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory:' : process.env.DATABASE_URI;

let sequelizeOption = process.env.NODE_ENV === 'production' ? {
    dialectOptions : {
        ssl : {
            require : true,
            rejectUnauthorized : false
        }
    }
} : {};

let sequelize = new Sequelize(DATABASE_URL, sequelizeOption);

// const sequelize = new Sequelize(process.env.DATABASE_URI);


module.exports = {
    db: sequelize,
    User: usersModel(sequelize,DataTypes)
}