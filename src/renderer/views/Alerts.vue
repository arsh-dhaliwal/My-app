<template>
  <div id="alerts-alarms">
    <h1 class="title">Alerts & Alarms</h1>
    <div class="notification-area">
      <div v-for="alert in alerts" :key="alert.id" :class="`notification is-${alert.status}`">
        <button class="delete" @click="dismissAlert(alert.id)"></button>
        {{ alert.message }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Alerts',
  computed: {
    ...mapState({
      alerts: state => state.alerts
    })
  },
  methods: {
    ...mapActions({
      dismissAlert: 'dismissAlert'
    })
  }
};
</script>

<style scoped>
.notification-area {
  max-height: 300px;
  overflow-y: auto;
}
</style>