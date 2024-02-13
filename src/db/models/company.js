const Database = require('better-sqlite3');
const db = require('../initDb.js');

const Company = db.prepare(`CREATE TABLE IF NOT EXISTS Companies (
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
)`).run()('Company', {
  companyName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false
  },
  zipCode: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
}, {
  // Additional model options go here
  timestamps: false
});

// Export the model so it can be used in other parts of the application
module.exports = Company;