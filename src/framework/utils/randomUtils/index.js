const generator = require("generate-password");
const { uniqueNamesGenerator, names } = require("unique-names-generator");

module.exports = class RandomUtil {
  /**
   * Get random int number
   * @param {number} min min number
   * @param {number} max max number
   * @returns {number} generated number
   */
  static getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Get random password
   * @param {number} length length of string
   * @returns {string} generated string
   */
  static generateRandomPassword(length) {
    return generator.generate({ length: length, numbers: true, strict: true });
  }

  /**
   * Get random string
   * @param {number} length length of string
   * @returns {string} generated string
   */
  static generateRandomString(length) {
    return uniqueNamesGenerator({ dictionaries: [names], length: length });
  }

  /**
   * Get random string by length
   * @param {number} length asked length
   * @returns {string} generated string
   */
  static generateStringByLength(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
};
