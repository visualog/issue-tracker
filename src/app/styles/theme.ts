// px to rem conversion function
const pxToRem = (px: number) => `${px / 16}rem`;

export const theme = {
  colors: {
    primary: '#1a73e8',
    secondary: '#5f6368',
    background: '#ffffff',
    text: '#202124',
    border: '#dadce0',
    error: '#d93025',
    success: '#1e8e3e',
    light: '#f8f9fa',
    dark: '#343a40',
    white: '#ffffff',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  typography: {
    fontFamily: '"Roboto", "Noto Sans KR", sans-serif',
    fontSize: {
      small: '0.875rem',
      medium: '1rem',
      large: '1.25rem',
      xlarge: '1.5rem',
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
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
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '16px',
  },
  shadows: {
    small: '0 1px 2px rgba(0, 0, 0, 0.1)',
    medium: '0 2px 4px rgba(0, 0, 0, 0.1)',
    large: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
}; 