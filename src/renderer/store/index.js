import { createStore } from 'vuex';
import { db } from '../utils/database.js';

export default createStore({
  state: {
    companyProfile: null,
    plantProfile: null,
    assetProfile: null,
    sensorProfile: null,
    temperatureData: [],
    alerts: [],
    alarms: [],
    temperatureUnit: 'Celsius',
    theme: 'dark',
  },
  mutations: {
    setCompanyProfile(state, profile) {
      state.companyProfile = profile;
    },
    setPlantProfile(state, profile) {
      state.plantProfile = profile;
    },
    setAssetProfile(state, profile) {
      state.assetProfile = profile;
    },
    setSensorProfile(state, profile) {
      state.sensorProfile = profile;
    },
    setTemperatureData(state, data) {
      state.temperatureData = data;
    },
    addAlert(state, alert) {
      state.alerts.push(alert);
    },
    addAlarm(state, alarm) {
      state.alarms.push(alarm);
    },
    setTemperatureUnit(state, unit) {
      state.temperatureUnit = unit;
    },
    setTheme(state, theme) {
      state.theme = theme;
    },
  },
  actions: {
    async fetchCompanyProfile({ commit }) {
      const company = await db.models.Company.findOne();
      commit('setCompanyProfile', company);
    },
    async fetchPlantProfile({ commit }) {
      const plant = await db.models.Plant.findOne();
      commit('setPlantProfile', plant);
    },
    async fetchAssetProfile({ commit }) {
      const asset = await db.models.Asset.findOne();
      commit('setAssetProfile', asset);
    },
    async fetchSensorProfile({ commit }) {
      const sensor = await db.models.Sensor.findOne();
      commit('setSensorProfile', sensor);
    },
    async fetchTemperatureData({ commit }) {
      const data = await db.models.Temperature.findAll();
      commit('setTemperatureData', data);
    },
    toggleTemperatureUnit({ commit, state }) {
      const newUnit = state.temperatureUnit === 'Celsius' ? 'Fahrenheit' : 'Celsius';
      commit('setTemperatureUnit', newUnit);
    },
    toggleTheme({ commit, state }) {
      const newTheme = state.theme === 'dark' ? 'light' : 'dark';
      commit('setTheme', newTheme);
    },
    addNewAlert({ commit }, alert) {
      commit('addAlert', alert);
    },
    addNewAlarm({ commit }, alarm) {
      commit('addAlarm', alarm);
    },
  },
  getters: {
    companyProfile: state => state.companyProfile,
    plantProfile: state => state.plantProfile,
    assetProfile: state => state.assetProfile,
    sensorProfile: state => state.sensorProfile,
    temperatureData: state => state.temperatureData,
    alerts: state => state.alerts,
    alarms: state => state.alarms,
    temperatureUnit: state => state.temperatureUnit,
    theme: state => state.theme,
  },
  modules: {
  }
});