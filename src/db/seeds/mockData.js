const { Company, Plant, Asset, Sensor } = require('../models');

async function generateMockData() {
  // Create mock company data
  const mockCompany = await Company.create({
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
  const mockPlant = await Plant.create({
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
    assetName: 'Reactor 1',
    plantId: mockPlant.id,
    capacity: '5000',
    rating: 'A',
    temperatureThreshold: '100'
  });

  // Create mock sensor data
  const mockSensor = await Sensor.create({
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
    // Here you would save the mockTemperatureData to the database
    // For example: await TemperatureData.create(mockTemperatureData);
  }
}

module.exports = {
  generateMockData
};