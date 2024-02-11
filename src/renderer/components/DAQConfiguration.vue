<template>
  <div class="daq-configuration">
    <h2 class="title">DAQ Configuration</h2>
    <div class="field">
      <label class="label">Communication Protocol</label>
      <div class="control">
        <div class="select">
          <select v-model="selectedProtocol">
            <option value="modbus">Modbus</option>
            <option value="mqtt">MQTT</option>
          </select>
        </div>
      </div>
    </div>

    <div v-if="selectedProtocol === 'modbus'">
      <modbus-configuration :config="modbusConfig" @updateConfig="updateModbusConfig"></modbus-configuration>
    </div>

    <div v-if="selectedProtocol === 'mqtt'">
      <mqtt-configuration :config="mqttConfig" @updateConfig="updateMqttConfig"></mqtt-configuration>
    </div>

    <div class="field">
      <div class="control">
        <button class="button is-primary" @click="saveConfiguration">Save Configuration</button>
      </div>
    </div>
  </div>
</template>

<script>
import ModbusConfiguration from './ModbusConfiguration.vue';
import MqttConfiguration from './MqttConfiguration.vue';
import { ref } from 'vue';

export default {
  components: {
    ModbusConfiguration,
    MqttConfiguration
  },
  setup() {
    const selectedProtocol = ref('modbus');
    const modbusConfig = ref({});
    const mqttConfig = ref({});

    function updateModbusConfig(newConfig) {
      modbusConfig.value = newConfig;
    }

    function updateMqttConfig(newConfig) {
      mqttConfig.value = newConfig;
    }

    function saveConfiguration() {
      // TODO: Implement save configuration logic
      console.log('Configuration saved:', selectedProtocol.value === 'modbus' ? modbusConfig.value : mqttConfig.value);
    }

    return {
      selectedProtocol,
      modbusConfig,
      mqttConfig,
      updateModbusConfig,
      updateMqttConfig,
      saveConfiguration
    };
  }
};
</script>

<style scoped>
.daq-configuration {
  /* Styles for DAQ Configuration component */
}
</style>