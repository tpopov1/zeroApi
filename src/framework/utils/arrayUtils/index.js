const Logger = require("../../logger");

module.exports = class ArrayUtils {
  /**
   * Get keys from an object
   * @param {object} object Object to get keys from
   * @returns {Array<string>} Keys from object
   */
  static getKeysArray(object) {
    Logger.info(`Received array: ${Object.keys(object)}`);
    return Object.keys(object);
  }

  /**
   * Get values from an object
   * @param {object} object Object to get values from
   * @returns {Array<string>} Values from object
   */
  static getValuesArray(object) {
    const values = [];
    for (let i = 0; i < Object.keys(object).length; i++) {
      for (let ii = 0; ii < Object.values(object)[i].length; ii++) {
        values.push(Object.values(object)[i][ii]);
      }
    }
    Logger.info(`Received array: ${values}`);
    return values;
  }

  /**
   * Get unique values from array
   * @param {Array<any>} array Array of values
   * @returns {Array<any>} Array of unique values
   */
  static getUniqueArray(array) {
    Logger.info(`Get unique values from the array: ${array}`);
    return Array.from(new Set(array));
  }

  /**
   * Filter keys of an object
   * @param {Array<any>} keys Keys to save
   * @param {object} object Object to filter
   * @returns {object} Filtered object
   */
  static filterObjectKeys(keys, object) {
    const filteredObject = {};
    for (const key of keys) {
      filteredObject[key] = object[key];
    }
    return filteredObject;
  }
};
