
const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
    verbose: true,
    testMatch: ["**/lib/cjs/**/*.spec.js"],
    // testRegex: ".*lib\\/cjs\\/.*\\.spec\\.js$",

    moduleDirectories: [
      "node_modules",
      
      "lib/cjs"
    ],
    transform: {
      //".*\\.ts": "@swc-node/jest"
      // ...tsjPreset.transform,
      
    },
    moduleFileExtensions: [
      "ts",
      "tsx",
      "js"
    ]
  }