// src/renderer/utils/temperatureConversion.js

/**
 * Utility functions for converting temperatures between Fahrenheit and Celsius.
 */

/**
 * Converts a temperature from Celsius to Fahrenheit.
 * @param {number} celsius - The temperature in Celsius.
 * @returns {number} The temperature in Fahrenheit.
 */
function celsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

/**
 * Converts a temperature from Fahrenheit to Celsius.
 * @param {number} fahrenheit - The temperature in Fahrenheit.
 * @returns {number} The temperature in Celsius.
 */
function fahrenheitToCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

/**
 * Toggles the temperature unit of a given temperature value.
 * @param {number} temperature - The temperature value to convert.
 * @param {string} currentUnit - The current unit of the temperature ('C' for Celsius, 'F' for Fahrenheit).
 * @returns {object} An object containing the converted temperature and its unit.
 */
function toggleTemperatureUnit(temperature, currentUnit) {
  if (currentUnit === 'C') {
    return {
      temperature: celsiusToFahrenheit(temperature),
      unit: 'F'
    };
  } else if (currentUnit === 'F') {
    return {
      temperature: fahrenheitToCelsius(temperature),
      unit: 'C'
    };
  } else {
    throw new Error('Invalid temperature unit provided. Must be "C" or "F".');
  }
}

export {
  celsiusToFahrenheit,
  fahrenheitToCelsius,
  toggleTemperatureUnit
};