const db = require('../initDb.js');

db.prepare(`CREATE TABLE IF NOT EXISTS Plants (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  plantName TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  country TEXT NOT NULL,
  zipCode TEXT NOT NULL,
  phoneNumber TEXT NOT NULL,
  email TEXT NOT NULL,
  companyId INTEGER NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(companyId) REFERENCES Companies(id)
)`).run();

module.exports = Plant;