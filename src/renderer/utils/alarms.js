import { db } from './database';
import { sendNotification, sendEmailAlert } from './notification';

const alarmStatusColors = {
  green: 'Everything is good',
  yellow: 'Requires attention',
  red: 'Requires immediate intervention'
};

const checkTemperatureThreshold = async (sensorId, threshold) => {
  try {
    const sensorData = await db.models.Sensor.findByPk(sensorId);
    if (sensorData && sensorData.currentTemperature >= threshold) {
      // Trigger red alert
      sendNotification('Temperature Alert', `Temperature for sensor ${sensorData.sensorName} exceeds the threshold!`);
      sendEmailAlert(sensorData);
      return alarmStatusColors.red;
    }
    return alarmStatusColors.green;
  } catch (error) {
    console.error('Error checking temperature threshold:', error);
  }
};

const checkTemperatureTrend = async (sensorId, percentageIncrease, days) => {
  try {
    const sensorData = await db.models.Sensor.findByPk(sensorId);
    if (sensorData) {
      // Calculate the average temperature over the last Y days and compare
      const averageTemperature = await calculateAverageTemperature(sensorId, days);
      const trendIncrease = (sensorData.currentTemperature - averageTemperature) / averageTemperature * 100;
      if (trendIncrease >= percentageIncrease) {
        // Trigger yellow alert
        sendNotification('Temperature Trend Alert', `Average temperature trend for sensor ${sensorData.sensorName} has increased by ${trendIncrease.toFixed(2)}% over the last ${days} days.`);
        return alarmStatusColors.yellow;
      }
    }
    return alarmStatusColors.green;
  } catch (error) {
    console.error('Error checking temperature trend:', error);
  }
};

const calculateAverageTemperature = async (sensorId, days) => {
  // This function should calculate the average temperature for the sensor over the last Y days
  // Implementation depends on how the temperature data is stored and retrieved
  // Placeholder for actual implementation
  return 0; // Replace with actual calculation
};

export const evaluateSensorStatus = async (sensorId, threshold, percentageIncrease, days) => {
  const thresholdStatus = await checkTemperatureThreshold(sensorId, threshold);
  if (thresholdStatus === alarmStatusColors.red) {
    return thresholdStatus;
  }

  const trendStatus = await checkTemperatureTrend(sensorId, percentageIncrease, days);
  return trendStatus;
};

export const initializeAlarms = async () => {
  // This function should initialize the alarm system, setting up any necessary listeners or intervals
  // Placeholder for actual implementation
};

// Note: The actual implementation of these functions would require further development and integration within the codebase.
// The code provided here is a starting point and would need to be expanded upon to fully realize the alarm functionality described.