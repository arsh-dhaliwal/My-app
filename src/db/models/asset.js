const { DataTypes } = require('sequelize');
const db = require('../initDb.js');

const Asset = db.define('Asset', {
  assetName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  plantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Plants',
      key: 'id'
    }
  },
  capacity: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  temperatureThreshold: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  // Other model options go here
  timestamps: true, // Adds createdAt and updatedAt timestamps
  tableName: 'Assets' // Define the table's name
});

module.exports = Asset;