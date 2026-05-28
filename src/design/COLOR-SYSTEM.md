# House Rules — Color System
**Version:** 1.0  
**Date:** May 2026  
**Palette name:** Terracotta & Midnight  
**Status:** Active

---

## Brand Anchors

| Name | Hex | Role | Contrast (white text) | WCAG |
|------|-----|------|-----------------------|------|
| Ember | `#8B2635` | Primary CTA · urgency · accountability | 8.7:1 | AAA ✅ |
| Forest | `#2D5A3D` | Secondary CTA · nav button · trust | 8.0:1 | AAA ✅ |
| Midnight | `#1A1510` | Primary text · dark anchor | 18.9:1 | AAA ✅ |

## Surfaces

| Name | Hex | Role |
|------|-----|------|
| Parchment | `#F5F0E8` | Page background |
| Walnut | `#5A3520` | Rich surface · depth |
| Terracotta | `#B85C38` | Accent · warmth · hospitality |

## Functional

| Name | Hex | Role | Contrast | WCAG |
|------|-----|------|----------|------|
| Amber | `#C47A2A` | Mixed signal · warning | 3.4:1 | ❌ Fail |

> ⚠️ Amber fails WCAG AA for button text. Use for signal pills only — never as a button background or body text color.

---

## Signal Pill System

For use inside review cards only. These are dark tinted surfaces derived from the brand anchors — not the raw hex values.

| State | Background | Text |
|-------|-----------|------|
| Positive | `#1e3d2a` | `#a8d5b5` |
| Negative | `#3d1a1a` | `#e8a5a5` |
| Neutral | `#2e2a24` | `#c8bfb0` |

**Examples:** Pay: On time · Management: Toxic · Scheduling: Mixed

---

## Usage Rules

1. **Ember** (`#8B2635`) is reserved for the primary hero CTA ("Read reviews") and any single high-priority action per screen.
2. **Forest** (`#2D5A3D`) is the nav persistent CTA ("Write a Review") and any secondary action button. It signals "available when ready" vs. Ember's urgency.
3. **Amber** is decorative only — signal pills, not interactive elements.
4. **Parchment** is the only page background. Do not swap to white.
5. Signal pills use the tinted system above — never the raw anchor colors — to avoid competing with interactive buttons.

---

## V2 Research Question

> Does the nav CTA ("Write a Review" in Forest) vs. hero primary CTA ("Read reviews" in Ember) create confusion or intentional hierarchy? Test in Round 2 usability sessions.

---

## Files

| File | Use |
|------|-----|
| `colors.css` | CSS custom properties — import globally |
| `tailwind-colors.js` | Drop into `tailwind.config.js → theme.extend.colors` |
| `COLOR-SYSTEM.md` | This reference doc |

