module.exports = {
  sourceType: "unambiguous",
  presets: [
    ["@babel/preset-env", { targets: "defaults", modules: "commonjs" }],
    ["@babel/preset-react", { runtime: "automatic" }]
  ],
};
