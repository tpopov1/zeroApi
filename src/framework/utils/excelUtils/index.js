const xlsx = require("xlsx");
const Logger = require("../../logger");

const VALUES_COUNT = 50;
const HEADER_REGEX = "^[A-Z]+1$";
const FIRST_COLUMN_REGEX = "^A\\d+$";
const NUMBER_FROM_ONE_TO_NINE_REGEX = /[1-9]/g;
const NUMBERED_KEY_REGEX = (letters) => `^${letters}[0-9]+$`;

module.exports = class ExcelUtils {
  /**
   * Read file
   * @param {string} path Path to file
   * @returns {string} Text from file
   */
  static async readExcelFile(path, fileName) {
    Logger.info(`Read excel file "${fileName}"`);
    return xlsx.readFile(`${path}/${fileName}`);
  }

  /**
   * Get sheet names from workbook
   * @param {string} workbook Path to file
   * @returns {Array<string>} Sheet names
   */
  static getSheetNames(workbook) {
    Logger.info("Get sheet names from excel file");
    return workbook.SheetNames;
  }

  /**
   * Get sheet name by it's number
   * @param {string} workbook Path to file
   * @param {number} sheetNumber Number of sheet
   * @returns {string} Name of sheet
   */
  static getSheetNameByNumber(workbook, sheetNumber) {
    Logger.info(`Get sheet name #${sheetNumber}`);
    return this.getSheetNames(workbook)[sheetNumber - 1];
  }

  /**
   * Get sheet by name
   * @param {string} workbook Path to file
   * @param {string} sheetName Name of sheet
   * @returns {object} Sheet
   */
  static getSheetByName(workbook, sheetName) {
    return workbook.Sheets[sheetName];
  }

  /**
   * Get sheet headers from workbook
   * @param {string} workbook Name of workbook
   * @param {string} sheetName Name of sheet
   * @returns {Array<string>} Headers
   */
  static getSheetHeadersNames(workbook, sheetName) {
    Logger.info(`Get header names for sheet "${sheetName}"`);
    const columnHeaders = [];
    const worksheet = workbook.Sheets[sheetName];
    for (const key in worksheet) {
      if (key.match(HEADER_REGEX)) {
        columnHeaders.push(worksheet[key].v);
      }
    }
    return columnHeaders;
  }

  /**
   * Get count of rows in sheet
   * @param {string} workbook Name of workbook
   * @param {string} sheetName Name of sheet
   * @returns {number} Count of rows
   */
  static getSheetRowsCount(workbook, sheetName) {
    Logger.info(`Get amount of rows from sheet "${sheetName}"`);
    let rowsCount = 0;
    const worksheet = workbook.Sheets[sheetName];
    for (const key in worksheet) {
      if (key.match(FIRST_COLUMN_REGEX)) {
        rowsCount++;
      }
    }
    return rowsCount - 1;
  }

  /**
   * Get all values from column
   * @param {string} workbook Name of workbook
   * @param {string} sheetName Name of sheet
   * @param {string} columnName Name of column
   * @returns {Array<string>} Values from column
   */
  static getAllValuesFromColumnByName(workbook, sheetName, columnName) {
    Logger.info(
      `Get all cell values from column "${columnName}" in sheet "${sheetName}"`
    );
    const worksheet = workbook.Sheets[sheetName];
    const columnValues = [];
    let keyRegex;
    for (const key in worksheet) {
      if (worksheet[key].w === columnName) {
        const letters = key.replace(NUMBER_FROM_ONE_TO_NINE_REGEX, "");
        keyRegex = new RegExp(NUMBERED_KEY_REGEX(letters));
      }
      if (key.match(keyRegex) && keyRegex !== undefined) {
        if (worksheet[key].w !== columnName) {
          columnValues.push(worksheet[key].w);
        }
      }
    }
    return columnValues;
  }

  /**
   * Get number of values from column
   * @param {string} workbook Name of workbook
   * @param {string} sheetName Name of sheet
   * @param {string} columnName Name of column
   * @param {number} valuesCount Number of values
   * @returns {Array<string>} Values from column
   */
  static getSomeFirstValuesFromColumnByName(
    workbook,
    sheetName,
    columnName,
    valuesCount = VALUES_COUNT
  ) {
    Logger.info(
      `Get ${valuesCount} cell values from column "${columnName}" in sheet "${sheetName}"`
    );
    const columnValues = this.getAllValuesFromColumnByName(
      workbook,
      sheetName,
      columnName
    );
    return columnValues.slice(0, valuesCount);
  }

  /**
   * Get hyperlink cell object
   * @param {string} workbook Name of workbook
   * @param {string} sheetName Name of sheet
   * @param {string} cellValue Value of cell
   * @returns {object} Hyperlink cell
   */
  static getHyperLinkCellObject(workbook, sheetName, cellValue) {
    Logger.info(`Get link from cell "${cellValue}" in sheet "${sheetName}"`);
    const worksheet = workbook.Sheets[sheetName];
    let hyperLinkKey;
    for (const key in worksheet) {
      if (worksheet[key].v === cellValue) {
        hyperLinkKey = key;
        break;
      }
    }
    return worksheet[hyperLinkKey].l;
  }

  /**
   * Get hyperlink from cell by value
   * @param {string} workbook Name of workbook
   * @param {string} sheetName Name of sheet
   * @param {string} cellValue Value of cell
   * @returns {string} Hyperlink
   */
  static getHyperLinkFromCellByValue(workbook, sheetName, cellValue) {
    Logger.info(`Get link from cell "${cellValue}" in sheet "${sheetName}"`);
    const hyperLink = this.getHyperLinkCellObject(
      workbook,
      sheetName,
      cellValue
    );
    return hyperLink.Target;
  }

  /**
   * Get query filters
   * @param {string} workbook Name of workbook
   * @param {string} sheetName Name of sheet
   * @param {string} cell Name of cell
   * @returns {string} Query filters
   */
  static getQueryFilters(workbook, sheetName, cell = "A1") {
    Logger.info(`Get query filters from sheet "${sheetName}"`);
    const worksheet = workbook.Sheets[sheetName];
    const filterValue = worksheet[cell].v;
    return filterValue;
  }
};
