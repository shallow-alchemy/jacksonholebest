import { Theme } from '../registry/types'

export const winterWonderlandTheme: Theme = {
  id: 'winter-wonderland',
  name: 'Winter Wonderland',
  description: 'Cool, crisp colors reflecting Jackson Hole\'s world-famous ski slopes and snowy peaks',
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
      50: '#f5f3ff',
      100: '#ede9fe',
      200: '#ddd6fe',
      300: '#c4b5fd',
      400: '#a78bfa',
      500: '#8b5cf6',
      600: '#7c3aed',
      700: '#6d28d9',
      800: '#5b21b6',
      900: '#4c1d95',
      950: '#2e1065'
    },
    accent: {
      50: '#f0fdfa',
      100: '#ccfbf1',
      200: '#99f6e4',
      300: '#5eead4',
      400: '#2dd4bf',
      500: '#14b8a6',
      600: '#0d9488',
      700: '#0f766e',
      800: '#115e59',
      900: '#134e4a',
      950: '#042f2e'
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
      success: '#14b8a6',
      warning: '#f97316',
      error: '#e11d48',
      info: '#0ea5e9',
      successLight: '#ccfbf1',
      warningLight: '#fed7aa',
      errorLight: '#fce7f3',
      infoLight: '#bae6fd'
    },
    brand: {
      jackson: '#0369a1',
      adventure: '#0ea5e9',
      nature: '#0f766e',
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
        primary: 'bg-sky-600 text-white hover:bg-sky-700 focus-visible:ring-sky-600',
        secondary: 'bg-violet-200 text-violet-900 hover:bg-violet-300 focus-visible:ring-violet-500',
        accent: 'bg-teal-500 text-white hover:bg-teal-600 focus-visible:ring-teal-500',
        ghost: 'hover:bg-sky-50 focus-visible:ring-sky-500',
        outline: 'border border-sky-300 bg-transparent hover:bg-sky-50 focus-visible:ring-sky-500'
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
        default: 'border-slate-200',
        elevated: 'border-slate-200 shadow-md',
        outlined: 'border-slate-300',
        filled: 'bg-slate-50 border-slate-200'
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
        primary: 'bg-white border-b border-slate-200',
        secondary: 'bg-slate-50',
        sidebar: 'flex-col space-y-2 space-x-0',
        breadcrumb: 'text-sm text-slate-500'
      },
      states: {
        active: 'text-sky-600 font-medium',
        hover: 'text-slate-900 hover:text-sky-600',
        disabled: 'text-slate-400 cursor-not-allowed'
      }
    },
    restaurant: {
      card: {
        base: 'bg-white rounded-lg shadow-sm overflow-hidden transition-shadow duration-200',
        variants: {
          featured: 'shadow-lg hover:shadow-xl border-2 border-sky-200',
          list: 'shadow-md hover:shadow-lg',
          compact: 'shadow-sm hover:shadow-md'
        }
      },
      rating: {
        base: 'flex items-center',
        star: 'text-sky-500',
        text: 'text-sm text-slate-600 ml-1'
      },
      price: {
        base: 'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
        levels: {
          1: 'bg-teal-100 text-teal-800',
          2: 'bg-sky-100 text-sky-800',
          3: 'bg-violet-100 text-violet-800',
          4: 'bg-rose-100 text-rose-800'
        }
      },
      category: {
        base: 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
        variants: {
          primary: 'bg-sky-100 text-sky-800',
          secondary: 'bg-slate-100 text-slate-800'
        }
      }
    }
  },
  metadata: {
    version: '1.0.0',
    author: 'Jackson Hole Dining Team',
    description: 'Winter theme with cool blues and crisp mountain colors',
    tags: ['seasonal', 'winter', 'cool', 'snow'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    compatibility: ['1.0.0']
  }
}

export default winterWonderlandTheme