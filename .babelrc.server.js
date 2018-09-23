module.exports = {
  presets: [
    ["@babel/preset-env", {
      targets: {
        node: "current",
      }
    }],
    "@babel/preset-flow",
  ],
  "plugins": [
    ["@babel/plugin-proposal-decorators", {
      "legacy": false,
      "decoratorsBeforeExport": false,
    }],
    "@babel/plugin-proposal-class-properties",
  ],
}
