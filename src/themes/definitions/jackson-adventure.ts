import { Theme } from '../registry/types'

export const jacksonAdventureTheme: Theme = {
  id: 'jackson-adventure',
  name: 'Jackson Adventure',
  description: 'A theme inspired by the rugged beauty and adventurous spirit of Jackson Hole',
  colors: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
      950: '#082f49'
    },
    secondary: {
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
    accent: {
      50: '#fff7ed',
      100: '#ffedd5',
      200: '#fed7aa',
      300: '#fdba74',
      400: '#fb923c',
      500: '#f97316',
      600: '#ea580c',
      700: '#c2410c',
      800: '#9a3412',
      900: '#7c2d12',
      950: '#431407'
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
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
      successLight: '#d1fae5',
      warningLight: '#fef3c7',
      errorLight: '#fee2e2',
      infoLight: '#dbeafe'
    },
    brand: {
      jackson: '#0369a1',
      adventure: '#f97316',
      nature: '#059669',
      premium: '#7c3aed'
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
        primary: 'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus-visible:ring-gray-500',
        accent: 'bg-orange-500 text-white hover:bg-orange-600 focus-visible:ring-orange-500',
        ghost: 'hover:bg-gray-100 focus-visible:ring-gray-500',
        outline: 'border border-gray-300 bg-transparent hover:bg-gray-50 focus-visible:ring-gray-500'
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
        default: 'border-gray-200',
        elevated: 'border-gray-200 shadow-md',
        outlined: 'border-gray-300',
        filled: 'bg-gray-50 border-gray-200'
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
        primary: 'bg-white border-b border-gray-200',
        secondary: 'bg-gray-50',
        sidebar: 'flex-col space-y-2 space-x-0',
        breadcrumb: 'text-sm text-gray-500'
      },
      states: {
        active: 'text-blue-600 font-medium',
        hover: 'text-gray-900 hover:text-blue-600',
        disabled: 'text-gray-400 cursor-not-allowed'
      }
    },
    restaurant: {
      card: {
        base: 'bg-white rounded-lg shadow-sm overflow-hidden transition-shadow duration-200',
        variants: {
          featured: 'shadow-lg hover:shadow-xl',
          list: 'shadow-md hover:shadow-lg',
          compact: 'shadow-sm hover:shadow-md'
        }
      },
      rating: {
        base: 'flex items-center',
        star: 'text-yellow-500',
        text: 'text-sm text-gray-600 ml-1'
      },
      price: {
        base: 'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
        levels: {
          1: 'bg-green-100 text-green-800',
          2: 'bg-yellow-100 text-yellow-800',
          3: 'bg-orange-100 text-orange-800',
          4: 'bg-red-100 text-red-800'
        }
      },
      category: {
        base: 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
        variants: {
          primary: 'bg-blue-100 text-blue-800',
          secondary: 'bg-gray-100 text-gray-800'
        }
      }
    }
  },
  metadata: {
    version: '1.0.0',
    author: 'Jackson Hole Dining Team',
    description: 'The default theme capturing the adventurous spirit of Jackson Hole',
    tags: ['adventure', 'outdoor', 'mountain', 'default'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    compatibility: ['1.0.0']
  }
}

export default jacksonAdventureTheme