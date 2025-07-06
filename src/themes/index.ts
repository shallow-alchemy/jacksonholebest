// Theme System Exports
export { ThemeProvider } from './provider/ThemeProvider'
export { 
  useTheme, 
  useThemeValue, 
  useThemeColors, 
  useThemeTypography, 
  useThemeSpacing, 
  useThemeBreakpoints, 
  useThemeComponents,
  useThemeSwitcher,
  useThemePreferences
} from './provider/ThemeContext'

export {
  useThemeStyles,
  useBreakpoint,
  useThemeColor,
  useThemeTransition,
  useThemePersistence,
  useThemeValidation,
  useAutoTheme,
  useThemeAnalytics
} from './provider/hooks'

// Registry and Loader
export { themeRegistry } from './registry'
export { themeLoader } from './loader'

// Types
export type {
  Theme,
  ThemeContext,
  ThemePreferences,
  ColorPalette,
  ColorScale,
  TypographyScale,
  SpacingScale,
  BreakpointScale,
  ComponentThemes,
  ButtonTheme,
  CardTheme,
  NavigationTheme,
  RestaurantTheme,
  ThemeMetadata
} from './registry/types'

// Built-in Themes
export { default as jacksonAdventureTheme } from './definitions/jackson-adventure'
export { default as springMeadowTheme } from './definitions/spring-meadow'
export { default as summerAlpineTheme } from './definitions/summer-alpine'
export { default as autumnHarvestTheme } from './definitions/autumn-harvest'
export { default as winterWonderlandTheme } from './definitions/winter-wonderland'

// Utilities
export { ThemeValidator, ThemeSchemaValidator } from './loader/validators'

// Theme Selector Component
export { ThemeSelector } from '@/components/shared/ThemeSelector'