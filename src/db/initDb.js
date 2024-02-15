const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '..', 'db', 'thermwatch.tmdb');
const db = new Database(dbPath, { verbose: console.log });

module.exports = db;