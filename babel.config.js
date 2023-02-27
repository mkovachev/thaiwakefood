module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      require.resolve("expo-router/babel"),
    ],
    plugins: [
      ["module:react-native-dotenv"]
    ]
  };
};
