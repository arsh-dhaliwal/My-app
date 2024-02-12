const db = require('../initDb.js');

db.prepare(`CREATE TABLE IF NOT EXISTS Assets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  assetName TEXT NOT NULL,
  plantId INTEGER NOT NULL,
  capacity REAL,
  rating REAL,
  temperatureThreshold REAL NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(plantId) REFERENCES Plants(id)
)`).run();

module.exports = Asset;