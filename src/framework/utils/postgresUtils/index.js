const pg = require("pg");
const Logger = require("../../logger");

class PostgresUtil {
  static clients = new Map();
  /**
   * Initialized connection with DB
   * @param {object} config Config
   */
  static async initConnection(config) {
    Logger.info(`Connect to the Postgres DB ${config.dbName}`);
    try {
      const client = new pg.Client({
        user: config.userName,
        host: config.host,
        database: config.dbName,
        password: config.password,
        port: config.port,
      });
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
      Logger.info("Close Postgres DB connection");
      const keys = this.clients.keys();
      for (const key of keys) {
        await this.clients.get(key).end();
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
      const result = await this.clients.get(dbName).query(query);
      return result;
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }
}

module.exports = PostgresUtil;
