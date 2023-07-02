'use strict';

const express = require("express");
const router = express.Router();

const bcrypt = require('bcrypt');
const { User } = require('./models');

const basicAuth = require('./middleware/basic');

router.post('/signup', signUpHandler);
router.post('/signin',basicAuth, signInHandler);



async function signUpHandler(req, res){
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 5);
        
        const record = await User.create({
          username: username,
          password: hashedPassword
        })
    
        res.status(201).json({
            user: record
        })
    } 
    catch (err) {
        console.error(err);
        throw err;
    }
}

async function signInHandler(req, res){
    res.status(200).json({
      user: req.userData
    })
}


module.exports = router;