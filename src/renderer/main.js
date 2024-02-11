import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { initializeDatabase } from './utils/database';
import './assets/logo.png'; // Assuming the logo is stored in the assets folder

// Initialize the database
initializeDatabase();

// Create Vue application
const app = createApp(App);

// Use router and store
app.use(router);
app.use(store);

// Mount the application to the #app div in index.html
app.mount('#app');