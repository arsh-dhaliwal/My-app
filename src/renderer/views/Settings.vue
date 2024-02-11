<template>
  <div id="settings">
    <h1 class="title">Settings</h1>
    <div class="tabs">
      <ul>
        <li v-bind:class="{ 'is-active': activeTab === 'company' }">
          <a @click="activeTab = 'company'">Company Profile</a>
        </li>
        <li v-bind:class="{ 'is-active': activeTab === 'plant' }">
          <a @click="activeTab = 'plant'">Plant Profile</a>
        </li>
        <li v-bind:class="{ 'is-active': activeTab === 'asset' }">
          <a @click="activeTab = 'asset'">Asset Profile</a>
        </li>
        <li v-bind:class="{ 'is-active': activeTab === 'sensor' }">
          <a @click="activeTab = 'sensor'">Sensor Profile</a>
        </li>
        <li v-bind:class="{ 'is-active': activeTab === 'daq' }">
          <a @click="activeTab = 'daq'">DAQ Configuration</a>
        </li>
        <li v-bind:class="{ 'is-active': activeTab === 'alerts' }">
          <a @click="activeTab = 'alerts'">Alerts and Alarms</a>
        </li>
      </ul>
    </div>
    <div class="tab-content">
      <company-profile-form v-if="activeTab === 'company'"></company-profile-form>
      <plant-profile-form v-if="activeTab === 'plant'"></plant-profile-form>
      <asset-profile-form v-if="activeTab === 'asset'"></asset-profile-form>
      <sensor-profile-form v-if="activeTab === 'sensor'"></sensor-profile-form>
      <daq-configuration v-if="activeTab === 'daq'"></daq-configuration>
      <alerts-alarms v-if="activeTab === 'alerts'"></alerts-alarms>
    </div>
  </div>
</template>

<script>
import CompanyProfileForm from '../components/CompanyProfileForm.vue';
import PlantProfileForm from '../components/PlantProfileForm.vue';
import AssetProfileForm from '../components/AssetProfileForm.vue';
import SensorProfileForm from '../components/SensorProfileForm.vue';
import DAQConfiguration from '../components/DAQConfiguration.vue';
import AlertsAlarms from '../components/AlertsAlarms.vue';

export default {
  components: {
    CompanyProfileForm,
    PlantProfileForm,
    AssetProfileForm,
    SensorProfileForm,
    DAQConfiguration,
    AlertsAlarms
  },
  data() {
    return {
      activeTab: 'company'
    };
  },
  methods: {
    // Add methods to handle form submissions, data fetching, and other interactions
  }
};
</script>

<style scoped>
#settings {
  /* Add styles for the settings page */
}
</style>