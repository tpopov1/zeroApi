const moment = require("moment");

const ISO_FORMAT = "YYYY/MM/DD";
const YEARS = "years";

module.exports = class DateUtils {
  /**
   * Get current date in a calendar format
   * @returns {string} Current date {MM/DD/YYYY} format
   */
  static getCurrentDate() {
    const date = moment();
    return this.formatDateCalendar(date);
  }

  /**
   * Format date
   * @param {string} date Date
   * @param {string} format Format
   * @returns {string} Formatted date
   */
  static formatDate(date = moment(), format) {
    return moment(date).format(format);
  }

  /**
   * Sort array of dates in descending order
   * @param {Array<string>} array Array of dates
   * @returns {Array<string>} Array of dates sorted in descending order
   */
  static sortDateDesc(array) {
    return array.sort((a, b) => new Date(b) - new Date(a));
  }

  /**
   * Add years to current year
   * @param {number} yearStep Number of years to add
   * @returns {string} Current year + yearStep in {YYYY/MM/DD} format
   */
  static addYearsToCurrentYear(yearStep) {
    const newDate = moment().add(yearStep, YEARS);
    return this.formatDate(newDate, ISO_FORMAT);
  }
};
