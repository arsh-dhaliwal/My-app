const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  saveDatabaseState: (data) => ipcRenderer.invoke('save-database-state', data),
  importDatabase: (filePath) => ipcRenderer.invoke('import-database', filePath),
  configureDAQ: (config) => ipcRenderer.invoke('configure-daq', config),
  calculateTemperatureStats: () => ipcRenderer.invoke('calculate-temperature-stats'),
  sendNotification: (notification) => ipcRenderer.invoke('send-notification', notification),
  sendEmailAlert: (emailDetails) => ipcRenderer.invoke('send-email-alert', emailDetails),
  generateMockData: () => ipcRenderer.invoke('generate-mock-data'),
  toggleTemperatureUnit: (unit) => ipcRenderer.invoke('toggle-temperature-unit', unit),
  updateChart: (chartData) => ipcRenderer.invoke('update-chart', chartData),
  updatePolarPlot: (plotData) => ipcRenderer.invoke('update-polar-plot', plotData),
  updateHistoricTrend: (trendData) => ipcRenderer.invoke('update-historic-trend', trendData),
  setupMode: (setupData) => ipcRenderer.invoke('setup-mode', setupData),
  applyTheme: (theme) => ipcRenderer.invoke('apply-theme', theme),
  manageLicense: (licenseData) => ipcRenderer.invoke('manage-license', licenseData),
  onTemperatureUpdate: (callback) => ipcRenderer.on('temperature-update', callback),
  onAlertTriggered: (callback) => ipcRenderer.on('alert-triggered', callback),
  onAlarmTriggered: (callback) => ipcRenderer.on('alarm-triggered', callback),
});