const axios = require("axios");
const timeouts = require("../../../../configs/environment/timeouts");
const Logger = require("../../logger");
const url = require("url");

/** Class for executing API requests. */
class APIUtils {
  /**
   * Create a APIUtils.
   * @param {string} baseURL - Host url for API requests.
   * @param {Object} headers - Headers url for API requests.
   * @param {number} timeout - Timeout for API request execution.
   */
  authHeader = {};
  constructor(baseURL = "", headers = {}, timeout = timeouts.apiRequest) {
    this.baseURL = baseURL;
    this.instance = axios.create({
      baseURL: this.baseURL,
      timeout: timeout,
      headers: headers,
    });
  }

  /**
   * Get a created API instance
   * @returns {Object} API instance
   */
  getInstance() {
    return this.instance;
  }

  /**
   * Get the token header
   * @returns {Object} Token value
   */
  get authHeader() {
    return this.authHeader;
  }

  /**
   * Set the value for the header
   * @param {Object} url Token value
   */
  set authHeader(value) {
    this.authHeader = value;
  }

  /**
   * Convert x-www-form-urlencoded parameters to string
   * @param {Object} data in the form of an object
   * @returns {string} correct data for a request
   */
  static convert_x_www_form_urlencoded_toString(data) {
    return new url.URLSearchParams(data).toString();
  }

  /**
   * Get request
   * @param {string} url URL that will be used for the request
   * @param {Object} config config options for making requests
   * @returns {Object} API Response
   */
  async getRequest(url, config = {}) {
    const fullURL = `${this.baseURL}${url}`;
    try {
      const response = await this.instance.get(url, config);
      Logger.info(
        `Executing  GET request to ${fullURL} succeeded with status code ${response.status}`
      );
      return response;
    } catch (error) {
      if (error.response === undefined) {
        Logger.error(
          `GET request to ${fullURL} failed with error '${error.message}'`
        );
        throw error;
      } else {
        Logger.info(
          `Executing GET request to ${fullURL} succeeded with status code ${error.response.status}`
        );
        return error.response;
      }
    }
  }

  /**
   * Post request
   * @param {string} url URL that will be used for the request
   * @param {Object} config config options for making requests
   * @returns {Object} API Response
   */
  async postRequest(url, data = {}, config = {}) {
    const fullURL = `${this.baseURL}${url}`;
    try {
      const response = await this.instance.post(url, data, config);
      Logger.info(
        `Executing POST request to ${fullURL} succeeded with status code ${
          response.status
        } and with body = ${JSON.stringify(data)}`
      );
      return response;
    } catch (error) {
      if (error.response === undefined) {
        Logger.error(
          `POST request to ${fullURL} failed with error '${error.message}'`
        );
        throw error;
      } else {
        Logger.info(
          `Executing POST request to ${fullURL} succeeded with status code ${
            error.response.status
          } and with body = ${JSON.stringify(data)}`
        );
        return error.response;
      }
    }
  }

  /**
   * PUT request
   * @param {string} url URL that will be used for the request
   * @param {Object} config config options for making requests
   * @returns {Object} API Response
   */
  async putRequest(url, data = {}, config = {}) {
    const fullURL = `${this.baseURL}${url}`;
    try {
      const response = await this.instance.put(url, data, config);
      Logger.info(
        `Executing PUT request to ${fullURL} succeeded with status code ${
          response.status
        } and with body = ${JSON.stringify(data)}`
      );
      return response;
    } catch (error) {
      if (error.response === undefined) {
        Logger.error(
          `PUT request to ${fullURL} failed with error '${error.message}'`
        );
        throw error;
      } else {
        Logger.info(
          `Executing PUT request to ${fullURL} succeeded with status code ${
            error.response.status
          } and with body = ${JSON.stringify(data)}`
        );
        return error.response;
      }
    }
  }

  /**
   * Patch request
   * @param {string} url URL that will be used for the request
   * @param {Object} config config options for making requests
   * @returns {Object} API Response
   */
  async patchRequest(url, data = {}, config = {}) {
    const fullURL = `${this.baseURL}${url}`;
    try {
      const response = await this.instance.patch(url, data, config);
      Logger.info(
        `Executing PATCH request to ${fullURL} succeeded with with status code ${
          response.status
        } and body = ${JSON.stringify(data)}`
      );
      return response;
    } catch (error) {
      if (error.response === undefined) {
        Logger.error(
          `PATCH request to ${fullURL} failed with error '${error.message}'`
        );
        throw error;
      } else {
        Logger.info(
          `Executing PATCH request to ${fullURL} succeeded with status code ${
            error.response.status
          } and with body = ${JSON.stringify(data)}`
        );
        return error.response;
      }
    }
  }

  /**
   * Delete request
   * @param {string} url URL that will be used for the request
   * @param {Object} config config options for making requests
   * @returns {Object} API Response
   */
  async deleteRequest(url, config = {}) {
    const fullURL = `${this.baseURL}${url}`;
    try {
      const response = await this.instance.delete(url, data, config);
      Logger.info(
        `Executing DELETE request to ${fullURL} succeeded with status code ${response.status}`
      );
      return response;
    } catch (error) {
      if (error.response === undefined) {
        Logger.error(
          `DELETE request to ${fullURL} failed with error '${error.message}'`
        );
        throw error;
      } else {
        Logger.info(
          `Executing DELETE request to ${fullURL} succeeded with status code ${error.response.status}`
        );
        return error.response;
      }
    }
  }
}

module.exports = APIUtils;
