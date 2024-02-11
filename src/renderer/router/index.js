import { createRouter, createWebHashHistory } from 'vue-router';

import Home from '../views/Home.vue';
import Settings from '../views/Settings.vue';
import DAQ from '../views/DAQ.vue';
import Alerts from '../views/Alerts.vue';
import CompanyProfile from '../views/CompanyProfile.vue';
import PlantProfile from '../views/PlantProfile.vue';
import AssetProfile from '../views/AssetProfile.vue';
import SensorProfile from '../views/SensorProfile.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    children: [
      {
        path: 'daq-configuration',
        name: 'DAQConfiguration',
        component: DAQ
      },
      {
        path: 'alerts-alarms',
        name: 'AlertsAlarms',
        component: Alerts
      },
      {
        path: 'company-profile',
        name: 'CompanyProfile',
        component: CompanyProfile
      },
      {
        path: 'plant-profile',
        name: 'PlantProfile',
        component: PlantProfile
      },
      {
        path: 'asset-profile',
        name: 'AssetProfile',
        component: AssetProfile
      },
      {
        path: 'sensor-profile',
        name: 'SensorProfile',
        component: SensorProfile
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;