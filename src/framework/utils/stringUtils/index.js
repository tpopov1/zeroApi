module.exports = class StringUtils {
  /**
   * Remove all spaces from string
   * @param {string} str current string
   * @returns {string} string without spaces
   */
  static removeAllSpacesFromString(str) {
    return str.replace(/\s/g, "");
  }

  /**
   * Get numbers from string
   * @param {string} str current string
   * @returns {number} result number
   */
  static getNumbersFromString(str) {
    const numbers = str.match(/\d+/g);
    return StringUtils.convertStringToNumber(numbers.join(""));
  }

  /**
   * Convert string to number
   * @param {string} str number like string
   * @returns {number} number
   */
  static convertStringToNumber(str) {
    return Number.parseInt(str, 10);
  }

  /**
   * Convert array to string
   * @param {string} str string
   * @returns {string} result string
   */
  static convertArrayToString(str, glue = "") {
    return str.join(glue);
  }

  /**
   * Replace all symbols from string
   * @param {string} str current string
   * @param {string} oldSymbol replaceable character
   * @param {string} newSymbol replacement character
   * @returns {string} string without spaces
   */
  static replaceSymbols(str, oldSymbol, newSymbol = "") {
    const re = new RegExp(oldSymbol, "g");
    return str.replace(re, newSymbol);
  }

  /**
   * Convert number to string
   * @param {number} num Number
   * @param {number} maxStringLength Max length of string
   * @returns {string} String
   */
  static convertNumberToString(num, maxStringLength) {
    const str = "" + num;
    return str.length <= maxStringLength
      ? str
      : `${str.slice(0, length - maxStringLength)},${str.slice(
          length - maxStringLength
        )}`;
  }

  /**
   * Remove non alphanumeric symbols from string
   * @param {string} str Dirty string
   * @returns {string} Pure string
   */
  static purifyString(str) {
    if (str === "—" || str === "") {
      return "0";
    } else {
      return str
        .split("\n")
        .join("")
        .replace(/[^a-z0-9]/gi, "")
        .toLowerCase();
    }
  }

  /**
   * Remove zeroes at start of string
   * @param {string} str String with zeroes at start
   * @returns {string} String without zeroes at start
   */
  static removeZeroesAtStart(str) {
    return str.replace(/^0+/, "");
  }

  /**
   * Convert string to array of key and value without alphanumeric symbols
   * @param {string} str String
   * @returns {Array<string>} Array of two strings: key and value with only alphanumeric symbols
   */
  static stringToPurifiedTuple(str) {
    const [key, value, _] = str.split(/:(.+)/);
    return [key, StringUtils.purifyString(value)];
  }

  /**
   * Split string by separator
   * @param {string} str source string
   * @param {string} separator separator
   * @returns {Array<string>} result array
   */
  static splitStringBySeparator(str, separator) {
    return str.split(separator);
  }
};
