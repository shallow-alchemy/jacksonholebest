import { Theme } from '../registry/types'

export const summerAlpineTheme: Theme = {
  id: 'summer-alpine',
  name: 'Summer Alpine',
  description: 'Bright and vibrant colors reflecting Jackson Hole\'s summer hiking trails and crystal-clear lakes',
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554'
    },
    secondary: {
      50: '#ecfdf5',
      100: '#d1fae5',
      200: '#a7f3d0',
      300: '#6ee7b7',
      400: '#34d399',
      500: '#10b981',
      600: '#059669',
      700: '#047857',
      800: '#065f46',
      900: '#064e3b',
      950: '#022c22'
    },
    accent: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
      950: '#450a0a'
    },
    neutral: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      950: '#020617'
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
      jackson: '#1d4ed8',
      adventure: '#3b82f6',
      nature: '#10b981',
      premium: '#8b5cf6'
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
        secondary: 'bg-emerald-200 text-emerald-900 hover:bg-emerald-300 focus-visible:ring-emerald-500',
        accent: 'bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-500',
        ghost: 'hover:bg-blue-50 focus-visible:ring-blue-500',
        outline: 'border border-blue-300 bg-transparent hover:bg-blue-50 focus-visible:ring-blue-500'
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
        default: 'border-blue-200',
        elevated: 'border-blue-200 shadow-md',
        outlined: 'border-blue-300',
        filled: 'bg-blue-50 border-blue-200'
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
        primary: 'bg-white border-b border-blue-200',
        secondary: 'bg-blue-50',
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
          featured: 'shadow-lg hover:shadow-xl border-2 border-blue-200',
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
          1: 'bg-emerald-100 text-emerald-800',
          2: 'bg-blue-100 text-blue-800',
          3: 'bg-purple-100 text-purple-800',
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
    description: 'Summer theme with bright blues and alpine lake colors',
    tags: ['seasonal', 'summer', 'bright', 'alpine'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    compatibility: ['1.0.0']
  }
}

export default summerAlpineTheme