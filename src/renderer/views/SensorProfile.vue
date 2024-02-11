<template>
  <div id="sensor-profile">
    <h1 class="title">Sensor Profile</h1>
    <form @submit.prevent="saveSensorProfile">
      <div class="field">
        <label class="label">Sensor Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="Enter Sensor Name" v-model="sensorProfile.sensorName" required>
        </div>
      </div>

      <div class="field">
        <label class="label">Sensor Family</label>
        <div class="control">
          <input class="input" type="text" placeholder="Enter Sensor Family" v-model="sensorProfile.sensorFamily" required>
        </div>
      </div>

      <div class="field">
        <label class="label">Sensor Type</label>
        <div class="control">
          <input class="input" type="text" placeholder="Enter Sensor Type" v-model="sensorProfile.sensorType" required>
        </div>
      </div>

      <div class="field">
        <label class="label">Sensor Variant</label>
        <div class="control">
          <input class="input" type="text" placeholder="Enter Sensor Variant" v-model="sensorProfile.sensorVariant" required>
        </div>
      </div>

      <div class="field">
        <label class="label">Asset</label>
        <div class="control">
          <div class="select">
            <select v-model="sensorProfile.assetId" required>
              <option v-for="asset in assets" :key="asset.id" :value="asset.id">{{ asset.assetName }}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">Position</label>
        <div class="control">
          <input class="input" type="number" placeholder="Enter Sensor Position" v-model="sensorProfile.position" required>
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link">Submit</button>
        </div>
        <div class="control">
          <button class="button is-link is-light" @click="resetForm">Cancel</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'SensorProfile',
  setup() {
    const store = useStore();
    const sensorProfile = ref({
      sensorName: '',
      sensorFamily: '',
      sensorType: '',
      sensorVariant: '',
      assetId: null,
      position: 0
    });
    const assets = ref([]);

    const saveSensorProfile = () => {
      // Logic to save sensor profile to the database
      store.dispatch('saveSensorProfile', sensorProfile.value);
    };

    const resetForm = () => {
      sensorProfile.value = {
        sensorName: '',
        sensorFamily: '',
        sensorType: '',
        sensorVariant: '',
        assetId: null,
        position: 0
      };
    };

    // Fetch assets for the select dropdown
    const fetchAssets = async () => {
      const response = await store.dispatch('fetchAssets');
      assets.value = response;
    };

    fetchAssets();

    return {
      sensorProfile,
      assets,
      saveSensorProfile,
      resetForm
    };
  }
};
</script>

<style scoped>
#sensor-profile {
  max-width: 600px;
  margin: auto;
}
</style>