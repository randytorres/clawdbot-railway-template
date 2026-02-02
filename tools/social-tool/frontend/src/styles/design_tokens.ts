/**
 * L-CAS V1.5 Design System Tokens
 * 
 * A comprehensive design token system for the L-CAS content approval interface.
 * These tokens provide consistent styling across the application and support
 * both light and dark themes with a dark-first approach.
 * 
 * @version 1.5.0
 * @author Wanda (Design Agent)
 */

// =============================================================================
// COLOR TOKENS
// =============================================================================

/**
 * Core color palette - raw color values
 * Use semantic tokens below for actual implementation
 */
export const colors = {
  // Neutrals (dark mode optimized)
  neutral: {
    0: '#000000',
    50: '#0a0a0a',
    100: '#0f0f0f',
    150: '#141414',
    200: '#1a1a1a',
    250: '#1f1f1f',
    300: '#252525',
    350: '#2a2a2a',
    400: '#333333',
    500: '#444444',
    600: '#555555',
    700: '#666666',
    800: '#888888',
    900: '#a0a0a0',
    950: '#c0c0c0',
    1000: '#ffffff',
  },

  // Primary brand - Violet/Purple
  violet: {
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
    950: '#2e1065',
  },

  // Secondary accent - Cyan
  cyan: {
    50: '#ecfeff',
    100: '#cffafe',
    200: '#a5f3fc',
    300: '#67e8f9',
    400: '#22d3ee',
    500: '#06b6d4',
    600: '#0891b2',
    700: '#0e7490',
    800: '#155e75',
    900: '#164e63',
    950: '#083344',
  },

  // Semantic - Success/Green
  green: {
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
    950: '#052e16',
  },

  // Semantic - Warning/Amber
  amber: {
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
    950: '#451a03',
  },

  // Semantic - Error/Red
  red: {
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
    950: '#450a0a',
  },

  // Semantic - Info/Blue
  blue: {
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
    950: '#172554',
  },
} as const;

/**
 * Semantic color tokens for dark theme (default)
 */
export const semanticColors = {
  // Backgrounds
  background: {
    primary: colors.neutral[100],      // #0f0f0f - Main app background
    secondary: colors.neutral[200],    // #1a1a1a - Elevated surfaces
    tertiary: colors.neutral[300],     // #252525 - Cards, panels
    elevated: colors.neutral[350],     // #2a2a2a - Modals, popovers
    overlay: 'rgba(0, 0, 0, 0.6)',      // Backdrop overlays
    glass: 'rgba(30, 30, 30, 0.8)',    // Glassmorphism
  },

  // Text
  text: {
    primary: colors.neutral[1000],     // #ffffff - Main text
    secondary: colors.neutral[900],    // #a0a0a0 - Subdued text
    tertiary: colors.neutral[700],     // #666666 - Placeholder text
    disabled: colors.neutral[600],     // #555555 - Disabled state
    inverse: colors.neutral[100],      // #0f0f0f - Text on light bg
  },

  // Borders
  border: {
    default: 'rgba(255, 255, 255, 0.1)',
    subtle: 'rgba(255, 255, 255, 0.05)',
    strong: 'rgba(255, 255, 255, 0.2)',
    focus: colors.violet[500],
  },

  // Interactive states
  interactive: {
    default: colors.violet[500],       // #8b5cf6 - Primary actions
    hover: colors.violet[400],         // #a78bfa - Hover state
    active: colors.violet[600],        // #7c3aed - Active/pressed
    disabled: colors.neutral[600],     // #555555 - Disabled
  },

  // Status colors
  status: {
    success: colors.green[500],        // #22c55e
    successSubtle: colors.green[950],  // Background tint
    warning: colors.amber[500],        // #f59e0b
    warningSubtle: colors.amber[950],  // Background tint
    error: colors.red[500],            // #ef4444
    errorSubtle: colors.red[950],      // Background tint
    info: colors.blue[500],            // #3b82f6
    infoSubtle: colors.blue[950],      // Background tint
  },

  // Score indicators
  score: {
    high: colors.green[400],           // #4ade80 - Excellent
    highGlow: 'rgba(74, 222, 128, 0.3)',
    medium: colors.amber[400],         // #fbbf24 - Moderate
    mediumGlow: 'rgba(251, 191, 36, 0.3)',
    low: colors.red[400],              // #f87171 - Needs attention
    lowGlow: 'rgba(248, 113, 113, 0.3)',
  },

  // Gradients
  gradient: {
    primary: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
    accent: 'linear-gradient(135deg, #8b5cf6, #06b6d4, #8b5cf6)',
    scoreHigh: 'linear-gradient(90deg, #22c55e, #4ade80)',
    scoreMid: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
    scoreLow: 'linear-gradient(90deg, #ef4444, #f87171)',
    shimmer: `linear-gradient(90deg, ${colors.neutral[300]} 0%, rgba(255, 255, 255, 0.05) 50%, ${colors.neutral[300]} 100%)`,
  },
} as const;

