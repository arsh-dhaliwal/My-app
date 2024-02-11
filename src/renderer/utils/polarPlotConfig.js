import { ref } from 'vue';
import { Chart } from 'chart.js';
import 'chartjs-chart-polar-area';

export function createPolarPlotConfig(sensorData) {
  const config = ref({
    type: 'polarArea',
    data: {
      labels: sensorData.map(sensor => `Sensor ${sensor.position}`),
      datasets: [{
        label: 'Temperature',
        data: sensorData.map(sensor => sensor.temperature),
        backgroundColor: sensorData.map(sensor => {
          if (sensor.status === 'green') {
            return 'rgba(75, 192, 192, 0.2)';
          } else if (sensor.status === 'yellow') {
            return 'rgba(255, 206, 86, 0.2)';
          } else if (sensor.status === 'red') {
            return 'rgba(255, 99, 132, 0.2)';
          }
          return 'rgba(201, 203, 207, 0.2)'; // default color for unknown status
        }),
        borderColor: sensorData.map(sensor => {
          if (sensor.status === 'green') {
            return 'rgb(75, 192, 192)';
          } else if (sensor.status === 'yellow') {
            return 'rgb(255, 206, 86)';
          } else if (sensor.status === 'red') {
            return 'rgb(255, 99, 132)';
          }
          return 'rgb(201, 203, 207)'; // default color for unknown status
        }),
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        r: {
          angleLines: {
            display: false
          },
          suggestedMin: 0,
          suggestedMax: sensorData.reduce((max, sensor) => Math.max(max, sensor.temperature), 0)
        }
      },
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Polar Area Chart'
        }
      }
    }
  });

  return config;
}

export function updatePolarPlot(chartInstance, sensorData) {
  chartInstance.data.labels = sensorData.map(sensor => `Sensor ${sensor.position}`);
  chartInstance.data.datasets.forEach(dataset => {
    dataset.data = sensorData.map(sensor => sensor.temperature);
    dataset.backgroundColor = sensorData.map(sensor => {
      if (sensor.status === 'green') {
        return 'rgba(75, 192, 192, 0.2)';
      } else if (sensor.status === 'yellow') {
        return 'rgba(255, 206, 86, 0.2)';
      } else if (sensor.status === 'red') {
        return 'rgba(255, 99, 132, 0.2)';
      }
      return 'rgba(201, 203, 207, 0.2)'; // default color for unknown status
    });
    dataset.borderColor = sensorData.map(sensor => {
      if (sensor.status === 'green') {
        return 'rgb(75, 192, 192)';
      } else if (sensor.status === 'yellow') {
        return 'rgb(255, 206, 86)';
      } else if (sensor.status === 'red') {
        return 'rgb(255, 99, 132)';
      }
      return 'rgb(201, 203, 207)'; // default color for unknown status
    });
  });
  chartInstance.update();
}