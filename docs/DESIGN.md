
# Design System Documentation
## AI-Powered Trend Forecasting Platform for URBN

### Version: 1.0
### Date: June 2025
### Document Owner: Design Team

---

## 1. Design Philosophy

### 1.1 Core Principles
- **Elegance through Simplicity**: Clean, uncluttered interfaces that prioritize content
- **Data-Driven Clarity**: Information hierarchy that makes complex data accessible
- **Brand Harmony**: Consistent with URBN's sophisticated aesthetic
- **Performance-First**: Lightweight components that load quickly
- **Accessibility**: WCAG 2.1 AA compliant design decisions

### 1.2 User Experience Goals
- **Instant Comprehension**: Users should understand trends at a glance
- **Effortless Navigation**: Intuitive flow between discovery and action
- **Confidence Building**: Visual cues that support decision-making
- **Collaborative**: Design that encourages team interaction

---

## 2. Color System

### 2.1 Primary Palette
```css
/* Amber Tones - Primary Brand */
--amber-50: #fffbeb;
--amber-100: #fef3c7;
--amber-200: #fde68a;
--amber-300: #fcd34d;
--amber-400: #fbbf24;
--amber-500: #f59e0b;  /* Primary */
--amber-600: #d97706;  /* Primary Dark */
--amber-700: #b45309;
--amber-800: #92400e;
--amber-900: #78350f;
```

### 2.2 Secondary Palette
```css
/* Stone Grays - Neutral Foundation */
--stone-50: #fafaf9;
--stone-100: #f5f5f4;
--stone-200: #e7e5e4;
--stone-300: #d6d3d1;
--stone-400: #a8a29e;  /* Secondary */
--stone-500: #78716c;  /* Secondary Dark */
--stone-600: #57534e;
--stone-700: #44403c;
--stone-800: #292524;
--stone-900: #1c1917;
```

### 2.3 Semantic Colors
```css
/* Success */
--emerald-600: #059669;
--emerald-500: #10b981;

/* Warning/Error */
--red-600: #dc2626;
--red-500: #ef4444;

/* Info */
--blue-600: #2563eb;
--blue-500: #3b82f6;
```

### 2.4 Usage Guidelines
- **Primary Amber**: CTAs, active states, trend highlights
- **Stone Grays**: Text, borders, subtle backgrounds
- **Emerald**: Positive trends, success states
- **Red**: Negative trends, warnings
- **Background Gradient**: `bg-gradient-to-br from-stone-50 to-amber-50`

---

## 3. Typography

### 3.1 Font Stack
```css
font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### 3.2 Type Scale
```css
/* Headings */
.text-4xl { font-size: 2.25rem; line-height: 2.5rem; }    /* h1 */
.text-3xl { font-size: 1.875rem; line-height: 2.25rem; }  /* h2 */
.text-2xl { font-size: 1.5rem; line-height: 2rem; }       /* h3 */
.text-xl { font-size: 1.25rem; line-height: 1.75rem; }    /* h4 */
.text-lg { font-size: 1.125rem; line-height: 1.75rem; }   /* h5 */

/* Body */
.text-base { font-size: 1rem; line-height: 1.5rem; }      /* Default */
.text-sm { font-size: 0.875rem; line-height: 1.25rem; }   /* Small */
.text-xs { font-size: 0.75rem; line-height: 1rem; }       /* Tiny */
```

### 3.3 Font Weights
```css
.font-light { font-weight: 300; }    /* Elegant headings */
.font-normal { font-weight: 400; }   /* Body text */
.font-medium { font-weight: 500; }   /* Emphasis */
.font-semibold { font-weight: 600; } /* Strong emphasis */
```

### 3.4 Usage Patterns
- **Page Titles**: `text-3xl font-light text-stone-800`
- **Section Headers**: `text-xl font-light text-stone-700`
- **Card Titles**: `text-lg font-light text-stone-800`
- **Body Text**: `text-sm text-stone-600`
- **Captions**: `text-xs text-stone-500`

---

## 4. Spacing System

### 4.1 Base Unit
- **Base**: 4px (0.25rem)
- **Scale**: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96

### 4.2 Component Spacing
```css
/* Padding */
.p-2 { padding: 0.5rem; }     /* 8px - tight */
.p-4 { padding: 1rem; }       /* 16px - comfortable */
.p-6 { padding: 1.5rem; }     /* 24px - spacious */
.p-8 { padding: 2rem; }       /* 32px - generous */

