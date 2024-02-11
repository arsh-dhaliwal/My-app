```javascript
import mqtt from 'mqtt';
import { db } from './database';
import { temperatureUpdate } from '../store/index';

const MQTT_BROKER_URL = 'mqtt://your-broker-url'; // Replace with your MQTT broker URL
const MQTT_OPTIONS = {
  clientId: 'ThermWatch_' + Math.random().toString(16).substr(2, 8),
  // Add any additional options required for connection
};

const client = mqtt.connect(MQTT_BROKER_URL, MQTT_OPTIONS);

client.on('connect', () => {
  console.log('MQTT Client Connected');
  // Subscribe to topics
  client.subscribe('temperature/data', (err) => {
    if (!err) {
      console.log('Subscribed to temperature data topic');
    }
  });
});

client.on('message', (topic, message) => {
  // message is a buffer
  const data = JSON.parse(message.toString());
  if (topic === 'temperature/data') {
    handleTemperatureData(data);
  }
});

function handleTemperatureData(data) {
  // Assuming data is in the format: { sensorId: 'sensor1', temperature: 25.6 }
  const { sensorId, temperature } = data;

  // Save temperature data to the database
  db.models.SensorData.create({
    sensorId,
    temperature,
    timestamp: new Date()
  }).then(() => {
    // Emit temperature update event to the store
    temperatureUpdate({ sensorId, temperature });
  }).catch((error) => {
    console.error('Error saving temperature data to the database:', error);
  });
}

export function publishTemperatureCommand(sensorId, command) {
  // Publish a command to a specific sensor
  client.publish(`sensor/${sensorId}/command`, JSON.stringify(command), (err) => {
    if (err) {
      console.error('Error publishing temperature command:', err);
    } else {
      console.log(`Command published to sensor/${sensorId}/command`);
    }
  });
}

export default client;
```