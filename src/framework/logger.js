module.exports = class Logger {
  /**
   * Log info message
   * @param {string} message Message to log
   */
  static info(message) {
    const msg = `[INFO] ${new Date().toLocaleTimeString()} : ${message}`;
    console.log(msg);
  }

  /**
   * Log error message
   * @param {string} message Message to log
   */
  static error(message) {
    const msg = `[ERROR] ${new Date().toLocaleTimeString()} : ${message}`;
    console.log(msg);
  }
};
