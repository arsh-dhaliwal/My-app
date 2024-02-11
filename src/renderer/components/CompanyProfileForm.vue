<template>
  <div id="company-profile-form">
    <h2 class="title">Company Profile</h2>
    <form @submit.prevent="submitForm">
      <div class="field">
        <label class="label">Company Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="Enter company name" v-model="company.companyName" required>
        </div>
      </div>

      <div class="field">
        <label class="label">Address</label>
        <div class="control">
          <input class="input" type="text" placeholder="Enter address" v-model="company.address" required>
        </div>
      </div>

      <div class="field-body">
        <div class="field">
          <label class="label">City</label>
          <div class="control">
            <input class="input" type="text" placeholder="Enter city" v-model="company.city" required>
          </div>
        </div>

        <div class="field">
          <label class="label">State/Province</label>
          <div class="control">
            <input class="input" type="text" placeholder="Enter state or province" v-model="company.state" required>
          </div>
        </div>

        <div class="field">
          <label class="label">Country</label>
          <div class="control">
            <input class="input" type="text" placeholder="Enter country" v-model="company.country" required>
          </div>
        </div>

        <div class="field">
          <label class="label">Zip Code/Postal Code</label>
          <div class="control">
            <input class="input" type="text" placeholder="Enter zip or postal code" v-model="company.zipCode" required>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">Phone Number</label>
        <div class="control">
          <input class="input" type="tel" placeholder="Enter phone number" v-model="company.phoneNumber" required>
        </div>
      </div>

      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input class="input" type="email" placeholder="Enter email" v-model="company.email" required>
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
  name: 'CompanyProfileForm',
  setup() {
    const store = useStore();
    const company = ref({
      companyName: '',
      address: '',
      city: '',
      state: '',
      country: '',
      zipCode: '',
      phoneNumber: '',
      email: ''
    });

    const submitForm = () => {
      store.dispatch('updateCompanyProfile', company.value);
    };

    return {
      company,
      submitForm
    };
  }
};
</script>

<style scoped>
#company-profile-form {
  max-width: 600px;
  margin: auto;
}
</style>