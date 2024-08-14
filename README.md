# Cool Store README

## Before Running the app

Make sure you have followed the guide on [`Setting up the development environment`](https://reactnative.dev/docs/0.73/environment-setup).

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

## Unit Testing

Simply run:

```bash
   yarn test
```

## End-to-end Testing (Detox)

The e2e testing framework we use is Detox from wix, with plenty of support and years on the market it is a prime choice for e2e and automated testing in coolStore, 250,000 downloads on npm per week, easy setup etc.

The setup below may not be necessary depending on your device configurations. For guidence on how to set up your system environment please head over to:

[`Detox Documentation`](https://wix.github.io/Detox/docs/19.x/introduction/getting-started).

### Setup

1. **Edit the .detoxrc.js file**

   In order for detox to choose the correct android emulator in the tests, make sure that your .detoxrc.js avdName matches the one in Android Studio.

   ```bash
   devices: {
    ...
    emulator: {
      type: 'android.emulator',
      device: {
        avdName: 'YOUR_AVD_NAME_HERE',
      },
    },
   },
   ```

   To check if a specific Android virtual device is installed locally, run:

   ```bash
   emulator -list-avds
   ```

2. **Run Test APK app generation**

   Within the root dir of the project, run one of the following two commands to generate your test apk, it can either be a debug or a release configuration:

   **Android**

   ```bash
      # Debug apk
      yarn android:build-debug
      # Release apk
      yarn android:build-debug
   ```

   **IOS**

   ```bash
      # Debug ipa
      yarn ios:build-debug
      # Release ipa
      yarn ios:build-release
   ```

### Testing - Debug

1. **Run Metro in testing mode**

   Since this is a debug configuration, you need to have React Native packager running in parallel before you start Detox tests.

   ```bash
   yarn start
   ```

2. **Run Detox debug testing**

   ```bash
      # Android
      yarn android:e2e-debug
      # IOS
      yarn ios:e2e-debug
   ```

### Testing - Release

1. **Run Detox Release testing**

   No need to run a metro server for these. BUT, remember to first build your release apk/ipa

   ```bash
      # Android
      yarn android:e2e-release
      # IOS
      yarn ios:e2e-release
   ```
