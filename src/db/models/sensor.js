const { DataTypes } = require('sequelize');
const db = require('../initDb.js');

const Sensor = db.define('Sensor', {
  sensorName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sensorFamily: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sensorType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sensorVariant: {
    type: DataTypes.STRING,
    allowNull: false
  },
  assetId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Assets',
      key: 'id'
    }
  },
  position: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  // Other model options go here
  timestamps: false
});

module.exports = Sensor;