/* Margins */
.mb-2 { margin-bottom: 0.5rem; }   /* 8px */
.mb-4 { margin-bottom: 1rem; }     /* 16px */
.mb-6 { margin-bottom: 1.5rem; }   /* 24px */
.mb-8 { margin-bottom: 2rem; }     /* 32px */
```

### 4.3 Layout Patterns
- **Page Containers**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Card Padding**: `p-6` (24px)
- **Section Spacing**: `space-y-8` (32px between sections)
- **Component Spacing**: `space-y-4` (16px between components)

---

## 5. Component Patterns

### 5.1 Cards
```tsx
// Standard card pattern
<div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200 hover:shadow-lg transition-all duration-300">
  <div className="p-6">
    {/* Card content */}
  </div>
</div>
```

**Variations:**
- **Trend Cards**: Include image, hover effects, sparklines
- **Data Cards**: Focus on metrics, minimal decoration
- **Action Cards**: Prominent CTAs, interactive elements

### 5.2 Buttons
```tsx
// Primary button
<Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700">

// Secondary button
<Button variant="outline" className="border-stone-300 text-stone-700 hover:bg-stone-50">

// Ghost button
<Button variant="ghost" className="text-stone-600 hover:text-stone-800 hover:bg-stone-100">
```

### 5.3 Form Elements
```tsx
// Input styling
<Input className="border-stone-200 focus:border-amber-500 focus:ring-amber-500" />

// Select styling
<Select>
  <SelectTrigger className="border-stone-200 focus:border-amber-500">
</Select>
```

### 5.4 Navigation
```tsx
// Header navigation
<nav className="bg-white/80 backdrop-blur-sm border-b border-stone-200">

// Sidebar navigation
<aside className="bg-stone-50 border-r border-stone-200">
```

---

## 6. Layout Guidelines

### 6.1 Grid System
- **Desktop**: 12-column grid with 24px gutters
- **Tablet**: 8-column grid with 20px gutters
- **Mobile**: 4-column grid with 16px gutters

### 6.2 Breakpoints
```css
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large */
2xl: 1536px /* 2X large */
```

### 6.3 Container Patterns
```tsx
// Page container
<div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

// Content grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Two-column layout
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
  <div className="lg:col-span-2"> {/* Main content */}
  <div className="lg:col-span-1"> {/* Sidebar */}
```

---

## 7. Data Visualization

### 7.1 Chart Colors
```css
/* Primary chart colors */
--chart-1: #d97706;  /* Amber */
--chart-2: #059669;  /* Emerald */
--chart-3: #dc2626;  /* Red */
--chart-4: #7c3aed;  /* Purple */
--chart-5: #2563eb;  /* Blue */
```

### 7.2 Chart Styling
```tsx
// Recharts configuration
<BarChart>
  <XAxis 
    dataKey="name" 
    tick={{ fontSize: 12, fill: '#78716c' }}
    axisLine={{ stroke: '#e7e5e4' }}
  />
  <YAxis 
    tick={{ fontSize: 12, fill: '#78716c' }}
    axisLine={{ stroke: '#e7e5e4' }}
    gridLines={{ stroke: '#f5f5f4' }}
  />
</BarChart>
```

### 7.3 Sparklines
- **Height**: 32px (h-8)
- **Color**: Amber gradient
- **Style**: Smooth curves, no axes
- **Usage**: Trend momentum indicators

---

## 8. Interactive States

### 8.1 Hover Effects
```css
/* Card hover */
.hover\:shadow-lg:hover { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }

/* Button hover */
.hover\:scale-105:hover { transform: scale(1.05); }

