module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|react-navigation|react-native-reanimated|react-native-keychain|@react-navigation/.*|@react-native(-community)?|react-native-vector-icons|react-redux)/)',
  ],
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  testMatch: ['**/*.spec.tsx'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
};
