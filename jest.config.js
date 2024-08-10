module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|react-native-vector-icons)/)',
  ],
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  testMatch: ['**/*.spec.tsx'],
};
