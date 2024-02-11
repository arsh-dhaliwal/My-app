import { ref } from 'vue';
import { db } from './database';
import { SensorSchema } from './sharedDependencies';

const historicTrendConfig = () => {
  const historicData = ref([]);
  const selectedDate = ref(null);
  const isLoading = ref(false);

  const fetchHistoricData = async (date) => {
    isLoading.value = true;
    try {
      const sensors = await db.models.Sensor.findAll({
        include: [
          {
            model: db.models.TemperatureRecord,
            as: 'temperatureRecords',
            where: {
              date: date
            }
          }
        ]
      });

      historicData.value = sensors.map(sensor => {
        const { temperatureRecords } = sensor;
        return {
          sensorName: sensor.sensorName,
          sensorPosition: sensor.position,
          dailyMax: Math.max(...temperatureRecords.map(record => record.value)),
          dailyMin: Math.min(...temperatureRecords.map(record => record.value)),
          dailyAvg: temperatureRecords.reduce((acc, record) => acc + record.value, 0) / temperatureRecords.length
        };
      });
    } catch (error) {
      console.error('Error fetching historic data:', error);
    } finally {
      isLoading.value = false;
    }
  };

  const selectDate = (date) => {
    selectedDate.value = date;
    fetchHistoricData(date);
  };

  return {
    historicData,
    selectedDate,
    isLoading,
    selectDate
  };
};

export default historicTrendConfig;