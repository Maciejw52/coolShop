module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|react-navigation|react-native-reanimated|react-native-gesture-handler|react-native-paper|react-native-keychain|@react-navigation/.*|@react-native(-community)?|react-native-vector-icons|react-redux)/)',
  ],
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  modulePathIgnorePatterns: ['<rootDir>/e2e/'],
  testMatch: ['**/*.spec.tsx', '**/*.spec.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
};
