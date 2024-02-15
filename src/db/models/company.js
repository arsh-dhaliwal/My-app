const db = require('../initDb.js');

db.prepare(`CREATE TABLE IF NOT EXISTS Company (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  companyName TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  country TEXT NOT NULL,
  zipCode TEXT NOT NULL,
  phoneNumber TEXT NOT NULL,
  email TEXT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
)`).run();
// Export the model so it can be used in other parts of the application
module.exports = Company;
