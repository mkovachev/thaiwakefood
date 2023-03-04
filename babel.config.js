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
          '@babel/plugin-proposal-export-namespace-from',
          'react-native-reanimated/plugin',
          ['module:react-native-dotenv'],
        ]
      }
    },
  }
}
