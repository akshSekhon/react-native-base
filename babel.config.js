module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    // ['module:react-native-dotenv'],
  ]
  // plugins: ['react-native-reanimated/plugin',],
};


// module.exports = {
//   presets: ['module:@react-native/babel-preset'],
//   plugins: [
//     'react-native-reanimated/plugin',
//     [
//       'module-resolver',
//       {
//         root: ['./Src'],
//         alias: {
//           '@Src': './Src',
//           '@Components': './Src/Components',
//           '@CommonStyles': './Src/CommonStyles',
//           '@Gallery': './Src/Assets/Gallery',
//           // '@NavigationService': '.Src/Navigations/NavigationService',
//         },
//       },
//     ],
//   ],
// };