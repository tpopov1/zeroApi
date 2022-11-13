const mssql = require("mssql");
const Logger = require("../../logger");
const timeouts = require("../../../../configs/environment/timeouts");

class MsSqlUtils {
  static clients = new Map();
  /**
   * Initialize connection with DB
   * @param {object} config Config
   */
  static async initConnection(config) {
    Logger.info(`Connect to the MSsql DB ${config.dbName}`);
    try {
      const configDb = {
        user: config.userName,
        password: config.password,
        server: config.host,
        port: config.port,
        database: config.dbName,
        options: {
          enableArithAbort: true,
        },
        requestTimeout: timeouts.cucumberStep,
      };
      const client = new mssql.ConnectionPool(configDb);
      this.clients.set(config.dbName, client);
      await this.clients.get(config.dbName).connect();
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }

  /**
   * Close connection with DB
   */
  static async close() {
    try {
      Logger.info("Close MSsql DB connection");
      const keys = this.clients.keys();
      for (const key of keys) {
        await this.clients.get(key).close();
      }
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }

  /**
   * Send query
   * @param {string} dbName Name of database
   * @param {string} query Query
   * @returns {Promise<void>}
   */
  static async query(dbName, query) {
    try {
      Logger.info(`Send query '${query}'`);
      const result = await this.clients.get(dbName).request().query(query);
      return result;
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }
}

module.exports = MsSqlUtils;
