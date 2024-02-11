<template>
  <div class="asset-profile-form">
    <h2 class="title">Asset Profile</h2>
    <form @submit.prevent="submitForm">
      <div class="field">
        <label class="label" for="assetName">Asset Name</label>
        <div class="control">
          <input class="input" type="text" id="assetName" v-model="asset.assetName" required>
        </div>
      </div>

      <div class="field">
        <label class="label" for="plantId">Plant</label>
        <div class="control">
          <div class="select">
            <select id="plantId" v-model="asset.plantId" required>
              <option v-for="plant in plants" :key="plant.id" :value="plant.id">{{ plant.plantName }}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label" for="capacity">Capacity</label>
        <div class="control">
          <input class="input" type="number" id="capacity" v-model="asset.capacity" required>
        </div>
      </div>

      <div class="field">
        <label class="label" for="rating">Rating</label>
        <div class="control">
          <input class="input" type="number" id="rating" v-model="asset.rating" required>
        </div>
      </div>

      <div class="field">
        <label class="label" for="temperatureThreshold">Temperature Threshold</label>
        <div class="control">
          <input class="input" type="number" id="temperatureThreshold" v-model="asset.temperatureThreshold" required>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <button class="button is-primary" type="submit">Save</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'AssetProfileForm',
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

    // Fetch plants from the store or API
    const fetchPlants = async () => {
      // Replace with actual store action or API call
      plants.value = await store.dispatch('fetchPlants');
    };

    const submitForm = () => {
      // Replace with actual store action or API call
      store.dispatch('saveAsset', asset.value);
    };

    fetchPlants();

    return {
      asset,
      plants,
      submitForm
    };
  }
};
</script>

<style scoped>
.asset-profile-form {
  max-width: 600px;
  margin: auto;
}
</style>