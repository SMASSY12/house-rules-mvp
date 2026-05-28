// ============================================
// House Rules — Tailwind Color Config
// Add this inside the `theme.extend` block
// of your tailwind.config.js
// ============================================

// In tailwind.config.js:
// theme: {
//   extend: {
//     colors: { ...paste the object below... }
//   }
// }

const houseRulesColors = {
  ember:      '#8B2635',   // Primary CTA — urgency, accountability
  forest:     '#2D5A3D',   // Secondary CTA — trust, depth
  midnight:   '#1A1510',   // Primary text — dark anchor
  parchment:  '#F5F0E8',   // Page background
  walnut:     '#5A3520',   // Rich surface — depth
  terracotta: '#B85C38',   // Accent — warmth, hospitality
  amber:      '#C47A2A',   // Mixed signal — pills only, not buttons

  // Signal pill system (in-review use only)
  signal: {
    positiveBg:   '#1e3d2a',
    positiveText: '#a8d5b5',
    negativeBg:   '#3d1a1a',
    negativeText: '#e8a5a5',
    neutralBg:    '#2e2a24',
    neutralText:  '#c8bfb0',
  },
};

module.exports = houseRulesColors;

// ============================================
// USAGE EXAMPLES
// ============================================
// bg-ember          → primary CTA background
// bg-forest         → secondary/nav CTA background
// hover:bg-[#1e3d2a] → forest hover state
// text-midnight     → body text
// bg-parchment      → page background
// text-terracotta   → accent text
// ============================================
