import { createApp } from 'vue';
import { createStore } from 'vuex';
import { createRouter, createWebHashHistory } from 'vue-router';
import App from '../App.vue';
import { db, models } from './database';
import mockDataGenerator from './mockDataGenerator';
import CompanyProfile from '../views/CompanyProfile.vue';
import PlantProfile from '../views/PlantProfile.vue';
import AssetProfile from '../views/AssetProfile.vue';
import SensorProfile from '../views/SensorProfile.vue';

// Define routes for setup mode
const routes = [
  { path: '/company-profile', component: CompanyProfile },
  { path: '/plant-profile', component: PlantProfile },
  { path: '/asset-profile', component: AssetProfile },
  { path: '/sensor-profile', component: SensorProfile },
];

// Create a Vuex store for state management during setup
const store = createStore({
  state() {
    return {
      company: null,
      plants: [],
      assets: [],
      sensors: [],
    };
  },
  mutations: {
    setCompany(state, company) {
      state.company = company;
    },
    addPlant(state, plant) {
      state.plants.push(plant);
    },
    addAsset(state, asset) {
      state.assets.push(asset);
    },
    addSensor(state, sensor) {
      state.sensors.push(sensor);
    },
  },
  actions: {
    saveCompany({ commit }, companyData) {
      commit('setCompany', companyData);
      // Save to database
      models.Company.create(companyData);
    },
    savePlant({ commit }, plantData) {
      commit('addPlant', plantData);
      // Save to database
      models.Plant.create(plantData);
    },
    saveAsset({ commit }, assetData) {
      commit('addAsset', assetData);
      // Save to database
      models.Asset.create(assetData);
    },
    saveSensor({ commit }, sensorData) {
      commit('addSensor', sensorData);
      // Save to database
      models.Sensor.create(sensorData);
    },
  },
});

// Create a Vue router instance for navigation during setup
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// Function to start the setup mode
export function setupMode(demoMode = false) {
  if (demoMode) {
    // Generate mock data for demonstration
    mockDataGenerator.generateMockData(db);
  } else {
    // Initialize the database
    db.initializeDatabase().then(() => {
      // Create the Vue app instance with the setup components
      const app = createApp(App);

      // Use the store and router
      app.use(store);
      app.use(router);

      // Mount the app to the #app element in the DOM
      app.mount('#app');
    });
  }
}