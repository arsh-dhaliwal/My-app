# ThermWatch

ThermWatch is a temperature monitoring solution designed for high-value assets located inside plants. It serves plant operators by providing temperature data insights on assets, enabling better planning and operation of plant facilities.

## Features

- Single page dashboard application with intuitive navigation.
- Real-time temperature data display for selected sensors.
- Ability to switch between plants and assets.
- DAQ configuration for data acquisition using Modbus and/or MQTT protocols.
- Alerts and alarms system with configurable thresholds and notifications.
- Forms for managing company, plant, asset, and sensor profiles.
- Historical data analysis with graphical representations.
- Setup mode for initial configuration and demo mode with mock data.
- Dark themed UI with blue accents, customizable with company logo.
- Database management with .tmdb extension for easy backup and import.

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- Node.js (https://nodejs.org/)
- npm (https://www.npmjs.com/)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-repository/ThermWatch.git
   ```
2. Navigate to the cloned directory:
   ```
   cd ThermWatch
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Running the Application

To start the application, run the following command:
```
npm run electron:serve
```

## Database Setup

The application uses Better SQLite for database management. To initialize the database, run the script located at `src/db/initDb.js`. This will create a new database in the `db` folder with the necessary tables and relationships.

## Configuration

### DAQ Configuration

Configure your DAQ settings by navigating to the 'DAQ configuration page' within the app. This page allows you to set up communication with your sensors using Modbus and/or MQTT protocols.

### Alerts and Alarms

Set up alerts and alarms through the 'Alerts and Alarms' page. You can configure the temperature thresholds and the conditions for triggering yellow and red alerts.

## Adding Company Logo

To add your company logo to the UI, place your logo image in the `src/renderer/assets/` directory and name it `logo.png`. The application will automatically load and display your logo.

## Mock Data

For demonstration purposes, you can initiate the app in demo mode by clicking the 'Demo Mode' button during the initial setup. This will populate the application with mock data, including historical sensor data.

## Customization

The application's source code is extensively commented to facilitate customization. You can modify the UI, add new features, or integrate with additional services as needed.

## Licensing

ThermWatch is a commercial application. Please ensure you comply with the licensing terms provided in the `LICENSE` file.

## Support

For support, please open an issue in the GitHub repository or contact the support team at support@example.com.

## Contributing

Contributions to ThermWatch are welcome. Please read the `CONTRIBUTING.md` file for guidelines on how to contribute to the project.

## Authors

- Your Name - Initial work - [YourGitHub](https://github.com/YourGitHub)

## License

This project is licensed under the [LICENSE NAME] License - see the `LICENSE` file for details.

## Acknowledgments

- The ThermWatch team would like to thank all the contributors and users of the application.
- Special thanks to the admin-one-vue-bulma-dashboard template for providing a starting point for the UI design. (https://github.com/vikdiesel/admin-one-vue-bulma-dashboard)

**Note:** This README is a template and should be customized to fit the specifics of your application and organization.