import { Theme } from '../registry/types'

export const springMeadowTheme: Theme = {
  id: 'spring-meadow',
  name: 'Spring Meadow',
  description: 'Fresh colors inspired by Jackson Hole\'s wildflower meadows and mountain streams in spring',
  colors: {
    primary: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
      950: '#052e16'
    },
    secondary: {
      50: '#fef3c7',
      100: '#fee8a6',
      200: '#fcd74b',
      300: '#fbbf24',
      400: '#f59e0b',
      500: '#dc7609',
      600: '#b45309',
      700: '#92400e',
      800: '#78350f',
      900: '#451a03',
      950: '#311a03'
    },
    accent: {
      50: '#fdf4ff',
      100: '#fae8ff',
      200: '#f5d0fe',
      300: '#f0abfc',
      400: '#e879f9',
      500: '#d946ef',
      600: '#c026d3',
      700: '#a21caf',
      800: '#86198f',
      900: '#701a75',
      950: '#4a044e'
    },
    neutral: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
      950: '#030712'
    },
    semantic: {
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
      successLight: '#bbf7d0',
      warningLight: '#fcd74b',
      errorLight: '#fecaca',
      infoLight: '#bfdbfe'
    },
    brand: {
      jackson: '#16a34a',
      adventure: '#22c55e',
      nature: '#14532d',
      premium: '#d946ef'
    }
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
      serif: ['ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace']
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      '7xl': '4.5rem'
    },
    fontWeight: {
      thin: 100,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900
    },
    lineHeight: {
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em'
    }
  },
  spacing: {
    0: '0px',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    32: '8rem',
    40: '10rem',
    48: '12rem',
    56: '14rem',
    64: '16rem',
    80: '20rem',
    96: '24rem'
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },
  components: {
    button: {
      base: 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      variants: {
        primary: 'bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-600',
        secondary: 'bg-yellow-200 text-yellow-900 hover:bg-yellow-300 focus-visible:ring-yellow-500',
        accent: 'bg-purple-500 text-white hover:bg-purple-600 focus-visible:ring-purple-500',
        ghost: 'hover:bg-green-50 focus-visible:ring-green-500',
        outline: 'border border-green-300 bg-transparent hover:bg-green-50 focus-visible:ring-green-500'
      },
      sizes: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        xl: 'h-14 px-8 text-lg'
      },
      states: {
        hover: 'hover:opacity-90',
        active: 'active:scale-95',
        disabled: 'disabled:opacity-50 disabled:cursor-not-allowed',
        loading: 'cursor-wait'
      }
    },
    card: {
      base: 'rounded-lg border bg-white shadow-sm',
      variants: {
        default: 'border-green-200',
        elevated: 'border-green-200 shadow-md',
        outlined: 'border-green-300',
        filled: 'bg-green-50 border-green-200'
      },
      sizes: {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8'
      }
    },
    navigation: {
      base: 'flex items-center space-x-4',
      variants: {
        primary: 'bg-white border-b border-green-200',
        secondary: 'bg-green-50',
        sidebar: 'flex-col space-y-2 space-x-0',
        breadcrumb: 'text-sm text-gray-500'
      },
      states: {
        active: 'text-green-600 font-medium',
        hover: 'text-gray-900 hover:text-green-600',
        disabled: 'text-gray-400 cursor-not-allowed'
      }
    },
    restaurant: {
      card: {
        base: 'bg-white rounded-lg shadow-sm overflow-hidden transition-shadow duration-200',
        variants: {
          featured: 'shadow-lg hover:shadow-xl border-2 border-green-200',
          list: 'shadow-md hover:shadow-lg',
          compact: 'shadow-sm hover:shadow-md'
        }
      },
      rating: {
        base: 'flex items-center',
        star: 'text-yellow-400',
        text: 'text-sm text-gray-600 ml-1'
      },
      price: {
        base: 'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
        levels: {
          1: 'bg-green-100 text-green-800',
          2: 'bg-yellow-100 text-yellow-800',
          3: 'bg-orange-100 text-orange-800',
          4: 'bg-purple-100 text-purple-800'
        }
      },
      category: {
        base: 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
        variants: {
          primary: 'bg-green-100 text-green-800',
          secondary: 'bg-gray-100 text-gray-800'
        }
      }
    }
  },
  metadata: {
    version: '1.0.0',
    author: 'Jackson Hole Dining Team',
    description: 'Spring theme with fresh greens and wildflower accents',
    tags: ['seasonal', 'spring', 'fresh', 'nature'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    compatibility: ['1.0.0']
  }
}

export default springMeadowTheme