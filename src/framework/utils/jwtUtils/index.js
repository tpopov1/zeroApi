const jwt_decode = require("jwt-decode");
const Logger = require("../../logger");

class JwtUtil {
  /**
   * Decode token
   * @param {string} token Token
   * @returns {object} Decoded token
   */
  static async decode(token) {
    Logger.info("Decode jwt token.");
    return jwt_decode(token);
  }
}

module.exports = JwtUtil;
