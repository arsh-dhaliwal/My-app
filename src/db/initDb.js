const path = require('path');
const { initializeDatabase } = require('..\/db\/initDb');
const eslint = require('eslint');

const eslintConfig = {
  configFile: 'path-to-eslint-config'
};
const Database = require('./initDb.js');


const Plant = require('./models/plant');
const Asset = require('./models/asset');
const Sensor = require('./models/sensor');

const dbPath = path.join(__dirname, '..', 'db', 'thermwatch.tmdb');



const jest = require('jest');

module.exports = {
  initializeDatabase,
  dbPath
};