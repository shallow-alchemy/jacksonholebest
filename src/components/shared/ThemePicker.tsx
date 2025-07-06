'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useTheme } from '@/themes'
import styles from './ThemePicker.module.css'

interface ThemeOption {
  id: string
  name: string
  description: string
  colors: {
    primary: string
    secondary: string
    accent: string
  }
}

const themeOptions: ThemeOption[] = [
  {
    id: 'jackson-adventure',
    name: 'Jackson Adventure',
    description: 'Default blue & orange',
    colors: {
      primary: '#0ea5e9',
      secondary: '#eab308',
      accent: '#f97316'
    }
  },
  {
    id: 'spring-meadow',
    name: 'Spring Meadow',
    description: 'Fresh greens',
    colors: {
      primary: '#22c55e',
      secondary: '#fbbf24',
      accent: '#d946ef'
    }
  },
  {
    id: 'summer-alpine',
    name: 'Summer Alpine',
    description: 'Mountain emerald',
    colors: {
      primary: '#10b981',
      secondary: '#06b6d4',
      accent: '#8b5cf6'
    }
  },
  {
    id: 'autumn-harvest',
    name: 'Autumn Harvest',
    description: 'Warm oranges',
    colors: {
      primary: '#f16829',
      secondary: '#fbbf24',
      accent: '#ec4899'
    }
  },
  {
    id: 'winter-wonderland',
    name: 'Winter Wonderland',
    description: 'Cool blues',
    colors: {
      primary: '#64748b',
      secondary: '#06b6d4',
      accent: '#8b5cf6'
    }
  }
]

export const ThemePicker: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { currentTheme, switchTheme } = useTheme()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleThemeSelect = (themeId: string) => {
    switchTheme(themeId)
    setIsOpen(false)
  }

  const currentThemeOption = themeOptions.find(theme => theme.id === currentTheme?.id) || themeOptions[0]

  return (
    <div className={styles.container} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.button}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className={styles.themePreview}>
          <div 
            className={styles.colorSwatch} 
            style={{ backgroundColor: currentThemeOption.colors.primary }}
          />
          <div 
            className={styles.colorSwatch} 
            style={{ backgroundColor: currentThemeOption.colors.secondary }}
          />
          <div 
            className={styles.colorSwatch} 
            style={{ backgroundColor: currentThemeOption.colors.accent }}
          />
        </div>
        <span className={styles.buttonText}>Theme</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
          <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {themeOptions.map((theme) => (
            <button
              key={theme.id}
              onClick={() => handleThemeSelect(theme.id)}
              className={`${styles.dropdownItem} ${
                currentTheme?.id === theme.id ? styles.dropdownItemActive : ''
              }`}
            >
              <div className={styles.themePreview}>
                <div 
                  className={styles.colorSwatch} 
                  style={{ backgroundColor: theme.colors.primary }}
                />
                <div 
                  className={styles.colorSwatch} 
                  style={{ backgroundColor: theme.colors.secondary }}
                />
                <div 
                  className={styles.colorSwatch} 
                  style={{ backgroundColor: theme.colors.accent }}
                />
              </div>
              <div>
                <div className={styles.themeName}>{theme.name}</div>
                <div className={styles.themeDescription}>{theme.description}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}