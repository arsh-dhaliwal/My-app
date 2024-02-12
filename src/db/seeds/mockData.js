const db = require('../initDb');

async function generateMockData() {
  // Create mock company data
  const insertCompany = db.prepare('INSERT INTO Companies (companyName, address, city, state, country, zipCode, phoneNumber, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
  const mockCompany = insertCompany.run('ThermoCo', '123 Industrial Way', 'Techville', 'Innovate', 'Techland', '12345', '123-456-7890', 'contact@thermoco.com');
    companyName: 'ThermoCo',
    address: '123 Industrial Way',
    city: 'Techville',
    state: 'Innovate',
    country: 'Techland',
    zipCode: '12345',
    phoneNumber: '123-456-7890',
    email: 'contact@thermoco.com'
  });

  // Create mock plant data
  const insertPlant = db.prepare('INSERT INTO Plants (plantName, address, city, state, country, zipCode, phoneNumber, email, companyId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
  const mockPlant = insertPlant.run('Main Plant', '456 Production Road', 'Techville', 'Innovate', 'Techland', '12345', '123-456-7891', 'plant@thermoco.com', mockCompany.lastInsertRowid);
    plantName: 'Main Plant',
    address: '456 Production Road',
    city: 'Techville',
    state: 'Innovate',
    country: 'Techland',
    zipCode: '12345',
    phoneNumber: '123-456-7891',
    email: 'plant@thermoco.com',
    companyId: mockCompany.id
  });

  // Create mock asset data
  const mockAsset = await Asset.create({
  const mockAsset = insertAsset.run('Reactor 1', mockPlant.lastInsertRowid, 5000, 'A', 100);
    assetName: 'Reactor 1',
    plantId: mockPlant.id,
    capacity: '5000',
    rating: 'A',
    temperatureThreshold: '100'
  });

  // Create mock sensor data
  const insertSensor = db.prepare('INSERT INTO Sensors (sensorName, sensorFamily, sensorType, sensorVariant, assetId, position) VALUES (?, ?, ?, ?, ?, ?)');
  const mockSensor = insertSensor.run('TempSensor 1', 'ThermoSensors', 'Temperature', 'A1', mockAsset.lastInsertRowid, 1);
    sensorName: 'TempSensor 1',
    sensorFamily: 'ThermoSensors',
    sensorType: 'Temperature',
    sensorVariant: 'A1',
    assetId: mockAsset.id,
    position: '1'
  });

  // Generate historical temperature data
  const startDate = new Date('2018-01-01');
  const endDate = new Date();
  for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
    const mockTemperatureData = {
      sensorId: mockSensor.id,
      date: date.toISOString().split('T')[0],
      temperature: Math.random() * 100, // Random temperature for demonstration
      status: 'good' // Default status
    };
    const insertTemperatureData = db.prepare('INSERT INTO TemperatureData (sensorId, date, temperature, status) VALUES (?, ?, ?, ?)');
    insertTemperatureData.run(mockSensor.lastInsertRowid, date.toISOString().split('T')[0], Math.random() * 100, 'good');
  }
}

module.exports = {
  generateMockData
};