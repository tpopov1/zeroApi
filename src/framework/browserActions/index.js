const Logger = require("../logger");
const timeouts = require("../../../configs/environment/timeouts");

module.exports = async function () {
  await browser.overwriteCommand("url", async (origFunction, url) => {
    Logger.info(`Open url "${url}"`);
    return origFunction(url);
  });

  await browser.overwriteCommand("getWindowHandles", async (origFunction) => {
    Logger.info("Get window handles");
    return origFunction();
  });

  await browser.overwriteCommand(
    "switchToWindow",
    async (origFunction, windowHandle) => {
      Logger.info(`Switching to window: '${windowHandle}'`);
      return origFunction(windowHandle);
    }
  );

  await browser.addCommand("getCurrentUrl", async () => {
    Logger.info("Get current url");
    return browser.getUrl();
  });

  await browser.overwriteCommand("reloadSession", async (origFunction) => {
    Logger.info("Reload browser session");
    return origFunction();
  });

  await browser.overwriteCommand("refresh", async (origFunction) => {
    Logger.info("Refresh the current page");
    return origFunction();
  });

  await browser.overwriteCommand("keys", async (origFunction, key) => {
    Logger.info(`Press button "${key}"`);
    return origFunction(key);
  });

  await browser.overwriteCommand("back", async (origFunction) => {
    Logger.info("Return to previous page");
    return origFunction();
  });

  await browser.overwriteCommand(
    "waitUntil",
    async (
      origFunction,
      condition,
      timeout = timeouts.explicit,
      timeoutMsg = "Cannot wait until the condition",
      interval
    ) => {
      Logger.info(`Wait until an acton for ${timeout}`);
      return origFunction(condition, { timeout, timeoutMsg, interval });
    }
  );
};
