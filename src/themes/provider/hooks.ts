'use client'

import { useCallback, useEffect, useState } from 'react'
import { useTheme, useThemeValue, useThemeColors } from './ThemeContext'

// Hook for theme-aware styling
export const useThemeStyles = (componentName: keyof ReturnType<typeof useTheme>['currentTheme']['components']) => {
  const { currentTheme } = useTheme()
  return currentTheme.components[componentName]
}

// Hook for responsive design with theme breakpoints
export const useBreakpoint = () => {
  const { currentTheme } = useTheme()
  const [currentBreakpoint, setCurrentBreakpoint] = useState<string>('base')

  useEffect(() => {
    if (typeof window === 'undefined') return

    const breakpoints = currentTheme.breakpoints
    const queries = Object.entries(breakpoints).map(([name, value]) => ({
      name,
      query: window.matchMedia(`(min-width: ${value})`)
    }))

    const updateBreakpoint = () => {
      for (let i = queries.length - 1; i >= 0; i--) {
        if (queries[i].query.matches) {
          setCurrentBreakpoint(queries[i].name)
          return
        }
      }
      setCurrentBreakpoint('base')
    }

    // Initial check
    updateBreakpoint()

    // Add listeners
    queries.forEach(({ query }) => {
      query.addEventListener('change', updateBreakpoint)
    })

    return () => {
      queries.forEach(({ query }) => {
        query.removeEventListener('change', updateBreakpoint)
      })
    }
  }, [currentTheme.breakpoints])

  return currentBreakpoint
}

// Hook for theme-aware color generation
export const useThemeColor = () => {
  const colors = useThemeColors()

  const getColor = useCallback((path: string, fallback?: string) => {
    const keys = path.split('.')
    let current: any = colors

    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key]
      } else {
        return fallback || '#000000'
      }
    }

    return typeof current === 'string' ? current : fallback || '#000000'
  }, [colors])

  return { colors, getColor }
}

// Hook for theme transitions
export const useThemeTransition = () => {
  const { preferences, updatePreferences } = useTheme()
  const [isTransitioning, setIsTransitioning] = useState(false)

  const enableTransitions = useCallback(() => {
    updatePreferences({ transitions: true })
  }, [updatePreferences])

  const disableTransitions = useCallback(() => {
    updatePreferences({ transitions: false })
  }, [updatePreferences])

  const withTransition = useCallback(async (callback: () => Promise<void> | void) => {
    if (!preferences.transitions || preferences.reducedMotion) {
      await callback()
      return
    }

    setIsTransitioning(true)
    
    try {
      await callback()
      // Wait for CSS transitions to complete
      await new Promise(resolve => setTimeout(resolve, 300))
    } finally {
      setIsTransitioning(false)
    }
  }, [preferences.transitions, preferences.reducedMotion])

  return {
    isTransitioning,
    transitionsEnabled: preferences.transitions && !preferences.reducedMotion,
    enableTransitions,
    disableTransitions,
    withTransition
  }
}

// Hook for theme persistence
export const useThemePersistence = () => {
  const { preferences, updatePreferences } = useTheme()

  const setPersistenceMode = useCallback((mode: 'local' | 'session' | 'none') => {
    updatePreferences({ persistence: mode })
  }, [updatePreferences])

  const clearPersistedTheme = useCallback(() => {
    localStorage.removeItem('themePreferences')
    sessionStorage.removeItem('themePreferences')
  }, [])

  return {
    persistenceMode: preferences.persistence,
    setPersistenceMode,
    clearPersistedTheme
  }
}

// Hook for theme validation and error handling
export const useThemeValidation = () => {
  const { error, currentTheme } = useTheme()
  const [validationErrors, setValidationErrors] = useState<string[]>([])

  useEffect(() => {
    // Validate current theme structure
    const errors: string[] = []

    if (!currentTheme.id) errors.push('Theme missing ID')
    if (!currentTheme.name) errors.push('Theme missing name')
    if (!currentTheme.colors) errors.push('Theme missing colors')
    if (!currentTheme.typography) errors.push('Theme missing typography')
    if (!currentTheme.spacing) errors.push('Theme missing spacing')
    if (!currentTheme.breakpoints) errors.push('Theme missing breakpoints')
    if (!currentTheme.components) errors.push('Theme missing components')

    setValidationErrors(errors)
  }, [currentTheme])

  return {
    hasErrors: error !== null || validationErrors.length > 0,
    loadError: error,
    validationErrors,
    isValid: error === null && validationErrors.length === 0
  }
}

// Hook for auto theme switching based on system preferences
export const useAutoTheme = () => {
  const { switchTheme, preferences, updatePreferences } = useTheme()

  useEffect(() => {
    if (!preferences.autoSwitch || typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e: MediaQueryListEvent) => {
      const targetTheme = e.matches ? 'dark' : 'light'
      switchTheme(targetTheme).catch(console.error)
    }

    // Initial check
    handleChange({ matches: mediaQuery.matches } as MediaQueryListEvent)

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange)
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [preferences.autoSwitch, switchTheme])

  const enableAutoSwitch = useCallback(() => {
    updatePreferences({ autoSwitch: true })
  }, [updatePreferences])

  const disableAutoSwitch = useCallback(() => {
    updatePreferences({ autoSwitch: false })
  }, [updatePreferences])

  return {
    autoSwitchEnabled: preferences.autoSwitch,
    enableAutoSwitch,
    disableAutoSwitch
  }
}

// Hook for theme analytics and usage tracking
export const useThemeAnalytics = () => {
  const { currentTheme } = useTheme()
  const [usage, setUsage] = useState<{ [themeId: string]: number }>({})

  useEffect(() => {
    // Track theme usage
    setUsage(prev => ({
      ...prev,
      [currentTheme.id]: (prev[currentTheme.id] || 0) + 1
    }))

    // Log theme switch for analytics
    console.debug('Theme switched to:', currentTheme.id)
  }, [currentTheme.id])

  const getMostUsedTheme = useCallback(() => {
    const entries = Object.entries(usage)
    if (entries.length === 0) return null

    return entries.reduce((most, [themeId, count]) => 
      count > most.count ? { themeId, count } : most,
      { themeId: entries[0][0], count: entries[0][1] }
    )
  }, [usage])

  return {
    usage,
    currentThemeUsage: usage[currentTheme.id] || 0,
    getMostUsedTheme
  }
}