// =============================================================================
// TYPOGRAPHY TOKENS
// =============================================================================

export const typography = {
  // Font families
  fontFamily: {
    sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', 'SF Mono', Monaco, Consolas, 'Liberation Mono', monospace",
  },

  // Font sizes (rem-based for accessibility)
  fontSize: {
    '2xs': '0.625rem',    // 10px
    xs: '0.75rem',        // 12px
    sm: '0.875rem',       // 14px
    base: '1rem',         // 16px
    lg: '1.125rem',       // 18px
    xl: '1.25rem',        // 20px
    '2xl': '1.5rem',      // 24px
    '3xl': '1.875rem',    // 30px
    '4xl': '2.25rem',     // 36px
    '5xl': '3rem',        // 48px
  },

  // Font weights
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  // Line heights
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  // Letter spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },

  // Predefined text styles
  styles: {
    // Headings
    h1: {
      fontSize: '2.25rem',
      fontWeight: 700,
      lineHeight: 1.25,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontSize: '1.875rem',
      fontWeight: 600,
      lineHeight: 1.25,
      letterSpacing: '-0.025em',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.375,
      letterSpacing: '-0.025em',
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.375,
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    // Body text
    body: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    bodySmall: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    // Labels & captions
    label: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.25,
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    // Code
    code: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.625,
    },
  },
} as const;

// =============================================================================
// SPACING TOKENS
// =============================================================================

/**
 * Spacing scale based on 4px grid
 */
export const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',   // 2px
  1: '0.25rem',      // 4px
  1.5: '0.375rem',   // 6px
  2: '0.5rem',       // 8px
  2.5: '0.625rem',   // 10px
  3: '0.75rem',      // 12px
  3.5: '0.875rem',   // 14px
  4: '1rem',         // 16px
  5: '1.25rem',      // 20px
  6: '1.5rem',       // 24px
  7: '1.75rem',      // 28px
  8: '2rem',         // 32px
  9: '2.25rem',      // 36px
  10: '2.5rem',      // 40px
  11: '2.75rem',     // 44px
  12: '3rem',        // 48px
  14: '3.5rem',      // 56px
  16: '4rem',        // 64px
  20: '5rem',        // 80px
  24: '6rem',        // 96px
  28: '7rem',        // 112px
  32: '8rem',        // 128px
  36: '9rem',        // 144px
  40: '10rem',       // 160px
  44: '11rem',       // 176px
  48: '12rem',       // 192px
  52: '13rem',       // 208px
  56: '14rem',       // 224px
  60: '15rem',       // 240px
  64: '16rem',       // 256px
  72: '18rem',       // 288px
  80: '20rem',       // 320px
  96: '24rem',       // 384px
} as const;

/**
 * Semantic spacing tokens for consistent layout
 */
