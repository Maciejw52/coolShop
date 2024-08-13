import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
} from 'react-native-paper';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const customThemeProperties = {
  spacing: {
    xxs: 4,
    xs: 8,
    sm: 12,
    md: 16,
    lg: 24,
  },
  fontSize: {
    xs: 10,
    sm: 14,
    md: 18,
    lg: 24,
    xl: 32,
  },
};

export const CombinedLightTheme = {
  ...MD3LightTheme,
  ...LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...LightTheme.colors,
    primary: 'rgb(71, 85, 182)',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(223, 224, 255)',
    onPrimaryContainer: 'rgb(0, 13, 95)',
    secondary: 'rgb(140, 51, 179)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(248, 216, 255)',
    onSecondaryContainer: 'rgb(50, 0, 71)',
    tertiary: 'rgb(16, 109, 32)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(157, 248, 152)',
    onTertiaryContainer: 'rgb(0, 34, 4)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(255, 251, 255)',
    onBackground: 'rgb(27, 27, 31)',
    surface: 'rgb(255, 251, 255)',
    onSurface: 'rgb(27, 27, 31)',
    surfaceVariant: 'rgb(227, 225, 236)',
    onSurfaceVariant: 'rgb(70, 70, 79)',
    outline: 'rgb(118, 118, 128)',
    outlineVariant: 'rgb(199, 197, 208)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(48, 48, 52)',
    inverseOnSurface: 'rgb(243, 240, 244)',
    inversePrimary: 'rgb(187, 195, 255)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(246, 243, 251)',
      level2: 'rgb(240, 238, 249)',
      level3: 'rgb(235, 233, 247)',
      level4: 'rgb(233, 231, 246)',
      level5: 'rgb(229, 228, 245)',
    },
    surfaceDisabled: 'rgba(27, 27, 31, 0.12)',
    onSurfaceDisabled: 'rgba(27, 27, 31, 0.38)',
    backdrop: 'rgba(47, 48, 56, 0.4)',
    white: 'rgb(255, 255, 255)',
  },
  ...customThemeProperties,
};

export const CombinedDarkTheme = {
  ...MD3DarkTheme,
  ...DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...DarkTheme.colors,
    primary: 'rgb(187, 195, 255)',
    onPrimary: 'rgb(17, 34, 134)',
    primaryContainer: 'rgb(45, 60, 156)',
    onPrimaryContainer: 'rgb(223, 224, 255)',
    secondary: 'rgb(235, 178, 255)',
    onSecondary: 'rgb(82, 0, 113)',
    secondaryContainer: 'rgb(114, 17, 153)',
    onSecondaryContainer: 'rgb(248, 216, 255)',
    tertiary: 'rgb(130, 219, 126)',
    onTertiary: 'rgb(0, 57, 10)',
    tertiaryContainer: 'rgb(0, 83, 18)',
    onTertiaryContainer: 'rgb(157, 248, 152)',
    error: 'rgb(255, 180, 171)',
    onError: 'rgb(105, 0, 5)',
    errorContainer: 'rgb(147, 0, 10)',
    onErrorContainer: 'rgb(255, 180, 171)',
    background: 'rgb(27, 27, 31)',
    onBackground: 'rgb(228, 225, 230)',
    surface: 'rgb(27, 27, 31)',
    onSurface: 'rgb(228, 225, 230)',
    surfaceVariant: 'rgb(70, 70, 79)',
    onSurfaceVariant: 'rgb(199, 197, 208)',
    outline: 'rgb(144, 144, 154)',
    outlineVariant: 'rgb(70, 70, 79)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(228, 225, 230)',
    inverseOnSurface: 'rgb(48, 48, 52)',
    inversePrimary: 'rgb(71, 85, 182)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(35, 35, 42)',
      level2: 'rgb(40, 40, 49)',
      level3: 'rgb(45, 46, 56)',
      level4: 'rgb(46, 47, 58)',
      level5: 'rgb(49, 51, 62)',
    },
    surfaceDisabled: 'rgba(228, 225, 230, 0.12)',
    onSurfaceDisabled: 'rgba(228, 225, 230, 0.38)',
    backdrop: 'rgba(47, 48, 56, 0.4)',
    white: 'rgb(255, 255, 255)',
  },
  ...customThemeProperties,
};

export const cardColours = [
  CombinedDarkTheme.colors.primaryContainer,
  CombinedDarkTheme.colors.secondaryContainer,
  CombinedDarkTheme.colors.tertiaryContainer,
];

export const themesArray = ['default', 'dark', 'light'] as const;
export type possibleThemeType = typeof themesArray;

export type AppTheme = typeof CombinedLightTheme;
