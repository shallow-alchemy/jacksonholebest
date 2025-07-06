import { Theme, ColorScale, ColorPalette, TypographyScale, SpacingScale, BreakpointScale, ComponentThemes, ThemeMetadata } from '../registry/types'

export class ThemeValidator {
  static validateTheme(theme: Partial<Theme>): theme is Theme {
    if (!theme) return false
    
    const requiredFields = ['id', 'name', 'description', 'colors', 'typography', 'spacing', 'breakpoints', 'components', 'metadata']
    
    for (const field of requiredFields) {
      if (!(field in theme)) {
        console.warn(`Theme validation failed: Missing required field '${field}'`)
        return false
      }
    }
    
    if (!this.validateColors(theme.colors)) return false
    if (!this.validateTypography(theme.typography)) return false
    if (!this.validateSpacing(theme.spacing)) return false
    if (!this.validateBreakpoints(theme.breakpoints)) return false
    if (!this.validateComponents(theme.components)) return false
    if (!this.validateMetadata(theme.metadata)) return false
    
    return true
  }
  
  private static validateColors(colors: any): colors is ColorPalette {
    if (!colors || typeof colors !== 'object') return false
    
    const requiredPalettes = ['primary', 'secondary', 'accent', 'neutral', 'semantic', 'brand']
    
    for (const palette of requiredPalettes) {
      if (!(palette in colors)) {
        console.warn(`Theme validation failed: Missing color palette '${palette}'`)
        return false
      }
    }
    
    // Validate color scales
    const colorScales = ['primary', 'secondary', 'accent', 'neutral']
    for (const scale of colorScales) {
      if (!this.validateColorScale(colors[scale])) {
        console.warn(`Theme validation failed: Invalid color scale '${scale}'`)
        return false
      }
    }
    
    // Validate semantic colors
    if (!this.validateSemanticColors(colors.semantic)) {
      console.warn(`Theme validation failed: Invalid semantic colors`)
      return false
    }
    
    // Validate brand colors
    if (!this.validateBrandColors(colors.brand)) {
      console.warn(`Theme validation failed: Invalid brand colors`)
      return false
    }
    
    return true
  }
  
  private static validateColorScale(scale: any): scale is ColorScale {
    if (!scale || typeof scale !== 'object') return false
    
    const requiredShades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950']
    
    for (const shade of requiredShades) {
      if (!(shade in scale) || typeof scale[shade] !== 'string') {
        return false
      }
    }
    
    return true
  }
  
  private static validateSemanticColors(semantic: any): boolean {
    if (!semantic || typeof semantic !== 'object') return false
    
    const requiredColors = ['success', 'warning', 'error', 'info', 'successLight', 'warningLight', 'errorLight', 'infoLight']
    
    for (const color of requiredColors) {
      if (!(color in semantic) || typeof semantic[color] !== 'string') {
        return false
      }
    }
    
    return true
  }
  
  private static validateBrandColors(brand: any): boolean {
    if (!brand || typeof brand !== 'object') return false
    
    const requiredColors = ['jackson', 'adventure', 'nature', 'premium']
    
    for (const color of requiredColors) {
      if (!(color in brand) || typeof brand[color] !== 'string') {
        return false
      }
    }
    
    return true
  }
  
  private static validateTypography(typography: any): typography is TypographyScale {
    if (!typography || typeof typography !== 'object') return false
    
    const requiredFields = ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing']
    
    for (const field of requiredFields) {
      if (!(field in typography)) {
        return false
      }
    }
    
    return true
  }
  
  private static validateSpacing(spacing: any): spacing is SpacingScale {
    if (!spacing || typeof spacing !== 'object') return false
    
    const requiredSpaces = ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16', '20', '24', '32', '40', '48', '56', '64', '80', '96']
    
    for (const space of requiredSpaces) {
      if (!(space in spacing) || typeof spacing[space] !== 'string') {
        return false
      }
    }
    
    return true
  }
  
  private static validateBreakpoints(breakpoints: any): breakpoints is BreakpointScale {
    if (!breakpoints || typeof breakpoints !== 'object') return false
    
    const requiredBreakpoints = ['sm', 'md', 'lg', 'xl', '2xl']
    
    for (const breakpoint of requiredBreakpoints) {
      if (!(breakpoint in breakpoints) || typeof breakpoints[breakpoint] !== 'string') {
        return false
      }
    }
    
    return true
  }
  
  private static validateComponents(components: any): components is ComponentThemes {
    if (!components || typeof components !== 'object') return false
    
    const requiredComponents = ['button', 'card', 'navigation', 'restaurant']
    
    for (const component of requiredComponents) {
      if (!(component in components)) {
        return false
      }
    }
    
    return true
  }
  
  private static validateMetadata(metadata: any): metadata is ThemeMetadata {
    if (!metadata || typeof metadata !== 'object') return false
    
    const requiredFields = ['version', 'author', 'description', 'tags', 'createdAt', 'updatedAt', 'compatibility']
    
    for (const field of requiredFields) {
      if (!(field in metadata)) {
        return false
      }
    }
    
    return Array.isArray(metadata.tags) && Array.isArray(metadata.compatibility)
  }
}

export class ThemeSchemaValidator {
  static validateThemeStructure(theme: any): { valid: boolean; errors: string[] } {
    const errors: string[] = []
    
    if (!theme) {
      errors.push('Theme is null or undefined')
      return { valid: false, errors }
    }
    
    if (typeof theme !== 'object') {
      errors.push('Theme must be an object')
      return { valid: false, errors }
    }
    
    // Validate required top-level fields
    const requiredFields = ['id', 'name', 'description', 'colors', 'typography', 'spacing', 'breakpoints', 'components', 'metadata']
    
    for (const field of requiredFields) {
      if (!(field in theme)) {
        errors.push(`Missing required field: ${field}`)
      }
    }
    
    // Validate types
    if ('id' in theme && typeof theme.id !== 'string') {
      errors.push('id must be a string')
    }
    
    if ('name' in theme && typeof theme.name !== 'string') {
      errors.push('name must be a string')
    }
    
    if ('description' in theme && typeof theme.description !== 'string') {
      errors.push('description must be a string')
    }
    
    // Validate nested objects
    if ('colors' in theme && typeof theme.colors !== 'object') {
      errors.push('colors must be an object')
    }
    
    if ('typography' in theme && typeof theme.typography !== 'object') {
      errors.push('typography must be an object')
    }
    
    if ('spacing' in theme && typeof theme.spacing !== 'object') {
      errors.push('spacing must be an object')
    }
    
    if ('breakpoints' in theme && typeof theme.breakpoints !== 'object') {
      errors.push('breakpoints must be an object')
    }
    
    if ('components' in theme && typeof theme.components !== 'object') {
      errors.push('components must be an object')
    }
    
    if ('metadata' in theme && typeof theme.metadata !== 'object') {
      errors.push('metadata must be an object')
    }
    
    return {
      valid: errors.length === 0,
      errors
    }
  }
}