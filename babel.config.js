module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    env: {
      production: {
      },
      development: {
        plugins: [
          require.resolve('expo-router/babel'),
          ['module:react-native-dotenv'],
          '@babel/plugin-proposal-export-namespace-from',
          'react-native-reanimated/plugin',
        ]
      }
    },
  }
}
