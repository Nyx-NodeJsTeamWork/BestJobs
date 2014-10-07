'use strict';
var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/SimpleBlogSystem',
        port: process.env.PORT || 3000
    },
    production: {
        rootPath: rootPath,
        db: 'no-online-database-yet',
        port: process.env.PORT || 3000
    }
};