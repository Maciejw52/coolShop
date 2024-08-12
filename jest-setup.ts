import '@testing-library/react-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.useFakeTimers();
import { setUpTests } from 'react-native-reanimated';

setUpTests();

jest.mock('react-native-keychain', () => {
  return {
    setGenericPassword: jest.fn((username, password) => {}),
    getGenericPassword: jest.fn(),
    resetGenericPassword: jest.fn(),
  };
});
