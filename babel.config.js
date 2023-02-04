module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./app'],
        alias: {
          '@api': './app/api',
          '@components': './app/components',
          '@hooks': './app/hooks',
          '@models': './app/models',
          '@screens': './app/screens',
          '@style': './app/style',
          '@utils': './app/utils',
          '@constants': './app/constants',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
