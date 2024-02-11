<template>
  <div id="company-profile">
    <h1 class="title">Company Profile</h1>
    <form @submit.prevent="saveCompanyProfile">
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

      <div class="field-body">
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
  name: 'CompanyProfile',
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

    const saveCompanyProfile = () => {
      store.dispatch('saveCompanyProfile', company.value);
    };

    return {
      company,
      saveCompanyProfile
    };
  }
};
</script>

<style scoped>
#company-profile {
  padding: 20px;
}

.title {
  margin-bottom: 20px;
}

.field-body {
  display: flex;
  justify-content: space-between;
}

.field-body .field {
  width: 48%;
}

.button {
  margin-top: 10px;
}
</style>