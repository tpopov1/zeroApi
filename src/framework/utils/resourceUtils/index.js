const fs = require("fs");
const path = require("path");

const REGEX_CONSTANTS = /(@{([(),\-\w. ]+)}|@([,\-\w.]+(\([\w\-,. ]+\))?))/g;
const REGEX_BRACKETS = /[{}]/g;
const SPACE = 2;

module.exports = class ResourceUtils {
  /**
   * Extract value from object by json path like string or array
   * @param {object} object object extract from
   * @param {string|string[]} varPath path to variable in object
   * @returns {object} result
   */
  static extractValueFromObjectByPath(object, varPath) {
    const assertKeyInObject = (ref, key) => {
      if (!(key in ref)) {
        throw new Error(
          `Object (${key}) does not exists in path: ${varPath}\n${JSON.stringify(
            object,
            null,
            SPACE
          )}`
        );
      }
    };
    const varPathArray = !Array.isArray(varPath) ? varPath.split(".") : varPath;
    const last = varPathArray.pop();
    let ref = object;
    varPathArray.forEach((key) => {
      assertKeyInObject(ref, key);
      ref = ref[key];
    });
    assertKeyInObject(ref, last);
    return ref[last];
  }

  /**
   * Find path to value in json
   * @param {string} testDataPath path to test data directory
   * @param {string[]} pathFragments full separated path to object or value in json file
   * @returns {{filePath: string, jsonPath: string}} result
   */
  static findFileByPathPart(testDataPath, pathFragments) {
    const tempFragments = [...pathFragments];
    const jsonPath = [];
    while (tempFragments.length) {
      const fragment = tempFragments.pop();
      const filePath = path.join(
        testDataPath,
        ...tempFragments,
        `${fragment}.json`
      );
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        return { filePath, jsonPath: jsonPath.reverse().join(".") };
      }
      jsonPath.push(fragment);
    }
    throw new Error(`No file found by path: ${pathFragments.join(".")}`);
  }

  /**
   * Resolve variable from file
   * @param {string|any} variable variable to resolve base
   * @returns {object} result
   */
  static resolveVariableBase(variable) {
    const cleanVariable = variable.replace(REGEX_BRACKETS, "").replace("@", "");
    const { filePath, jsonPath } = this.findFileByPathPart(
      cleanVariable.split(".")
    );
    const json = require(filePath);
    return this.extractValueFromObjectByPath(json, jsonPath);
  }

  /**
   * Resolve variable from file
   * @param {string|any} variable variable to resolve
   * @returns {object} result
   */
  static resolveVariable(variable) {
    const variables = variable.match(REGEX_CONSTANTS);
    let result = { ...variable };
    if (variables) {
      if (variables.length === 1 && variables[0].length === variable.length) {
        return this.resolveVariableBase(variables[0]);
      }
      variables.forEach((varPath) => {
        const str = this.resolveVariableBase(varPath);
        if (typeof str !== "string") {
          throw new Error(`Variable is not a string in path: ${varPath}`);
        }
        result = variable.replace(varPath, str);
      });
    }
    return result;
  }

  /**
   * Resolve variables by object keys
   * @param {object} object object to resolve
   * @returns {object} result
   */
  static resolveObject(object) {
    const resolvedObject = {};
    Object.keys(object).forEach((key) => {
      resolvedObject[key] = this.resolveVariable(object[key]);
    });
    return resolvedObject;
  }

  /**
   * Resolve variables from file
   * @param {Array<any>} variables variables to resolve
   * @returns {Array<any>} result
   */
  static resolveVariables(...variables) {
    return variables.map((variable) => this.resolveVariable(variable));
  }
};
