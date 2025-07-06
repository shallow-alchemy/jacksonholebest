'use client'

import React from 'react'
import { useThemeSwitcher, useThemeValidation } from '@/themes'

interface ThemeSelectorProps {
  className?: string
  variant?: 'dropdown' | 'buttons' | 'minimal'
  showLabels?: boolean
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  className = '',
  variant = 'dropdown',
  showLabels = true
}) => {
  const { switchTheme, availableThemes, isLoading } = useThemeSwitcher()
  const { hasErrors, loadError } = useThemeValidation()

  if (hasErrors && loadError) {
    return (
      <div className={`text-red-600 text-sm ${className}`}>
        Theme Error: {loadError.message}
      </div>
    )
  }

  if (variant === 'dropdown') {
    return (
      <div className={`relative ${className}`}>
        {showLabels && (
          <label htmlFor="theme-selector" className="block text-sm font-medium text-gray-700 mb-1">
            Theme
          </label>
        )}
        <select
          id="theme-selector"
          disabled={isLoading}
          onChange={(e) => switchTheme(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {availableThemes.map((themeId) => (
            <option key={themeId} value={themeId}>
              {formatThemeName(themeId)}
            </option>
          ))}
        </select>
        {isLoading && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        )}
      </div>
    )
  }

  if (variant === 'buttons') {
    return (
      <div className={`space-y-2 ${className}`}>
        {showLabels && (
          <div className="text-sm font-medium text-gray-700">Theme</div>
        )}
        <div className="flex flex-wrap gap-2">
          {availableThemes.map((themeId) => (
            <button
              key={themeId}
              onClick={() => switchTheme(themeId)}
              disabled={isLoading}
              className="px-3 py-2 text-sm font-medium rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {formatThemeName(themeId)}
            </button>
          ))}
        </div>
      </div>
    )
  }

  // Minimal variant
  return (
    <div className={`inline-flex items-center space-x-2 ${className}`}>
      <div className="flex space-x-1">
        {availableThemes.map((themeId) => (
          <button
            key={themeId}
            onClick={() => switchTheme(themeId)}
            disabled={isLoading}
            title={formatThemeName(themeId)}
            className="w-6 h-6 rounded-full border-2 border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            style={{ 
              backgroundColor: getThemePreviewColor(themeId),
              opacity: isLoading ? 0.5 : 1
            }}
          >
            <span className="sr-only">{formatThemeName(themeId)}</span>
          </button>
        ))}
      </div>
      {isLoading && (
        <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
      )}
    </div>
  )
}

// Helper function to format theme names for display
function formatThemeName(themeId: string): string {
  return themeId
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Helper function to get a preview color for each theme
function getThemePreviewColor(themeId: string): string {
  const colorMap: Record<string, string> = {
    'jackson-adventure': '#0ea5e9',
    'spring-meadow': '#22c55e',
    'summer-alpine': '#3b82f6',
    'autumn-harvest': '#f59e0b',
    'winter-wonderland': '#0ea5e9'
  }
  
  return colorMap[themeId] || '#6b7280'
}