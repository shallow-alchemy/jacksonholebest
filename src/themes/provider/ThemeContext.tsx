'use client'

import { createContext, useContext } from 'react'
import { ThemeContext as IThemeContext } from '../registry/types'

const ThemeContext = createContext<IThemeContext | null>(null)

export const useTheme = (): IThemeContext => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const useThemeValue = () => {
  const { currentTheme } = useTheme()
  return currentTheme
}

export const useThemeColors = () => {
  const { currentTheme } = useTheme()
  return currentTheme.colors
}

export const useThemeTypography = () => {
  const { currentTheme } = useTheme()
  return currentTheme.typography
}

export const useThemeSpacing = () => {
  const { currentTheme } = useTheme()
  return currentTheme.spacing
}

export const useThemeBreakpoints = () => {
  const { currentTheme } = useTheme()
  return currentTheme.breakpoints
}

export const useThemeComponents = () => {
  const { currentTheme } = useTheme()
  return currentTheme.components
}

export const useThemeSwitcher = () => {
  const { switchTheme, availableThemes, isLoading } = useTheme()
  return { switchTheme, availableThemes, isLoading }
}

export const useThemePreferences = () => {
  const { preferences, updatePreferences } = useTheme()
  return { preferences, updatePreferences }
}

export { ThemeContext }