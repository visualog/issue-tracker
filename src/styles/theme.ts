// px to rem conversion function
const pxToRem = (px: number) => `${px / 16}rem`;

export const theme = {
  colors: {
    primary: '#0066cc',
    secondary: '#6c757d',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',
    light: '#f8f9fa',
    dark: '#343a40',
    white: '#ffffff',
    background: '#f8f9fa',
  },
  typography: {
    fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    heading: {
      h1: pxToRem(24),
      h2: pxToRem(20),
      h3: pxToRem(18),
    },
    subtitle: {
      subtitle1: pxToRem(16),
      subtitle2: pxToRem(14),
      subtitle3: pxToRem(13),
    },
    body1: {
      regular: pxToRem(16),
      medium: pxToRem(16),
      underline: pxToRem(16),
    },
    body2: {
      regular: pxToRem(14),
      medium: pxToRem(14),
      underline: pxToRem(14),
      long: {
        regular: pxToRem(14),
        medium: pxToRem(14),
        underline: pxToRem(14),
      },
    },
    body3: {
      regular: pxToRem(13),
      medium: pxToRem(13),
      underline: pxToRem(13),
    },
    body4: {
      regular: pxToRem(12),
      medium: pxToRem(12),
      underline: pxToRem(12),
    },
    caption: {
      caption1: {
        regular: pxToRem(12),
      },
      caption2: {
        regular: pxToRem(11),
        bold: pxToRem(11),
      },
    },
  },
  spacing: {
    xs: pxToRem(4),
    sm: pxToRem(8),
    md: pxToRem(16),
    lg: pxToRem(24),
    xl: pxToRem(32),
  },
  borderRadius: {
    sm: pxToRem(4),
    md: pxToRem(8),
    lg: pxToRem(16),
  },
  elevation: {
    shadow100: '0px 1px 4px rgba(25, 31, 40, 0.12), 0px 0px 1px rgba(0, 0, 0, 0.04)',
    shadow200: '0px 2px 8px rgba(25, 31, 40, 0.12)',
    shadow300: '0px 4px 12px rgba(25, 31, 40, 0.12)',
    shadow400: '0px 4px 16px rgba(25, 31, 40, 0.2)',
    shadow500: '0px 8px 20px rgba(25, 31, 40, 0.24)',
  },
}; 