const Database = require('arangojs').Database;
const { resolve } = require('path');
const dbConfig = require('../config/config');

const db = new Database({
    url: `${dbConfig.arangoHost}`
});

db.useDatabase(dbConfig.anargoDatabase);
db.useBasicAuth(dbConfig.arangoUser, dbConfig.arangoPassword);


db.listCollections().then(function (res) {
    return new Promise(resolve => setTimeout(resolve, 100));
}, function (err) {
    process.exit(2)
});

module.exports = db;