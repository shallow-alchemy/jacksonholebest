import { Theme, ThemeRegistry as IThemeRegistry, ThemePreferences } from './types'
import { themeLoader } from '../loader'

export class ThemeRegistry implements IThemeRegistry {
  public themes = new Map<string, Theme>()
  public activeTheme = 'jackson-adventure'
  public defaultTheme = 'jackson-adventure'
  public loading = new Set<string>()
  public errors = new Map<string, Error>()
  
  private initialized = false
  private initializing = false
  private preferences: ThemePreferences = {
    autoSwitch: false,
    preferredTheme: 'jackson-adventure',
    fallbackTheme: 'jackson-adventure',
    persistence: 'local',
    transitions: true,
    reducedMotion: false
  }
  
  private listeners = new Set<(theme: Theme) => void>()
  
  async initialize(): Promise<void> {
    if (this.initialized || this.initializing) {
      return
    }
    
    this.initializing = true
    
    try {
      // Load preferences from storage
      this.loadPreferences()
      
      // Discover available themes
      const availableThemes = await themeLoader.discoverThemes()
      
      // Load default theme
      const defaultTheme = await this.loadTheme(this.defaultTheme)
      this.themes.set(defaultTheme.id, defaultTheme)
      
      // Load preferred theme if different from default
      if (this.preferences.preferredTheme !== this.defaultTheme) {
        try {
          const preferredTheme = await this.loadTheme(this.preferences.preferredTheme)
          this.themes.set(preferredTheme.id, preferredTheme)
          this.activeTheme = preferredTheme.id
        } catch (error) {
          console.warn(`Failed to load preferred theme '${this.preferences.preferredTheme}', using default`)
          this.activeTheme = this.defaultTheme
        }
      }
      
      // Preload all available themes
      await this.preloadAllThemes(availableThemes)
      
      this.initialized = true
    } catch (error) {
      console.error('Failed to initialize theme registry:', error)
      throw error
    } finally {
      this.initializing = false
    }
  }
  
  async loadTheme(id: string): Promise<Theme> {
    this.loading.add(id)
    
    try {
      const theme = await themeLoader.loadTheme(id)
      this.themes.set(id, theme)
      this.errors.delete(id)
      return theme
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error(String(error))
      this.errors.set(id, errorObj)
      throw errorObj
    } finally {
      this.loading.delete(id)
    }
  }
  
  async switchTheme(id: string): Promise<void> {
    console.log(`Switching from ${this.activeTheme} to ${id}`)
    
    if (this.activeTheme === id) {
      console.log('Theme already active, skipping switch')
      return
    }
    
    let theme = this.themes.get(id)
    
    if (!theme) {
      console.log(`Theme ${id} not loaded, loading now...`)
      theme = await this.loadTheme(id)
    }
    
    this.activeTheme = id
    this.preferences.preferredTheme = id
    this.savePreferences()
    
    console.log(`Theme switched to ${theme.name}, notifying listeners...`)
    
    // Notify listeners
    this.notifyListeners(theme)
  }
  
  getTheme(id: string): Theme | null {
    return this.themes.get(id) || null
  }
  
  getCurrentTheme(): Theme | null {
    return this.getTheme(this.activeTheme)
  }
  
  getAvailableThemes(): string[] {
    return Array.from(this.themes.keys())
  }
  
  isThemeLoaded(id: string): boolean {
    return this.themes.has(id)
  }
  
  isThemeLoading(id: string): boolean {
    return this.loading.has(id)
  }
  
  hasError(id: string): boolean {
    return this.errors.has(id)
  }
  
  getError(id: string): Error | null {
    return this.errors.get(id) || null
  }
  
  resetToDefault(): void {
    this.activeTheme = this.defaultTheme
    this.preferences.preferredTheme = this.defaultTheme
    this.savePreferences()
    
    const theme = this.getCurrentTheme()
    if (theme) {
      this.notifyListeners(theme)
    }
  }
  
  updatePreferences(updates: Partial<ThemePreferences>): void {
    this.preferences = { ...this.preferences, ...updates }
    this.savePreferences()
  }
  
  getPreferences(): ThemePreferences {
    return { ...this.preferences }
  }
  
  subscribe(listener: (theme: Theme) => void): () => void {
    this.listeners.add(listener)
    
    // Immediately call with current theme
    const currentTheme = this.getCurrentTheme()
    if (currentTheme) {
      listener(currentTheme)
    }
    
    return () => {
      this.listeners.delete(listener)
    }
  }
  
  private notifyListeners(theme: Theme): void {
    console.log(`Notifying ${this.listeners.size} listeners about theme change to ${theme.name}`)
    this.listeners.forEach(listener => {
      try {
        listener(theme)
      } catch (error) {
        console.error('Error in theme listener:', error)
      }
    })
  }
  
  private async preloadAllThemes(themes: string[]): Promise<void> {
    const themesToLoad = themes.filter(id => !this.isThemeLoaded(id))
    
    // Load all themes
    const loadPromises = themesToLoad.map(id => 
      this.loadTheme(id).catch(error => {
        console.debug(`Failed to preload theme '${id}':`, error)
        return null
      })
    )
    
    await Promise.all(loadPromises)
  }

  private async preloadPopularThemes(themes: string[]): Promise<void> {
    const popularThemes = themes.filter(id => 
      !this.isThemeLoaded(id) && 
      ['spring-meadow', 'summer-alpine', 'autumn-harvest', 'winter-wonderland'].includes(id)
    )
    
    // Load themes in background
    popularThemes.forEach(id => {
      this.loadTheme(id).catch(error => {
        console.debug(`Failed to preload theme '${id}':`, error)
      })
    })
  }
  
  private loadPreferences(): void {
    if (this.preferences.persistence === 'none') {
      return
    }
    
    const storage = this.preferences.persistence === 'local' ? localStorage : sessionStorage
    
    try {
      const saved = storage.getItem('themePreferences')
      if (saved) {
        const parsed = JSON.parse(saved)
        this.preferences = { ...this.preferences, ...parsed }
        this.activeTheme = this.preferences.preferredTheme
      }
    } catch (error) {
      console.warn('Failed to load theme preferences:', error)
    }
  }
  
  private savePreferences(): void {
    if (this.preferences.persistence === 'none') {
      return
    }
    
    const storage = this.preferences.persistence === 'local' ? localStorage : sessionStorage
    
    try {
      storage.setItem('themePreferences', JSON.stringify(this.preferences))
    } catch (error) {
      console.warn('Failed to save theme preferences:', error)
    }
  }
  
  clearCache(): void {
    this.themes.clear()
    this.loading.clear()
    this.errors.clear()
    themeLoader.clearCache()
  }
  
  getStats(): {
    loadedThemes: number
    loadingThemes: number
    erroredThemes: number
    cacheSize: number
  } {
    return {
      loadedThemes: this.themes.size,
      loadingThemes: this.loading.size,
      erroredThemes: this.errors.size,
      cacheSize: themeLoader.getCache().size
    }
  }
}

export const themeRegistry = new ThemeRegistry()