/* Link hover */
.hover\:text-amber-600:hover { color: #d97706; }
```

### 8.2 Focus States
```css
/* Form focus */
.focus\:ring-2:focus { box-shadow: 0 0 0 2px #f59e0b; }

/* Button focus */
.focus-visible\:ring-2:focus-visible { box-shadow: 0 0 0 2px #f59e0b; }
```

### 8.3 Loading States
```tsx
// Skeleton pattern
<div className="animate-pulse">
  <div className="h-4 bg-stone-200 rounded w-3/4 mb-2"></div>
  <div className="h-4 bg-stone-200 rounded w-1/2"></div>
</div>

// Spinner pattern
<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
```

---

## 9. Iconography

### 9.1 Icon Library
- **Source**: Lucide React
- **Size**: 16px (w-4 h-4) for inline, 24px (w-6 h-6) for standalone
- **Style**: Consistent stroke width (2px)
- **Color**: Inherit from parent text color

### 9.2 Usage Patterns
```tsx
// Navigation icons
<TrendingUp className="w-5 h-5 text-stone-600" />

// Action icons
<Plus className="w-4 h-4" />

// Status icons
<ArrowUp className="w-3 h-3 text-emerald-600" />
```

---

## 10. Animation Guidelines

### 10.1 Timing Functions
```css
/* Standard easing */
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

/* Bounce easing */
transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### 10.2 Duration Scale
```css
.duration-75   { transition-duration: 75ms; }   /* Instant feedback */
.duration-150  { transition-duration: 150ms; }  /* Quick interactions */
.duration-300  { transition-duration: 300ms; }  /* Standard animations */
.duration-500  { transition-duration: 500ms; }  /* Slower transitions */
```

### 10.3 Animation Patterns
```tsx
// Card entrance
<div className="animate-fade-in">

// Hover scale
<div className="transition-transform duration-200 hover:scale-105">

// Loading spinner
<div className="animate-spin">
```

---

## 11. Responsive Design

### 11.1 Mobile-First Approach
- Start with mobile layout
- Progressive enhancement for larger screens
- Touch-friendly interactive elements (44px minimum)

### 11.2 Responsive Patterns
```tsx
// Responsive grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

// Responsive text
<h1 className="text-2xl sm:text-3xl lg:text-4xl font-light">

// Responsive spacing
<div className="p-4 lg:p-8">
```

### 11.3 Content Strategy
- **Mobile**: Single column, collapsed navigation
- **Tablet**: Two columns, expanded content
- **Desktop**: Multi-column layouts, full feature access

---

## 12. Accessibility

### 12.1 Color Contrast
- **Normal text**: Minimum 4.5:1 ratio
- **Large text**: Minimum 3:1 ratio
- **Interactive elements**: Minimum 3:1 ratio

### 12.2 Focus Management
```tsx
// Keyboard navigation
<button className="focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2">

// Skip links
<a href="#main-content" className="sr-only focus:not-sr-only">Skip to main content</a>
```

### 12.3 Screen Reader Support
```tsx
// Proper ARIA labels
<button aria-label="Add trend to comparison">
  <Plus className="w-4 h-4" />
</button>

// Semantic markup
<main id="main-content">
<nav aria-label="Main navigation">
```

---

## 13. Code Standards

### 13.1 Component Structure
```tsx
// Component template
interface ComponentProps {
  // Props definition
}

export const Component = ({ prop }: ComponentProps) => {
  // Hooks and state

  // Event handlers

  // Render
  return (
    <div className="component-container">
      {/* Component content */}
    </div>
  );
};
```

### 13.2 CSS Class Naming
- Use Tailwind CSS utilities
- Compose with `cn()` utility for conditional classes
- Group related classes logically

### 13.3 File Organization
```
src/
├── components/
│   ├── ui/          # shadcn/ui components
│   └── [Component].tsx
├── pages/
│   └── [Page].tsx
├── hooks/
│   └── use[Hook].tsx
└── lib/
    └── utils.ts
```

---

## 14. Performance Guidelines

### 14.1 Image Optimization
- Use appropriate formats (WebP, AVIF)
- Implement lazy loading
- Provide appropriate sizes and srcsets

### 14.2 Component Optimization
- Lazy load heavy components
- Minimize re-renders with proper memoization
- Use React.Suspense for loading states

### 14.3 Bundle Optimization
- Tree-shake unused code
- Code split by route
- Minimize external dependencies

---

## 15. Brand Expression

### 15.1 URBN Aesthetic
- **Sophisticated**: Clean lines, ample whitespace
- **Contemporary**: Modern typography, subtle gradients
- **Accessible**: High contrast, clear hierarchy
- **Trustworthy**: Consistent patterns, reliable interactions

### 15.2 Tone of Voice
- **Professional**: Clear, concise copy
- **Confident**: Decisive language for recommendations
- **Helpful**: Supportive guidance throughout workflow
- **Human**: Approachable, not overly technical

---

## 16. Implementation Checklist

### 16.1 New Component Checklist
- [ ] Follows established design patterns
- [ ] Includes proper TypeScript types
- [ ] Implements responsive design
- [ ] Includes accessibility features
- [ ] Uses semantic HTML
- [ ] Follows animation guidelines
- [ ] Includes proper loading states
- [ ] Tested across breakpoints

### 16.2 Design Review Checklist
- [ ] Color contrast meets WCAG standards
- [ ] Typography hierarchy is clear
- [ ] Spacing follows 4px grid
- [ ] Interactive elements are appropriately sized
- [ ] Animations enhance rather than distract
- [ ] Content is readable at all breakpoints
- [ ] Loading states provide clear feedback

---

**Document Approval:**
- Design Lead: ________________
- Frontend Lead: ________________
- Product Manager: ________________

**Last Updated:** June 5, 2025
**Next Review:** July 5, 2025
