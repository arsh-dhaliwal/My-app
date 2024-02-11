<template>
  <div id="app">
    <NavBar />
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  name: 'App',
  components: {
    NavBar
  },
  data() {
    return {
      // Shared state and methods will be added here if needed
    };
  },
  created() {
    // Initial setup or state loading can be performed here
  },
  methods: {
    // Helper methods for the app can be added here
  }
};
</script>

<style scoped>
/* Custom styles for the app can be added here */
</style>