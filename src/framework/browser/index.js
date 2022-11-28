const Logger = require("../logger");

const MILLISECONDS_TO_SECONDS = 1000;

module.exports = new (class Browser {
  constructor() {}

  /**
   * Get browser
   * @returns {Browser} Browser
   */
  getBrowser() {
    return $browserName ? browser[$browserName] : browser;
  }

  /**
   * Switch to last window
   * @returns {Promise<void>}
   */
  async switchToLastWindow() {
    Logger.info("Switch to last window");
    const windows = await this.getBrowser().getWindowHandles();
    return this.getBrowser().switchToWindow(windows.pop());
  }

  /**
   * Switch to first window
   * @returns {Promise<void>}
   */
  async switchToFirstWindow() {
    Logger.info("Switch to first window");
    const windows = await this.getBrowser().getWindowHandles();
    return this.getBrowser().switchToWindow(windows[0]);
  }

  /**
   * Get current url with logging
   * @returns {Promise<string>} result of getUrl function
   */
  async getCurrentUrl() {
    Logger.info("Get current url");
    return this.getBrowser().getUrl();
  }

  /**
   * Wait for condition
   * @param {func} func function to wait on
   * @param {string} message message to log
   * @param {number} timeout timeout in seconds
   * @param {number} interval interval between condition checks in seconds
   * @returns {Promise<boolean>} result of waitUntil function
   */
  static async waitFor(
    func,
    message = "function complete",
    timeout = 10,
    interval = 0.5
  ) {
    Logger.info(`Wait for ${message}`);
    try {
      await Browser.getBrowser().waitUntil(func, {
        timeout: timeout * MILLISECONDS_TO_SECONDS,
        interval: interval * MILLISECONDS_TO_SECONDS,
      });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Add screenshot to the report
   * @param {number} screenName name for screen
   * @param {boolean} isWait true if need delay before making screen
   * @param {number} timer delay before making screen (ms)
   * @returns {Promise<any>} result
   */
  static async addScreenShot(screenName, isWait = false, timer = 1.5) {
    Logger.info("Make screenshot");
    try {
      if (isWait) {
        await Browser.getBrowser().pause(timer * 1000);
      }
      const name = `${screenName}_${new Date().getTime()}.png`;
      const screen = await Browser.getBrowser().takeScreenshot();
      const path = `./reports/screenshots/${name}`;
      fs.writeFileSync(path, screen, "base64", (err) => {
        Logger.error(err);
      });
      cucumberJson.attach(screen, "image/png");
    } catch (err) {
      Logger.error(err);
    }
  }
})();
