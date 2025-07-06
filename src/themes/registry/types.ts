export interface ColorScale {
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
  950: string
}

export interface SemanticColors {
  success: string
  warning: string
  error: string
  info: string
  successLight: string
  warningLight: string
  errorLight: string
  infoLight: string
}

export interface BrandColors {
  jackson: string
  adventure: string
  nature: string
  premium: string
}

export interface ColorPalette {
  primary: ColorScale
  secondary: ColorScale
  accent: ColorScale
  neutral: ColorScale
  semantic: SemanticColors
  brand: BrandColors
}

export interface TypographyScale {
  fontFamily: {
    sans: string[]
    serif: string[]
    mono: string[]
  }
  fontSize: {
    xs: string
    sm: string
    base: string
    lg: string
    xl: string
    '2xl': string
    '3xl': string
    '4xl': string
    '5xl': string
    '6xl': string
    '7xl': string
  }
  fontWeight: {
    thin: number
    light: number
    normal: number
    medium: number
    semibold: number
    bold: number
    extrabold: number
    black: number
  }
  lineHeight: {
    tight: number
    snug: number
    normal: number
    relaxed: number
    loose: number
  }
  letterSpacing: {
    tighter: string
    tight: string
    normal: string
    wide: string
    wider: string
    widest: string
  }
}

export interface SpacingScale {
  0: string
  1: string
  2: string
  3: string
  4: string
  5: string
  6: string
  8: string
  10: string
  12: string
  16: string
  20: string
  24: string
  32: string
  40: string
  48: string
  56: string
  64: string
  80: string
  96: string
}

export interface BreakpointScale {
  sm: string
  md: string
  lg: string
  xl: string
  '2xl': string
}

export interface ButtonTheme {
  base: string
  variants: {
    primary: string
    secondary: string
    accent: string
    ghost: string
    outline: string
  }
  sizes: {
    sm: string
    md: string
    lg: string
    xl: string
  }
  states: {
    hover: string
    active: string
    disabled: string
    loading: string
  }
}

export interface CardTheme {
  base: string
  variants: {
    default: string
    elevated: string
    outlined: string
    filled: string
  }
  sizes: {
    sm: string
    md: string
    lg: string
  }
}

export interface NavigationTheme {
  base: string
  variants: {
    primary: string
    secondary: string
    sidebar: string
    breadcrumb: string
  }
  states: {
    active: string
    hover: string
    disabled: string
  }
}

export interface RestaurantTheme {
  card: {
    base: string
    variants: {
      featured: string
      list: string
      compact: string
    }
  }
  rating: {
    base: string
    star: string
    text: string
  }
  price: {
    base: string
    levels: {
      1: string
      2: string
      3: string
      4: string
    }
  }
  category: {
    base: string
    variants: {
      primary: string
      secondary: string
    }
  }
}

export interface ComponentThemes {
  button: ButtonTheme
  card: CardTheme
  navigation: NavigationTheme
  restaurant: RestaurantTheme
}

export interface ThemeMetadata {
  version: string
  author: string
  description: string
  tags: string[]
  createdAt: string
  updatedAt: string
  compatibility: string[]
}

export interface Theme {
  id: string
  name: string
  description: string
  colors: ColorPalette
  typography: TypographyScale
  spacing: SpacingScale
  breakpoints: BreakpointScale
  components: ComponentThemes
  metadata: ThemeMetadata
}

export interface ThemeRegistry {
  themes: Map<string, Theme>
  activeTheme: string
  defaultTheme: string
  loading: Set<string>
  errors: Map<string, Error>
}

export interface ThemeLoader {
  loadTheme(id: string): Promise<Theme>
  loadThemes(ids: string[]): Promise<Theme[]>
  discoverThemes(): Promise<string[]>
  validateTheme(theme: Partial<Theme>): theme is Theme
  cacheTheme(theme: Theme): void
  clearCache(): void
}

export interface ThemeContext {
  currentTheme: Theme
  availableThemes: string[]
  isLoading: boolean
  error: Error | null
  switchTheme: (themeId: string) => Promise<void>
  loadTheme: (themeId: string) => Promise<void>
  resetTheme: () => void
  preferences: ThemePreferences
  updatePreferences: (preferences: Partial<ThemePreferences>) => void
}

export interface ThemePreferences {
  autoSwitch: boolean
  preferredTheme: string
  fallbackTheme: string
  persistence: 'local' | 'session' | 'none'
  transitions: boolean
  reducedMotion: boolean
}