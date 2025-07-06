import { Theme } from '../registry/types'

export const autumnHarvestTheme: Theme = {
  id: 'autumn-harvest',
  name: 'Autumn Harvest',
  description: 'Warm, rich colors inspired by Jackson Hole\'s golden aspens and autumn mountain landscapes',
  colors: {
    primary: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
      950: '#451a03'
    },
    secondary: {
      50: '#fdf2f8',
      100: '#fce7f3',
      200: '#fbcfe8',
      300: '#f9a8d4',
      400: '#f472b6',
      500: '#ec4899',
      600: '#db2777',
      700: '#be185d',
      800: '#9d174d',
      900: '#831843',
      950: '#500724'
    },
    accent: {
      50: '#fefce8',
      100: '#fef9c3',
      200: '#fef08a',
      300: '#fde047',
      400: '#facc15',
      500: '#eab308',
      600: '#ca8a04',
      700: '#a16207',
      800: '#854d0e',
      900: '#713f12',
      950: '#422006'
    },
    neutral: {
      50: '#fafaf9',
      100: '#f5f5f4',
      200: '#e7e5e4',
      300: '#d6d3d1',
      400: '#a8a29e',
      500: '#78716c',
      600: '#57534e',
      700: '#44403c',
      800: '#292524',
      900: '#1c1917',
      950: '#0c0a09'
    },
    semantic: {
      success: '#84cc16',
      warning: '#f59e0b',
      error: '#dc2626',
      info: '#6366f1',
      successLight: '#d9f99d',
      warningLight: '#fde68a',
      errorLight: '#fecaca',
      infoLight: '#c7d2fe'
    },
    brand: {
      jackson: '#b45309',
      adventure: '#f59e0b',
      nature: '#854d0e',
      premium: '#be185d'
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
        primary: 'bg-amber-600 text-white hover:bg-amber-700 focus-visible:ring-amber-600',
        secondary: 'bg-pink-200 text-pink-900 hover:bg-pink-300 focus-visible:ring-pink-500',
        accent: 'bg-yellow-500 text-yellow-900 hover:bg-yellow-600 focus-visible:ring-yellow-500',
        ghost: 'hover:bg-amber-50 focus-visible:ring-amber-500',
        outline: 'border border-amber-300 bg-transparent hover:bg-amber-50 focus-visible:ring-amber-500'
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
        default: 'border-amber-200',
        elevated: 'border-amber-200 shadow-md',
        outlined: 'border-amber-300',
        filled: 'bg-amber-50 border-amber-200'
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
        primary: 'bg-white border-b border-amber-200',
        secondary: 'bg-amber-50',
        sidebar: 'flex-col space-y-2 space-x-0',
        breadcrumb: 'text-sm text-stone-500'
      },
      states: {
        active: 'text-amber-600 font-medium',
        hover: 'text-stone-900 hover:text-amber-600',
        disabled: 'text-stone-400 cursor-not-allowed'
      }
    },
    restaurant: {
      card: {
        base: 'bg-white rounded-lg shadow-sm overflow-hidden transition-shadow duration-200',
        variants: {
          featured: 'shadow-lg hover:shadow-xl border-2 border-amber-200',
          list: 'shadow-md hover:shadow-lg',
          compact: 'shadow-sm hover:shadow-md'
        }
      },
      rating: {
        base: 'flex items-center',
        star: 'text-amber-500',
        text: 'text-sm text-stone-600 ml-1'
      },
      price: {
        base: 'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
        levels: {
          1: 'bg-yellow-100 text-yellow-800',
          2: 'bg-amber-100 text-amber-800',
          3: 'bg-orange-100 text-orange-800',
          4: 'bg-pink-100 text-pink-800'
        }
      },
      category: {
        base: 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
        variants: {
          primary: 'bg-amber-100 text-amber-800',
          secondary: 'bg-stone-100 text-stone-800'
        }
      }
    }
  },
  metadata: {
    version: '1.0.0',
    author: 'Jackson Hole Dining Team',
    description: 'Autumn theme with warm amber and harvest colors',
    tags: ['seasonal', 'autumn', 'warm', 'harvest'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    compatibility: ['1.0.0']
  }
}

export default autumnHarvestTheme