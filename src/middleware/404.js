'use strict';

module.exports = function (req, res){
    res.status(404).json({
        code: 404,
        message: 'Page not found :( ',
        route: req.originalUrl
    })
}