'use strict';

require('dotenv').config();
const { db } = require('./src/auth/models');
const { start } = require('./src/server');

const PORT = process.env.PORT || 5000;

db.sync().then(()=>{
    start(PORT);
}).catch(err => console.log(err.message))