export const layout = {
  // Page-level spacing
  page: {
    paddingX: spacing[6],         // 24px - Horizontal page padding
    paddingY: spacing[8],         // 32px - Vertical page padding
    maxWidth: '1440px',           // Max content width
    gap: spacing[6],              // 24px - Gap between major sections
  },

  // Card/panel spacing
  card: {
    padding: spacing[4],          // 16px - Internal card padding
    paddingLg: spacing[6],        // 24px - Large card padding
    gap: spacing[3],              // 12px - Gap between card elements
    radius: '0.75rem',            // 12px - Card border radius
  },

  // Grid system
  grid: {
    gap: spacing[4],              // 16px - Default grid gap
    gapSm: spacing[2],            // 8px - Tight grid gap
    gapLg: spacing[6],            // 24px - Loose grid gap
  },

  // Stack (vertical) spacing
  stack: {
    xs: spacing[1],               // 4px
    sm: spacing[2],               // 8px
    md: spacing[4],               // 16px
    lg: spacing[6],               // 24px
    xl: spacing[8],               // 32px
  },

  // Inline (horizontal) spacing
  inline: {
    xs: spacing[1],               // 4px
    sm: spacing[2],               // 8px
    md: spacing[3],               // 12px
    lg: spacing[4],               // 16px
    xl: spacing[6],               // 24px
  },
} as const;

// =============================================================================
// SHADOW TOKENS
// =============================================================================

export const shadows = {
  // Elevation shadows
  none: 'none',
  
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',

  // Glow effects
  glow: {
    primary: '0 0 20px rgba(139, 92, 246, 0.4)',
    success: '0 0 20px rgba(34, 197, 94, 0.4)',
    error: '0 0 20px rgba(239, 68, 68, 0.4)',
    subtle: '0 0 0 2px rgba(168, 85, 247, 0.4), 0 0 20px rgba(168, 85, 247, 0.15)',
  },

  // Focus rings
  focus: {
    default: `0 0 0 2px ${colors.violet[500]}, 0 0 0 4px rgba(139, 92, 246, 0.2)`,
    error: `0 0 0 2px ${colors.red[500]}, 0 0 0 4px rgba(239, 68, 68, 0.2)`,
  },
} as const;

// =============================================================================
// BORDER RADIUS TOKENS
// =============================================================================

export const radius = {
  none: '0',
  sm: '0.25rem',      // 4px
  default: '0.375rem', // 6px
  md: '0.5rem',       // 8px
  lg: '0.75rem',      // 12px
  xl: '1rem',         // 16px
  '2xl': '1.5rem',    // 24px
  '3xl': '2rem',      // 32px
  full: '9999px',     // Pill shape
} as const;

// =============================================================================
// Z-INDEX TOKENS
// =============================================================================

