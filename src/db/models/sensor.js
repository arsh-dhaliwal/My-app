const db = require('../initDb.js');

db.prepare(`CREATE TABLE IF NOT EXISTS Sensors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sensorName TEXT NOT NULL,
  sensorFamily TEXT NOT NULL,
  sensorType TEXT NOT NULL,
  sensorVariant TEXT NOT NULL,
  assetId INTEGER NOT NULL,
  position INTEGER NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(assetId) REFERENCES Assets(id)
+)`).run();

module.exports = Sensor;