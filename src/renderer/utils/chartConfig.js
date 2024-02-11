import { ref } from 'vue';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export const createRealTimeChart = (ctx, sensorData) => {
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      datasets: sensorData.map(sensor => ({
        label: sensor.name,
        data: sensor.values,
        fill: false,
        borderColor: sensor.color,
        tension: 0.1
      }))
    },
    options: {
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'minute'
          },
          title: {
            display: true,
            text: 'Time'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Temperature (°C)'
          }
        }
      },
      animation: {
        duration: 0 // turn off animation for real-time data updates
      },
      plugins: {
        legend: {
          display: true
        }
      }
    }
  });

  return chart;
};

export const updateRealTimeChart = (chart, sensorData) => {
  chart.data.datasets.forEach((dataset, index) => {
    dataset.data = sensorData[index].values;
  });
  chart.update();
};

export const createPolarTrendPlot = (ctx, sensorData) => {
  const chart = new Chart(ctx, {
    type: 'polarArea',
    data: {
      labels: sensorData.map(sensor => `Sensor ${sensor.position}`),
      datasets: [{
        label: 'Temperature',
        data: sensorData.map(sensor => sensor.value),
        backgroundColor: sensorData.map(sensor => sensor.color)
      }]
    },
    options: {
      scales: {
        r: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Temperature (°C)'
          }
        }
      },
      plugins: {
        legend: {
          display: true
        }
      }
    }
  });

  return chart;
};

export const createHistoricTrendPlot = (ctx, historicData) => {
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: historicData.dates,
      datasets: historicData.sensors.map(sensor => ({
        label: sensor.name,
        data: sensor.values,
        fill: false,
        borderColor: sensor.color,
        tension: 0.1
      }))
    },
    options: {
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'day'
          },
          title: {
            display: true,
            text: 'Date'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Temperature (°C)'
          }
        }
      },
      plugins: {
        legend: {
          display: true
        },
        tooltip: {
          mode: 'index',
          intersect: false
        }
      }
    }
  });

  return chart;
};

// Reactive reference for temperature unit, defaulting to Celsius
export const temperatureUnit = ref('°C');

// Function to toggle temperature unit between Celsius and Fahrenheit
export const toggleTemperatureUnit = () => {
  temperatureUnit.value = temperatureUnit.value === '°C' ? '°F' : '°C';
};