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
              <option v-for="asset in filteredAssets" :key="asset.id" :value="asset.id">{{ asset.assetName }}</option>
            </select>
          </div>
        </div>
      </div>
      <!-- Search Feature -->
      <div class="field">
        <label class="label">Search</label>
        <div class="control">
          <input class="input" type="text" placeholder="Search..." v-model="searchQuery">
        </div>
      </div>
    </div>
    <div class="dashboard-content">
      <!-- Sensor Cards -->
      <div class="columns is-multiline">
        <sensor-card
          v-for="sensor in filteredSensors"
          :key="sensor.id"
          :sensor="sensor"
          :unit="temperatureUnit"
          @toggleUnit="toggleTemperatureUnit"
        ></sensor-card>
      </div>
      <!-- Real-time Chart -->
      <real-time-chart
        :sensors="filteredSensors"
        :unit="temperatureUnit"
      ></real-time-chart>
      <!-- Polar Trend Plot -->
      <polar-trend-plot
        :sensors="filteredSensors"
        :unit="temperatureUnit"
        :selectedStat="selectedStat"
      ></polar-trend-plot>
      <!-- Historic Trend Plot -->
      <historic-trend-plot
        :sensors="filteredSensors"
        :unit="temperatureUnit"
      ></historic-trend-plot>
      <!-- Polar Trend Plot Historical Data -->
      <polar-trend-plot-historical
        :sensors="filteredSensors"
        :unit="temperatureUnit"
        :selectedDay="selectedDay"
      ></polar-trend-plot-historical>
    </div>
  </div>
</template>

<script>
import SensorCard from '../components/SensorCard.vue';
import RealTimeChart from '../components/RealTimeChart.vue';
import PolarTrendPlot from '../components/PolarTrendPlot.vue';
import HistoricTrendPlot from '../components/HistoricTrendPlot.vue';
import PolarTrendPlotHistorical from '../components/PolarTrendPlotHistorical.vue';

export default {
  components: {
    SensorCard,
    RealTimeChart,
    PolarTrendPlot,
    HistoricTrendPlot,
    PolarTrendPlotHistorical
  },
  data() {
    return {
      plants: [],
      assets: [],
      sensors: [],
      selectedPlant: null,
      selectedAsset: null,
      searchQuery: '',
      temperatureUnit: 'Celsius',
      selectedStat: 'average',
      selectedDay: new Date().toISOString().substr(0, 10)
    };
  },
  computed: {
    filteredAssets() {
      return this.assets.filter(asset => asset.plantId === this.selectedPlant);
    },
    filteredSensors() {
      return this.sensors.filter(sensor => sensor.assetId === this.selectedAsset && sensor.sensorName.includes(this.searchQuery));
    }
  },
  methods: {
    toggleTemperatureUnit() {
      this.temperatureUnit = this.temperatureUnit === 'Celsius' ? 'Fahrenheit' : 'Celsius';
    }
  },
  mounted() {
    // Fetch plants, assets, and sensors from the database
    // This is a placeholder, actual implementation will require database integration
    this.plants = this.fetchPlants();
    this.assets = this.fetchAssets();
    this.sensors = this.fetchSensors();
  },
  // Placeholder methods for fetching data, to be replaced with actual database calls
  methods: {
    fetchPlants() {
      // Fetch plant data from the database
    },
    fetchAssets() {
      // Fetch asset data from the database
    },
    fetchSensors() {
      // Fetch sensor data from the database
    }
  }
};
</script>

<style scoped>
/* Add styles for the Home view here */
</style>