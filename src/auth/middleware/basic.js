'use-strict';

const base64 = require('base-64');
const bcrypt = require('bcrypt');
const { User } = require('../models');

module.exports = async function(req, res, next) {
    const basicHeaderParts = req.headers.authorization.split(' ');
    const encodedString = basicHeaderParts.pop();
    const decodedString = base64.decode(encodedString)
  
    const [username, password] = decodedString.split(':');
    
    try {
    const user = await User.findOne({ where: { username } });
    
    const isValid = await bcrypt.compare(password, user.password)
  
    if(isValid) {
      req.userData = user;
      next();
    }
    else throw new Error('Invalid User');
    
    } 
    catch (error) { 
      res.status(403).send('Invalid Login'); 
    }
}