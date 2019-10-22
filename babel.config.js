const presets = [
  [
    "@babel/env",
    {
      targets: {
        node: "current",
      },
    },
  ],
];

const plugins = [ "add-module-exports" ];

const ignore = [ "**/*.test.js" ];

module.exports = { presets, plugins };
