<template>
  <div id="daq-config">
    <h1 class="title">DAQ Configuration</h1>
    <div class="columns">
      <div class="column is-half">
        <h2 class="subtitle">Modbus Configuration</h2>
        <modbus-config-form @update-config="updateModbusConfig"></modbus-config-form>
      </div>
      <div class="column is-half">
        <h2 class="subtitle">MQTT Configuration</h2>
        <mqtt-config-form @update-config="updateMqttConfig"></mqtt-config-form>
      </div>
    </div>
  </div>
</template>

<script>
import ModbusConfigForm from '../components/ModbusConfigForm.vue';
import MqttConfigForm from '../components/MqttConfigForm.vue';
import { configureDAQ } from '../utils/modbus.js';
import { configureMQTT } from '../utils/mqtt.js';

export default {
  components: {
    ModbusConfigForm,
    MqttConfigForm
  },
  methods: {
    updateModbusConfig(config) {
      configureDAQ(config)
        .then(() => {
          this.$buefy.toast.open({
            message: 'Modbus configuration updated successfully!',
            type: 'is-success'
          });
        })
        .catch(error => {
          this.$buefy.toast.open({
            message: `Failed to update Modbus configuration: ${error.message}`,
            type: 'is-danger'
          });
        });
    },
    updateMqttConfig(config) {
      configureMQTT(config)
        .then(() => {
          this.$buefy.toast.open({
            message: 'MQTT configuration updated successfully!',
            type: 'is-success'
          });
        })
        .catch(error => {
          this.$buefy.toast.open({
            message: `Failed to update MQTT configuration: ${error.message}`,
            type: 'is-danger'
          });
        });
    }
  }
};
</script>

<style scoped>
#daq-config {
  padding: 20px;
}
.title {
  margin-bottom: 20px;
}
.subtitle {
  margin-bottom: 10px;
}
</style>