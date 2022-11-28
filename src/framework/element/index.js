const Logger = require("../logger");
const ElementStateProvider = require("./elementStateProvider");

const maskedValue = "********";

module.exports = class Element {
  constructor(locator, name) {
    this.locator = locator;
    this.name = name;
  }

  state = () => new ElementStateProvider(this.locator, this.name);

  /**
   * Click on element
   * @param {object} options Options containing `quick` and `viaJS` boolean settings
   * @returns {Promise<void>}
   */
  async click({ quick, viaJS } = { quick: false, viaJS: false }) {
    Logger.info(`Click at '${this.name}'`);
    if (!quick) {
      await this.state().assertIsClickable();
    }
    const element = await $(this.locator);
    if (viaJS) {
      return browser.execute("arguments[0].click();", element);
    } else {
      return element.click();
    }
  }

  /**
   * Quick click on element
   * @returns {Promise<void>}
   */
  async quickClick() {
    return this.click({ quick: true, viaJS: false });
  }

  /**
   * Click on element via JS
   * @returns {Promise<void>}
   */
  async clickViaJS() {
    return this.click({ quick: false, viaJS: true });
  }

  /**
   * Quick click on element via JS
   * @returns {Promise<void>}
   */
  async quickClickViaJS() {
    return this.click({ quick: true, viaJS: true });
  }

  /**
   * Get text from element
   * @returns {Promise<string>} Text from element
   */
  async getText() {
    Logger.info(`Get text from element "${this.name}"`);
    await this.state().assertIsExist();
    const text = await (await $(this.locator)).getText();
    Logger.info(`Received text "${text}"`);
    return text;
  }

  /**
   * Get text from elements
   * @returns {Promise<Array<string>>} Text from elements
   */
  async getTextFromElements() {
    Logger.info(`Get text from elements "${this.name}"`);
    await this.state().assertIsExist();
    const elements = await $$(this.locator);
    return Promise.all(elements.map(async (el) => el.getText()));
  }

  /**
   * Scroll element into view
   * @param {object} scrollIntoViewOptions Options for `scrollIntoView` method from webdriverIO
   * @returns
   */
  async scrollIntoView(scrollIntoViewOptions = true) {
    Logger.info(`Scroll to element ${this.name}`);
    await this.state().waitForDisplayed();
    const element = await $(this.locator);
    return element.scrollIntoView(scrollIntoViewOptions);
  }

  /**
   * Type text into element
   * @param {string} value Text to type
   * @param {object} options Options containing `secret` and `clear` boolean settings
   * @returns {Promise<void>}
   */
  async type(value, { secret, clear } = { secret: false, clear: false }) {
    Logger.info(`Type text ${secret ? maskedValue : value}`);
    await this.state().assertIsExist();
    const element = await $(this.locator);
    if (clear) await element.clearValue();
    return element.setValue(value);
  }

  /**
   * Type text hiding value in log
   * @param {string} value Text to type
   * @returns {Promise<void>}
   */
  async typeSecret(value) {
    return this.type(value, { secret: true, clear: false });
  }

  /**
   * Clear text and then type
   * @param {string} value Text to type
   * @returns {Promise<void>}
   */
  async clearAndType(value) {
    return this.type(value, { secret: false, clear: true });
  }

  /**
   * Clear text and then type hiding value in log
   * @param {string} value Text to type
   * @returns {Promise<void>}
   */
  async clearAndTypeSecret(value) {
    return this.type(value, { secret: true, clear: true });
  }

  /**
   * Get placeholder from element
   * @returns {Promise<string>} Placeholder
   */
  async getPlaceholder() {
    return this.getAttribute("placeholder");
  }

  /**
   * Get value of the attribute from element
   * @param {string} attribute Name of the attribute
   * @returns {Promise<string>} Attribute value
   */
  async getAttribute(attribute) {
    Logger.info(`Get attribute "${attribute}" from element "${this.name}"`);
    await this.state().assertIsExist();
    const attr = await (await $(this.locator)).getAttribute(attribute);
    Logger.info(`Received attribute "${attr}"`);
    return attr;
  }

  /**
   * Get values of the attribute from elements
   * @param {string} attribute Name of the attribute
   * @returns {Promise<Array<string>>} Attribute values
   */
  async getAttributeFromElements(attribute) {
    Logger.info(`Get attribute "${attribute}" from elements "${this.name}"`);
    await this.state().assertIsExist();
    const elements = await $$(this.locator);
    return Promise.all(elements.map(async (el) => el.getAttribute(attribute)));
  }

  /**
   * Get count of elements
   * @returns {Promise<number>} Count of elements
   */
  async getElementsCount() {
    Logger.info(`Get count of elements "${this.name}"`);
    await this.state().assertIsExist();
    const elements = await $$(this.locator);
    return elements.length;
  }

  /**
   * Click by coordinates
   * @param {number} x X coordinate
   * @param {number} y Y coordinate
   * @returns {Promise<void>}
   */
  async clickByOffset(x, y) {
    Logger.info(`Click by offset {x: ${x}, y:${y}} at "${this.name}"`);
    await this.state().assertIsClickable();
    return (await $(this.locator)).click({ x, y });
  }

  /**
   * Get value of the element
   * @returns {Promise<string>} Value
   */
  async getValue() {
    Logger.info(`Get value from element "${this.name}"`);
    await this.state().assertIsExist();
    const elem = await $(this.locator);
    return elem.getValue();
  }

  /**
   * Switch to frame of the element
   * @returns {Promise<void>}
   */
  async switchToFrame() {
    Logger.info(`Switch "${this.name}" to new frame `);
    await this.state().assertIsExist();
    const elem = await $(this.locator);
    return browser.switchToFrame(elem);
  }

  /**
   * Move to element
   * @returns {Promise<void>}
   */
  async moveTo() {
    Logger.info(`Move to "${this.name}"`);
    await this.state().assertIsExist();
    return (await $(this.locator)).moveTo();
  }

  /**
   * Select dropdown option by value
   * @param {string} value Value of option from dropdown
   * @returns {Promise<void>}
   */
  async selectDropdownOptionByValue(value) {
    Logger.info(`Set option "${value}" in "${this.name}"`);
    await this.state().assertIsDisplayed();
    return (await $(this.locator)).selectByAttribute("value", value);
  }

  /**
   * Select option by text
   * @param {string} text Text of option
   * @returns {Promise<void>}
   */
  async selectOptionByText(text) {
    Logger.info(`Select option with "${text}" from element "${this.name}"`);
    await this.state().assertIsExist();
    const element = await Browser.getBrowser().$(this.locator);
    return element.selectByVisibleText(text);
  }

  /**
   * Set element's display style
   * @param {string} value Display style
   * @returns {Promise<void>}
   */
  async setElementStyleDisplay(value) {
    Logger.info(`Set style "${value}" in "${this.name}"`);
    return browser.execute(
      `arguments[0].style.display = '${value}';`,
      await $(this.locator)
    );
  }
};
