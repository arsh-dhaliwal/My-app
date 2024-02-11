<template>
  <div id="plant-profile-form">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          Plant Profile
        </p>
      </header>
      <div class="card-content">
        <div class="content">
          <form @submit.prevent="submitForm">
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
            <div class="field">
              <label class="label">Phone Number</label>
              <div class="control">
                <input class="input" type="tel" placeholder="Enter phone number" v-model="plant.phoneNumber" required>
              </div>
            </div>
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input class="input" type="email" placeholder="Enter email" v-model="plant.email" required>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <button class="button is-primary" type="submit">Save Plant Profile</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'PlantProfileForm',
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

    const submitForm = () => {
      // TODO: Implement plant profile submission logic
      // This should include validation and then either updating an existing plant profile
      // or creating a new one in the database.
      console.log('Plant profile submitted:', plant.value);
      // store.dispatch('savePlantProfile', plant.value);
    };

    return {
      plant,
      submitForm
    };
  }
};
</script>

<style scoped>
/* Add any specific styling for the plant profile form here */
</style>