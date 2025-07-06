import { Theme, ThemeLoader as IThemeLoader } from '../registry/types'
import { ThemeValidator } from './validators'

export class ThemeLoader implements IThemeLoader {
  private cache = new Map<string, Theme>()
  private loadingPromises = new Map<string, Promise<Theme>>()
  private discoveredThemes = new Set<string>()
  
  async loadTheme(id: string): Promise<Theme> {
    // Check cache first
    const cached = this.cache.get(id)
    if (cached) {
      return cached
    }
    
    // Check if already loading
    const existingPromise = this.loadingPromises.get(id)
    if (existingPromise) {
      return existingPromise
    }
    
    // Load theme
    const loadPromise = this.loadThemeFromSource(id)
    this.loadingPromises.set(id, loadPromise)
    
    try {
      const theme = await loadPromise
      this.cacheTheme(theme)
      return theme
    } catch (error) {
      throw new Error(`Failed to load theme '${id}': ${error}`)
    } finally {
      this.loadingPromises.delete(id)
    }
  }
  
  async loadThemes(ids: string[]): Promise<Theme[]> {
    const loadPromises = ids.map(id => this.loadTheme(id))
    return Promise.all(loadPromises)
  }
  
  async discoverThemes(): Promise<string[]> {
    const themes = new Set<string>()
    
    // Discover from file system
    const fileSystemThemes = await this.discoverFileSystemThemes()
    fileSystemThemes.forEach(theme => themes.add(theme))
    
    // Discover from dynamic imports
    const dynamicThemes = await this.discoverDynamicThemes()
    dynamicThemes.forEach(theme => themes.add(theme))
    
    // Cache discovered themes
    this.discoveredThemes = themes
    
    return Array.from(themes)
  }
  
  validateTheme(theme: Partial<Theme>): theme is Theme {
    return ThemeValidator.validateTheme(theme)
  }
  
  cacheTheme(theme: Theme): void {
    this.cache.set(theme.id, theme)
  }
  
  clearCache(): void {
    this.cache.clear()
    this.loadingPromises.clear()
  }
  
  private async loadThemeFromSource(id: string): Promise<Theme> {
    let themeModule: any
    
    switch (id) {
      case 'jackson-adventure':
        themeModule = await import('../definitions/jackson-adventure')
        break
      case 'spring-meadow':
        themeModule = await import('../definitions/spring-meadow')
        break
      case 'summer-alpine':
        themeModule = await import('../definitions/summer-alpine')
        break
      case 'autumn-harvest':
        themeModule = await import('../definitions/autumn-harvest')
        break
      case 'winter-wonderland':
        themeModule = await import('../definitions/winter-wonderland')
        break
      default:
        throw new Error(`Theme '${id}' not found`)
    }
    
    const theme = themeModule.default
    
    if (!this.validateTheme(theme)) {
      throw new Error(`Theme '${id}' failed validation`)
    }
    
    return theme
  }
  
  private async loadDynamicTheme(id: string): Promise<Theme> {
    // This would be implemented to load themes from external sources
    // For now, throw an error
    throw new Error(`Theme '${id}' not found in any source`)
  }
  
  private async discoverFileSystemThemes(): Promise<string[]> {
    // In a real implementation, this would scan the filesystem
    // For now, return all implemented themes
    return [
      'jackson-adventure',
      'spring-meadow',
      'summer-alpine',
      'autumn-harvest',
      'winter-wonderland'
    ]
  }
  
  private async discoverDynamicThemes(): Promise<string[]> {
    // This would discover themes from external sources
    // For now, return empty array
    return []
  }
  
  getCache(): Map<string, Theme> {
    return new Map(this.cache)
  }
  
  getCachedTheme(id: string): Theme | undefined {
    return this.cache.get(id)
  }
  
  isCached(id: string): boolean {
    return this.cache.has(id)
  }
  
  isLoading(id: string): boolean {
    return this.loadingPromises.has(id)
  }
  
  getDiscoveredThemes(): string[] {
    return Array.from(this.discoveredThemes)
  }
}

export const themeLoader = new ThemeLoader()