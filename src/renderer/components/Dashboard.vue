<template>
  <div id="dashboard">
    <div class="selection-bar">
      <!-- Plant and Asset Selection -->
      <div class="field">
        <label class="label">Plant</label>
        <div class="control">
          <div class="select">
            <select v-model="selectedPlant">
              <option v-for="plant in plants" :key="plant.id" :value="plant.id">{{ plant.plantName }}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="field">
        <label class="label">Asset</label>
        <div class="control">
          <div class="select">
            <select v-model="selectedAsset">
              <option v-for="asset in assets" :key="asset.id" :value="asset.id">{{ asset.assetName }}</option>
            </select>
          </div>
        </div>
      </div>
      <!-- Search Feature -->
      <div class="field">
        <label class="label">Search</label>
        <p class="control has-icons-left">
          <input class="input" type="text" placeholder="Search..." v-model="searchQuery">
          <span class="icon is-small is-left">
            <i class="fas fa-search"></i>
          </span>
        </p>
      </div>
    </div>
    <div class="sensor-cards columns is-multiline">
      <!-- Sensor Cards -->
      <div class="column is-one-third" v-for="sensor in filteredSensors" :key="sensor.id">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              {{ sensor.sensorName }}
            </p>
          </header>
          <div class="card-content">
            <div class="content">
              <p>Current Temperature: {{ sensor.currentTemperature }}°</p>
              <p>Status: <span :class="statusColor(sensor.status)">{{ sensor.status }}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Real-time Chart -->
    <div class="real-time-chart columns">
      <div class="column is-two-thirds">
        <real-time-chart :sensor-data="sensorData"></real-time-chart>
      </div>
      <!-- Polar Trend Plot -->
      <div class="column is-one-third">
        <polar-trend-plot :sensor-data="sensorData"></polar-trend-plot>
      </div>
    </div>
    <!-- Historic Trend Plot -->
    <div class="historic-trend-plot columns">
      <div class="column is-full">
        <historic-trend-plot :sensor-data="historicSensorData"></historic-trend-plot>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import RealTimeChart from './RealTimeChart.vue';
import PolarTrendPlot from './PolarTrendPlot.vue';
import HistoricTrendPlot from './HistoricTrendPlot.vue';

export default {
  components: {
    RealTimeChart,
    PolarTrendPlot,
    HistoricTrendPlot
  },
  data() {
    return {
      selectedPlant: null,
      selectedAsset: null,
      searchQuery: '',
      sensorData: [],
      historicSensorData: []
    };
  },
  computed: {
    ...mapState(['plants', 'assets', 'sensors']),
    filteredSensors() {
      // Filter sensors based on selected plant, asset, and search query
      return this.sensors.filter(sensor => {
        return (
          sensor.plantId === this.selectedPlant &&
          sensor.assetId === this.selectedAsset &&
          sensor.sensorName.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      });
    }
  },
  methods: {
    statusColor(status) {
      // Return the class for status color
      switch (status) {
        case 'good':
          return 'has-text-success';
        case 'attention':
          return 'has-text-warning';
        case 'intervention':
          return 'has-text-danger';
        default:
          return '';
      }
    }
  },
  mounted() {
    // TODO: Fetch sensor data and historic data
  }
};
</script>

<style scoped>
/* Add styles for dashboard components */
</style>