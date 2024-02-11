<template>
  <div id="plant-profile">
    <h1 class="title">Plant Profile</h1>
    <form @submit.prevent="savePlantProfile">
      <div class="field">
        <label class="label">Plant Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="Enter plant name" v-model="plant.plantName" required>
        </div>
      </div>
      <div class="field">
        <label class="label">Address</label>
        <div class="control">
          <input class="input" type="text" placeholder="Enter address" v-model="plant.address" required>
        </div>
      </div>
      <div class="field-body">
        <div class="field">
          <label class="label">City</label>
          <div class="control">
            <input class="input" type="text" placeholder="Enter city" v-model="plant.city" required>
          </div>
        </div>
        <div class="field">
          <label class="label">State/Province</label>
          <div class="control">
            <input class="input" type="text" placeholder="Enter state or province" v-model="plant.state" required>
          </div>
        </div>
      </div>
      <div class="field-body">
        <div class="field">
          <label class="label">Country</label>
          <div class="control">
            <input class="input" type="text" placeholder="Enter country" v-model="plant.country" required>
          </div>
        </div>
        <div class="field">
          <label class="label">Zip Code/Postal Code</label>
          <div class="control">
            <input class="input" type="text" placeholder="Enter zip or postal code" v-model="plant.zipCode" required>
          </div>
        </div>
      </div>
      <div class="field-body">
        <div class="field">
          <label class="label">Phone Number</label>
          <div class="control">
            <input class="input" type="tel" placeholder="Enter phone number" v-model="plant.phoneNumber">
          </div>
        </div>
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input class="input" type="email" placeholder="Enter email" v-model="plant.email">
          </div>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button class="button is-primary">Save</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'PlantProfile',
  setup() {
    const store = useStore();
    const plant = ref({
      plantName: '',
      address: '',
      city: '',
      state: '',
      country: '',
      zipCode: '',
      phoneNumber: '',
      email: ''
    });

    const savePlantProfile = () => {
      store.dispatch('savePlantProfile', plant.value);
    };

    return {
      plant,
      savePlantProfile
    };
  }
};
</script>

<style scoped>
#plant-profile {
  max-width: 600px;
  margin: auto;
}
</style>