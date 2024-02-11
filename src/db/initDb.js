const path = require('path');
const { open } = require('better-sqlite3');

const Company = require('./models/company');
const Plant = require('./models/plant');
const Asset = require('./models/asset');
const Sensor = require('./models/sensor');

const dbPath = path.join(__dirname, '..', 'db', 'thermwatch.tmdb');

function initializeDatabase() {
  const db = open(dbPath, { verbose: console.log });

  // Create tables if they do not exist
  db.exec(`
    CREATE TABLE IF NOT EXISTS company (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      companyName TEXT,
      address TEXT,
      city TEXT,
      state TEXT,
      country TEXT,
      zipCode TEXT,
      phoneNumber TEXT,
      email TEXT
    );
    
    CREATE TABLE IF NOT EXISTS plant (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      plantName TEXT,
      address TEXT,
      city TEXT,
      state TEXT,
      country TEXT,
      zipCode TEXT,
      phoneNumber TEXT,
      email TEXT,
      companyId INTEGER,
      FOREIGN KEY (companyId) REFERENCES company (id)
    );
    
    CREATE TABLE IF NOT EXISTS asset (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      assetName TEXT,
      plantId INTEGER,
      capacity REAL,
      rating REAL,
      temperatureThreshold REAL,
      FOREIGN KEY (plantId) REFERENCES plant (id)
    );
    
    CREATE TABLE IF NOT EXISTS sensor (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sensorName TEXT,
      sensorFamily TEXT,
      sensorType TEXT,
      sensorVariant TEXT,
      assetId INTEGER,
      position INTEGER,
      FOREIGN KEY (assetId) REFERENCES asset (id)
    );
  `);

  // Attach models to the db instance
  db.Company = new Company(db);
  db.Plant = new Plant(db);
  db.Asset = new Asset(db);
  db.Sensor = new Sensor(db);

  return db;
}

module.exports = {
  initializeDatabase,
  dbPath
};