const path = require("path");
const timeouts = require(`${path.join(
  process.cwd(),
  "configs",
  "environment",
  "timeouts.js"
)}`);

module.exports = timeouts;
