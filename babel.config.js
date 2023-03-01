module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', 'module:metro-react-native-babel-preset'],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
      development: {
        plugins: [
          require.resolve('expo-router/babel'),
          ['module:react-native-dotenv']
        ]
      }
    },
  };
};
