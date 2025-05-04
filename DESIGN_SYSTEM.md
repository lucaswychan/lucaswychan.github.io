# Design System Documentation

This document outlines the comprehensive design system implemented for the portfolio website, focusing on visual consistency, themability, and maintainability.

## 1. Color System

### Color Palettes
- **Primary Colors**: A hierarchical blue palette with 10 shades (from 50-900)
- **Accent Colors**: A complementary orange palette with 10 shades (from 50-900)
- **Neutral Colors**: A grayscale palette for text, backgrounds, and UI elements

### Semantic Color Usage
- **Functional Colors**: Success, warning, danger, and info colors with light variants
- **UI Element Colors**: Background, surface, text, and border colors with semantic naming
- **Special Effects**: Gradients and glass effects for visual interest

### Theme Support
- **Light Theme**: Clean, bright interface with subtle shadows
- **Dark Theme**: Rich, deep interface with stronger contrast
- **System Preference Detection**: Automatically follows the user's device preference
- **Manual Toggle**: Allows users to override system preference

## 2. Typography System

### Type Scale
A modular type scale with consistent progression:
- **Base Size**: 16px (1rem)
- **Scale Ratio**: 1.25 (major third)
- **Size Range**: From 0.75rem (xs) to 4rem (5xl)

### Typography Utilities
- **Font Weights**: Thin (100) to Black (900)
- **Line Heights**: From tight (1) to loose (2)
- **Letter Spacing**: From tighter (-0.05em) to widest (0.1em)
- **Responsive Adjustments**: Automatically scales on smaller devices

### Text Components
- **Headings**: Six levels with consistent styling
- **Body Text**: Regular, large, and small variants
- **Caption Text**: For secondary information
- **Utility Classes**: For consistent text styling across components

## 3. Space and Layout

### Spacing System
- **Base Unit**: 0.25rem (4px)
- **Scale Progression**: 0, 0.25rem, 0.5rem, 0.75rem, 1rem, 1.5rem, 2rem, 3rem, 4rem, 6rem, 8rem, 10rem
- **Usage**: Consistent margins, padding, and layout spacing

### Border Radius
- **Consistent Radius Scale**: None, small, medium, large, extra-large, 2xl, 3xl, and full (rounded)
- **Semantic Usage**: Buttons, cards, badges, and UI elements

### Elevation System
- **Shadow Scale**: From subtle (sm) to pronounced (2xl)
- **Inner Shadow**: For inset effects
- **Theme-aware**: Adjusted for both light and dark modes

## 4. Animation and Interaction

### Transitions
- **Duration Scale**: Fast (150ms), normal (300ms), slow (500ms), slower (1000ms)
- **Easing Curves**: Bezier, bounce, ease-out, and ease-in
- **Standardized Transitions**: For colors, transform, and shadow effects

### Z-Index Management
- **Organized Scale**: 0, 10, 20, 30, 40, 50
- **Semantic Layers**: Modal, toast, tooltip, header, dropdown

## 5. Implementation Details

### CSS Variables
All design tokens are implemented as CSS variables, enabling:
- **Consistent Usage**: Every component draws from the same source
- **Easy Theming**: Variables can be overridden at the root level
- **Maintainability**: Change a value in one place, affects entire app

### Responsive Design
- **Media Queries**: Adjustments for different viewport sizes
- **Fluid Typography**: Scale type based on viewport size
- **Theme Toggle**: Optimized for both desktop and mobile

### Accessibility Considerations
- **Color Contrast**: Ensured in both light and dark modes
- **Focus States**: Visible focus indicators for keyboard navigation
- **ARIA Support**: Proper labeling on interactive elements

## Usage Examples

```css
/* Using color variables */
.my-component {
  color: var(--text-primary);
  background-color: var(--surface);
  border: 1px solid var(--border);
}

/* Using typography classes */
<h1 class="heading-1">Main Title</h1>
<p class="body-large">Important paragraph</p>
<span class="caption text-muted">Additional information</span>

/* Spacing and layout */
.card {
  padding: var(--space-5);
  margin-bottom: var(--space-6);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-md);
}
```

## Theme Toggle Component

The design system includes a dedicated Theme Toggle component that:
1. Detects system color scheme preference
2. Allows manual override via toggle button
3. Persists user preference in localStorage
4. Provides smooth transition animation between themes
5. Uses sun/moon icons for clear visual indication

## Benefits

This design system provides several advantages:
- **Visual Consistency**: Unified appearance across the portfolio
- **Developer Efficiency**: Pre-defined tokens reduce decision fatigue
- **Maintainability**: Centralized design decisions
- **Accessibility**: Built-in considerations for all users
- **Theming Support**: Light and dark modes without duplication
- **Performance**: Optimized CSS with minimal redundancy 