```javascript
const ModbusRTU = require("modbus-serial");
const { db } = require('./database');
const { temperatureUpdate } = require('./notification');

// create an empty modbus client
const client = new ModbusRTU();

// Function to connect to the Modbus server
const connectModbus = async (config) => {
  try {
    await client.connectTCP(config.ip, { port: config.port });
    client.setID(config.unitId);
    console.log("Connected to the Modbus server.");
  } catch (error) {
    console.error("Failed to connect to the Modbus server:", error);
  }
};

// Function to read temperature data from the Modbus server
const readTemperatureData = async (sensorConfig) => {
  try {
    // read the temperature register from the modbus server
    const data = await client.readHoldingRegisters(sensorConfig.registerAddress, sensorConfig.registerLength);
    const temperature = data.data[0]; // assuming temperature is at the first register

    // Update the temperature in the database
    await db.models.Sensor.update({ temperature }, { where: { id: sensorConfig.sensorId } });

    // Emit temperature update event
    temperatureUpdate(sensorConfig.sensorId, temperature);

    console.log(`Temperature data for sensor ${sensorConfig.sensorId} updated: ${temperature}`);
  } catch (error) {
    console.error("Failed to read temperature data from the Modbus server:", error);
  }
};

// Function to start polling for temperature data
const startPolling = (sensorConfig, interval) => {
  setInterval(() => {
    readTemperatureData(sensorConfig);
  }, interval);
};

module.exports = {
  connectModbus,
  readTemperatureData,
  startPolling
};
```