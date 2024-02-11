<template>
  <div id="asset-profile">
    <h1 class="title">Asset Profile</h1>
    <form @submit.prevent="saveAsset">
      <div class="field">
        <label class="label">Asset Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="Enter Asset Name" v-model="asset.assetName" required>
        </div>
      </div>

      <div class="field">
        <label class="label">Plant</label>
        <div class="control">
          <div class="select">
            <select v-model="asset.plantId" required>
              <option v-for="plant in plants" :key="plant.id" :value="plant.id">{{ plant.plantName }}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">Capacity</label>
        <div class="control">
          <input class="input" type="number" placeholder="Enter Capacity" v-model="asset.capacity" required>
        </div>
      </div>

      <div class="field">
        <label class="label">Rating</label>
        <div class="control">
          <input class="input" type="number" placeholder="Enter Rating" v-model="asset.rating" required>
        </div>
      </div>

      <div class="field">
        <label class="label">Temperature Threshold</label>
        <div class="control">
          <input class="input" type="number" placeholder="Enter Temperature Threshold" v-model="asset.temperatureThreshold" required>
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
  name: 'AssetProfile',
  setup() {
    const store = useStore();
    const asset = ref({
      assetName: '',
      plantId: null,
      capacity: 0,
      rating: 0,
      temperatureThreshold: 0
    });
    const plants = ref([]);

    const saveAsset = () => {
      // Save asset to the database
      store.dispatch('saveAsset', asset.value);
    };

    const resetForm = () => {
      asset.value = {
        assetName: '',
        plantId: null,
        capacity: 0,
        rating: 0,
        temperatureThreshold: 0
      };
    };

    const loadPlants = async () => {
      // Load plants from the database
      plants.value = await store.dispatch('fetchPlants');
    };

    loadPlants();

    return {
      asset,
      plants,
      saveAsset,
      resetForm
    };
  }
};
</script>

<style scoped>
#asset-profile {
  max-width: 600px;
  margin: auto;
}
</style>