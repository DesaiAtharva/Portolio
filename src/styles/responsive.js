// Responsive breakpoints for global use
export const breakpoints = {
  // Extra small devices (phones, 320px and up)
  xs: '320px',
  // Small devices (phones, 480px and up)
  sm: '480px',
  // Medium devices (tablets, 768px and up)
  md: '768px',
  // Large devices (desktops, 1024px and up)
  lg: '1024px',
  // Extra large devices (large desktops, 1200px and up)
  xl: '1200px',
  // Extra extra large devices (1400px and up)
  xxl: '1400px'
};

// Responsive media query helpers
export const mediaQueries = {
  xs: `@media (max-width: ${breakpoints.xs})`,
  sm: `@media (max-width: ${breakpoints.sm})`,
  md: `@media (max-width: ${breakpoints.md})`,
  lg: `@media (max-width: ${breakpoints.lg})`,
  xl: `@media (max-width: ${breakpoints.xl})`,
  xxl: `@media (max-width: ${breakpoints.xxl})`,
  // Min-width queries
  smUp: `@media (min-width: ${breakpoints.sm})`,
  mdUp: `@media (min-width: ${breakpoints.md})`,
  lgUp: `@media (min-width: ${breakpoints.lg})`,
  xlUp: `@media (min-width: ${breakpoints.xl})`,
  xxlUp: `@media (min-width: ${breakpoints.xxl})`,
};

// Common responsive font sizes
export const fontSizes = {
  // Headings
  h1: {
    base: '4rem',
    lg: '3.5rem',
    md: '2.5rem',
    sm: '2.2rem',
    xs: '1.8rem'
  },
  h2: {
    base: '3rem',
    lg: '2.5rem',
    md: '2rem',
    sm: '1.8rem',
    xs: '1.5rem'
  },
  h3: {
    base: '2rem',
    lg: '1.8rem',
    md: '1.5rem',
    sm: '1.3rem',
    xs: '1.1rem'
  },
  // Body text
  body: {
    base: '1rem',
    lg: '0.95rem',
    md: '0.9rem',
    sm: '0.85rem',
    xs: '0.8rem'
  },
  small: {
    base: '0.9rem',
    lg: '0.85rem',
    md: '0.8rem',
    sm: '0.75rem',
    xs: '0.7rem'
  }
};

// Common responsive spacing
export const spacing = {
  // Padding
  padding: {
    base: '2rem',
    lg: '1.5rem',
    md: '1rem',
    sm: '0.8rem',
    xs: '0.5rem'
  },
  // Margins
  margin: {
    base: '2rem',
    lg: '1.5rem',
    md: '1rem',
    sm: '0.8rem',
    xs: '0.5rem'
  },
  // Gaps
  gap: {
    base: '2rem',
    lg: '1.5rem',
    md: '1rem',
    sm: '0.8rem',
    xs: '0.5rem'
  }
};

// Responsive grid helpers
export const gridHelpers = {
  // Single column on mobile
  responsiveGrid: `
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    
    ${mediaQueries.lg} {
      gap: 1.5rem;
    }
    
    ${mediaQueries.md} {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
    
    ${mediaQueries.sm} {
      gap: 0.8rem;
    }
    
    ${mediaQueries.xs} {
      gap: 0.5rem;
    }
  `,
  
  // Three column responsive
  threeColumnGrid: `
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2rem;
    
    ${mediaQueries.lg} {
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
    }
    
    ${mediaQueries.md} {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  `
};

// Common responsive text styles
export const textStyles = {
  heading: `
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1rem;
    
    ${mediaQueries.md} {
      margin-bottom: 0.8rem;
    }
    
    ${mediaQueries.sm} {
      margin-bottom: 0.6rem;
    }
  `,
  
  body: `
    line-height: 1.6;
    margin-bottom: 1rem;
    
    ${mediaQueries.md} {
      line-height: 1.5;
      margin-bottom: 0.8rem;
    }
    
    ${mediaQueries.sm} {
      line-height: 1.4;
      margin-bottom: 0.6rem;
    }
  `
};