export const zIndex = {
  hide: -1,
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const;

// =============================================================================
// ANIMATION TOKENS
// =============================================================================

export const animation = {
  // Duration
  duration: {
    instant: '0ms',
    fastest: '50ms',
    fast: '100ms',
    normal: '150ms',
    slow: '200ms',
    slower: '300ms',
    slowest: '500ms',
  },

  // Easing curves
  easing: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    // Custom curves
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
  },

  // Predefined animations
  keyframes: {
    fadeIn: {
      from: { opacity: 0, transform: 'translateY(10px)' },
      to: { opacity: 1, transform: 'translateY(0)' },
    },
    fadeOut: {
      from: { opacity: 1, transform: 'translateY(0)' },
      to: { opacity: 0, transform: 'translateY(10px)' },
    },
    slideInRight: {
      from: { opacity: 0, transform: 'translateX(100%)' },
      to: { opacity: 1, transform: 'translateX(0)' },
    },
    slideInLeft: {
      from: { opacity: 0, transform: 'translateX(-100%)' },
      to: { opacity: 1, transform: 'translateX(0)' },
    },
    scaleIn: {
      from: { opacity: 0, transform: 'scale(0.95)' },
      to: { opacity: 1, transform: 'scale(1)' },
    },
    pulse: {
      '0%, 100%': { opacity: 1 },
      '50%': { opacity: 0.5 },
    },
    shimmer: {
      '0%': { backgroundPosition: '-200% 0' },
      '100%': { backgroundPosition: '200% 0' },
    },
    gradientShift: {
      '0%, 100%': { backgroundPosition: '0% 50%' },
      '50%': { backgroundPosition: '100% 50%' },
    },
    shake: {
      '0%, 100%': { transform: 'translateX(0)' },
      '25%': { transform: 'translateX(-4px)' },
      '75%': { transform: 'translateX(4px)' },
    },
    actionPulse: {
      '0%, 100%': { boxShadow: '0 0 0 0 rgba(139, 92, 246, 0.4)' },
      '50%': { boxShadow: '0 0 0 8px rgba(139, 92, 246, 0)' },
    },
  },

  // Transition presets
  transition: {
    fast: 'all 100ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    colors: 'color, background-color, border-color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    transform: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    opacity: 'opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

// =============================================================================
// BREAKPOINT TOKENS
// =============================================================================

export const breakpoints = {
  xs: '480px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Media query helpers
export const mediaQueries = {
  xs: `@media (min-width: ${breakpoints.xs})`,
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
  '2xl': `@media (min-width: ${breakpoints['2xl']})`,
  // Common queries
  hover: '@media (hover: hover) and (pointer: fine)',
  reducedMotion: '@media (prefers-reduced-motion: reduce)',
  dark: '@media (prefers-color-scheme: dark)',
  light: '@media (prefers-color-scheme: light)',
} as const;

// =============================================================================
// COMPONENT-SPECIFIC TOKENS
// =============================================================================

export const components = {
  // Button variants
  button: {
    height: {
      sm: '2rem',       // 32px
      md: '2.5rem',     // 40px
      lg: '3rem',       // 48px
    },
    paddingX: {
      sm: spacing[3],   // 12px
      md: spacing[4],   // 16px
      lg: spacing[6],   // 24px
    },
    fontSize: {
      sm: typography.fontSize.sm,
      md: typography.fontSize.base,
      lg: typography.fontSize.lg,
    },
    iconSize: {
      sm: '1rem',
      md: '1.25rem',
      lg: '1.5rem',
    },
  },

  // Input fields
  input: {
    height: {
      sm: '2rem',
      md: '2.5rem',
      lg: '3rem',
    },
    paddingX: spacing[3],
    borderRadius: radius.md,
  },

  // Video card (9:16 aspect ratio)
  videoCard: {
    aspectRatio: '9 / 16',
    minWidth: '180px',
    maxWidth: '280px',
  },

  // Inspector panel
  inspector: {
    width: '400px',
    maxWidth: '100vw',
  },

  // Toast notifications
  toast: {
    width: '360px',
    padding: spacing[4],
    borderRadius: radius.lg,
  },

  // Modal/Dialog
  modal: {
    maxWidth: {
      sm: '400px',
      md: '600px',
      lg: '800px',
      xl: '1000px',
      full: '100vw',
    },
    padding: spacing[6],
    borderRadius: radius.xl,
  },

  // Dropdown/Menu
  dropdown: {
    minWidth: '180px',
    maxHeight: '320px',
    padding: spacing[1],
    itemPadding: `${spacing[2]} ${spacing[3]}`,
    borderRadius: radius.lg,
  },

  // Tooltip
  tooltip: {
    maxWidth: '280px',
    padding: `${spacing[2]} ${spacing[3]}`,
    borderRadius: radius.default,
  },

  // Avatar
  avatar: {
    size: {
      xs: '1.5rem',    // 24px
      sm: '2rem',      // 32px
      md: '2.5rem',    // 40px
      lg: '3rem',      // 48px
      xl: '4rem',      // 64px
    },
  },

  // Badge/Pill
  badge: {
    height: {
      sm: '1.25rem',   // 20px
      md: '1.5rem',    // 24px
    },
    paddingX: {
      sm: spacing[2],
      md: spacing[2.5],
    },
    fontSize: {
      sm: typography.fontSize['2xs'],
      md: typography.fontSize.xs,
    },
  },
} as const;

// =============================================================================
// UTILITY EXPORTS
// =============================================================================

/**
 * Complete design tokens object for easy importing
 */
export const tokens = {
  colors,
  semanticColors,
  typography,
  spacing,
  layout,
  shadows,
  radius,
  zIndex,
  animation,
  breakpoints,
  mediaQueries,
  components,
} as const;

export type DesignTokens = typeof tokens;

export default tokens;
