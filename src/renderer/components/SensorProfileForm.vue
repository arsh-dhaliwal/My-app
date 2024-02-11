<template>
  <div id="sensor-profile-form">
    <h2 class="title">Sensor Profile</h2>
    <form @submit.prevent="submitForm">
      <div class="field">
        <label class="label">Sensor Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="Enter sensor name" v-model="sensorProfile.sensorName" required>
        </div>
      </div>

      <div class="field">
        <label class="label">Sensor Family</label>
        <div class="control">
          <input class="input" type="text" placeholder="Enter sensor family" v-model="sensorProfile.sensorFamily" required>
        </div>
      </div>

      <div class="field">
        <label class="label">Sensor Type</label>
        <div class="control">
          <input class="input" type="text" placeholder="Enter sensor type" v-model="sensorProfile.sensorType" required>
        </div>
      </div>

      <div class="field">
        <label class="label">Sensor Variant</label>
        <div class="control">
          <input class="input" type="text" placeholder="Enter sensor variant" v-model="sensorProfile.sensorVariant" required>
        </div>
      </div>

      <div class="field">
        <label class="label">Asset</label>
        <div class="control">
          <div class="select">
            <select v-model="sensorProfile.assetId" required>
              <option value="" disabled>Select asset</option>
              <option v-for="asset in assets" :key="asset.id" :value="asset.id">{{ asset.assetName }}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">Position</label>
        <div class="control">
          <input class="input" type="number" placeholder="Enter sensor position" v-model="sensorProfile.position" required>
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
  name: 'SensorProfileForm',
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

    const submitForm = () => {
      store.dispatch('updateSensorProfile', sensorProfile.value);
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

    const loadAssets = async () => {
      assets.value = await store.dispatch('fetchAssets');
    };

    loadAssets();

    return {
      sensorProfile,
      assets,
      submitForm,
      resetForm
    };
  }
};
</script>

<style scoped>
#sensor-profile-form {
  max-width: 600px;
  margin: auto;
}
</style>