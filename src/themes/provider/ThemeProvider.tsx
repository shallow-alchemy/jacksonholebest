'use client'

import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { Theme, ThemeContext as IThemeContext, ThemePreferences } from '../registry/types'
import { ThemeContext } from './ThemeContext'
import { themeRegistry } from '../registry'
import jacksonAdventureTheme from '../definitions/jackson-adventure'

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: string
  fallbackTheme?: Theme
  enableAutoDiscovery?: boolean
  enableTransitions?: boolean
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'jackson-adventure',
  fallbackTheme = jacksonAdventureTheme,
  enableAutoDiscovery = true,
  enableTransitions = true
}) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(fallbackTheme)
  const [availableThemes, setAvailableThemes] = useState<string[]>([defaultTheme])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [preferences, setPreferences] = useState<ThemePreferences>({
    autoSwitch: false,
    preferredTheme: defaultTheme,
    fallbackTheme: defaultTheme,
    persistence: 'local',
    transitions: enableTransitions,
    reducedMotion: false
  })

  // Initialize theme system
  useEffect(() => {
    const initializeThemes = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Initialize registry
        await themeRegistry.initialize()
        
        // Subscribe to theme changes
        const unsubscribe = themeRegistry.subscribe((theme) => {
          console.log('ThemeProvider received theme change notification:', theme.name)
          setCurrentTheme(theme)
        })

        // Get available themes and set up listener for updates
        if (enableAutoDiscovery) {
          const updateAvailableThemes = () => {
            const discovered = themeRegistry.getAvailableThemes()
            setAvailableThemes(discovered)
          }
          
          // Initial load
          updateAvailableThemes()
          
          // Listen for theme registry changes
          const interval = setInterval(updateAvailableThemes, 500)
          
          // Clean up after 5 seconds (themes should be loaded by then)
          setTimeout(() => {
            clearInterval(interval)
            updateAvailableThemes() // Final update
          }, 5000)
        }

        // Load current theme
        const current = themeRegistry.getCurrentTheme()
        if (current) {
          setCurrentTheme(current)
        }

        // Load preferences
        const savedPrefs = themeRegistry.getPreferences()
        setPreferences(savedPrefs)

        return unsubscribe
      } catch (err) {
        console.error('Failed to initialize theme system:', err)
        setError(err instanceof Error ? err : new Error('Theme initialization failed'))
        setCurrentTheme(fallbackTheme)
      } finally {
        setIsLoading(false)
      }
    }

    const cleanup = initializeThemes()
    
    return () => {
      cleanup.then(unsubscribe => unsubscribe?.())
    }
  }, [defaultTheme, enableAutoDiscovery]) // eslint-disable-line react-hooks/exhaustive-deps

  // Update theme class when theme changes  
  const updateThemeClass = useCallback((theme: Theme) => {
    if (typeof document === 'undefined') return

    console.log('Applying theme class for theme:', theme.name)
    
    // Remove existing theme classes
    document.body.className = document.body.className.replace(/theme-\w+/g, '')
    
    // Add new theme class
    document.body.classList.add(`theme-${theme.id}`)
    
    console.log('Applied theme class:', `theme-${theme.id}`)
    
  }, [])

  // Switch theme function
  const switchTheme = useCallback(async (themeId: string) => {
    if (themeId === currentTheme.id) return

    setIsLoading(true)
    setError(null)

    try {
      await themeRegistry.switchTheme(themeId)
    } catch (err) {
      console.error('Failed to switch theme:', err)
      setError(err instanceof Error ? err : new Error('Theme switch failed'))
    } finally {
      setIsLoading(false)
    }
  }, [currentTheme.id])

  // Load theme function
  const loadTheme = useCallback(async (themeId: string) => {
    if (themeRegistry.isThemeLoaded(themeId)) return

    setIsLoading(true)
    setError(null)

    try {
      await themeRegistry.loadTheme(themeId)
      const updated = themeRegistry.getAvailableThemes()
      setAvailableThemes(updated)
    } catch (err) {
      console.error('Failed to load theme:', err)
      setError(err instanceof Error ? err : new Error('Theme load failed'))
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Reset theme function
  const resetTheme = useCallback(() => {
    themeRegistry.resetToDefault()
  }, [])

  // Update preferences function
  const updatePreferences = useCallback((updates: Partial<ThemePreferences>) => {
    setPreferences(prev => {
      const newPreferences = { ...prev, ...updates }
      themeRegistry.updatePreferences(newPreferences)
      return newPreferences
    })
  }, [])

  // Handle reduced motion preference
  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPreferences(prev => ({ ...prev, reducedMotion: e.matches }))
    }

    // Set initial value
    setPreferences(prev => ({ ...prev, reducedMotion: mediaQuery.matches }))

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange)
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, []) // Empty dependency array to run only once

  // Update theme class when current theme changes
  useEffect(() => {
    console.log('Current theme changed to:', currentTheme.name)
    updateThemeClass(currentTheme)
  }, [currentTheme, updateThemeClass])

  // Context value
  const contextValue: IThemeContext = useMemo(() => ({
    currentTheme,
    availableThemes,
    isLoading,
    error,
    switchTheme,
    loadTheme,
    resetTheme,
    preferences,
    updatePreferences
  }), [
    currentTheme,
    availableThemes,
    isLoading,
    error,
    switchTheme,
    loadTheme,
    resetTheme,
    preferences,
    updatePreferences
  ])

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}