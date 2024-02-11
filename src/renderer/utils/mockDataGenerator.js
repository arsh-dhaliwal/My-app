import { db } from './database';
import { models } from './database';
import faker from 'faker';

const generateMockData = async () => {
  try {
    // Create mock company profile
    const company = await models.Company.create({
      companyName: faker.company.companyName(),
      address: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      country: faker.address.country(),
      zipCode: faker.address.zipCode(),
      phoneNumber: faker.phone.phoneNumber(),
      email: faker.internet.email()
    });

    // Create mock plant profile linked to the company
    const plant = await models.Plant.create({
      plantName: faker.company.companyName(),
      address: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      country: faker.address.country(),
      zipCode: faker.address.zipCode(),
      phoneNumber: faker.phone.phoneNumber(),
      email: faker.internet.email(),
      CompanyId: company.id
    });

    // Create mock asset profile linked to the plant
    const asset = await models.Asset.create({
      assetName: faker.commerce.productName(),
      PlantId: plant.id,
      capacity: faker.random.number(),
      rating: faker.random.number(),
      temperatureThreshold: faker.random.number({ min: 50, max: 100 })
    });

    // Create mock sensor profile linked to the asset
    const sensor = await models.Sensor.create({
      sensorName: faker.commerce.productName(),
      sensorFamily: faker.commerce.productMaterial(),
      sensorType: faker.commerce.product(),
      sensorVariant: faker.random.word(),
      AssetId: asset.id,
      position: faker.random.number({ min: 0, max: 360 })
    });

    // Generate historic sensor data from 2018 to present
    const startDate = new Date('2018-01-01');
    const endDate = new Date();
    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
      await models.TemperatureData.create({
        SensorId: sensor.id,
        date: new Date(date),
        temperature: faker.random.number({ min: 0, max: 100 }),
        status: 'good' // default status
      });
    }

    // Generate mock real-time data
    await models.TemperatureData.create({
      SensorId: sensor.id,
      date: new Date(),
      temperature: faker.random.number({ min: 0, max: 100 }),
      status: 'good' // default status
    });

    console.log('Mock data generation complete.');
  } catch (error) {
    console.error('Error generating mock data:', error);
  }
};

export default generateMockData;