// src/renderer/utils/trendAnalysis.js

import { db } from './database';

/**
 * Calculate daily temperature statistics for each sensor.
 * @param {Date} date - The date for which to calculate the statistics.
 * @returns {Promise<Array>} - A promise that resolves to an array of statistics objects.
 */
export async function calculateTemperatureStats(date) {
  try {
    const stats = await db.SensorData.findAll({
      where: {
        timestamp: date
      },
      attributes: [
        'sensorId',
        [db.sequelize.fn('MAX', db.sequelize.col('temperature')), 'maxTemperature'],
        [db.sequelize.fn('MIN', db.sequelize.col('temperature')), 'minTemperature'],
        [db.sequelize.fn('AVG', db.sequelize.col('temperature')), 'avgTemperature']
      ],
      group: ['sensorId']
    });

    return stats.map(stat => ({
      sensorId: stat.sensorId,
      maxTemperature: parseFloat(stat.get('maxTemperature')),
      minTemperature: parseFloat(stat.get('minTemperature')),
      avgTemperature: parseFloat(stat.get('avgTemperature'))
    }));
  } catch (error) {
    console.error('Error calculating temperature statistics:', error);
    throw error;
  }
}

/**
 * Analyze temperature trends to determine if an alert should be triggered.
 * @param {number} percentageIncrease - The percentage increase to trigger a yellow alert.
 * @param {number} daysToCheck - The number of days to check for the trend.
 * @param {number} threshold - The temperature threshold to trigger a red alert.
 * @returns {Promise<Array>} - A promise that resolves to an array of alert objects.
 */
export async function analyzeTemperatureTrends(percentageIncrease, daysToCheck, threshold) {
  try {
    const currentDate = new Date();
    const pastDate = new Date(currentDate.getTime() - (daysToCheck * 24 * 60 * 60 * 1000));
    const recentStats = await calculateTemperatureStats(currentDate);
    const pastStats = await calculateTemperatureStats(pastDate);

    const alerts = recentStats.map(recentStat => {
      const pastStat = pastStats.find(stat => stat.sensorId === recentStat.sensorId);
      const avgTemperatureIncrease = recentStat.avgTemperature - (pastStat ? pastStat.avgTemperature : 0);
      const percentageChange = (avgTemperatureIncrease / (pastStat ? pastStat.avgTemperature : 1)) * 100;

      let status = 'green';
      if (recentStat.maxTemperature >= threshold) {
        status = 'red';
      } else if (percentageChange >= percentageIncrease) {
        status = 'yellow';
      }

      return {
        sensorId: recentStat.sensorId,
        status,
        maxTemperature: recentStat.maxTemperature,
        avgTemperature: recentStat.avgTemperature,
        percentageChange
      };
    });

    return alerts;
  } catch (error) {
    console.error('Error analyzing temperature trends:', error);
    throw error;
  }
}