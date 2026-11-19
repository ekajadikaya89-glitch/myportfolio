# Design Direction: Eka Prasetyo Personal Portfolio

## Design Read

Reading this as: personal AI and full-stack software engineering portfolio for technical recruiters and product founders, in an architectural-editorial technical ledger style, dial **ENERGY 2 / RHYTHM 3 / MOTION 2**.

- **Dial:** `ENERGY 2 / RHYTHM 3 / MOTION 2`
- **Identity Motif:** Architectural specification rules (1px structural hairlines, numeric section indices `01`, `02`, `03`, asymmetric editorial ledgers, and bespoke system topology schematics).

---

## Color System (R-01, R-21, R-25, R-29, R-34)

Core neutral palette plus one deliberate accent (`--brand`), supporting both dark (default, suited to a developer/systems identity) and light themes via a working toggle.

### Dark Theme (Default)

| Token | Hex | Role | Verified Contrast (WCAG) |
|---|---|---|---|
| `--background` | `#08090B` | Page canvas | Base |
| `--card` | `#101216` | Primary elevated ledger/panel | Surface layer |
| `--elevated` | `#171A20` | Interactive hover / nested panel | Surface layer |
| `--foreground` | `#F5F6F7` | Primary ink | 18.41:1 on `#08090B` (AA/AAA) |
| `--muted-foreground` | `#9BA1AD` | Secondary prose & metadata | 7.68:1 on `#08090B`, 7.23:1 on `#101216`, 6.72:1 on `#171A20` |
| `--input` | `#5E6673` | Interactive control & input borders | 3.44:1 on `#08090B`, 3.24:1 on `#101216` (WCAG 1.4.11 >= 3:1) |
| `--border` | `#232730` | Non-interactive structural dividers | Structural hairline |
| `--brand` | `#38BDF8` | Deliberate accent (focus, active marker, schematic signal) | 9.30:1 on `#08090B`, 8.75:1 on `#101216` |
| `--success` | `#4ADE80` | Live / implemented status | 10.76:1 on `#101216` |
| `--warning` | `#FBBF24` | Setup / concept status | 11.23:1 on `#101216` |
| `--destructive` | `#F87171` | Validation & error states | 6.78:1 on `#101216` |

### Light Theme

| Token | Hex | Role | Verified Contrast (WCAG) |
|---|---|---|---|
| `--background` | `#FAFAFA` | Page canvas | Base |
| `--card` | `#FFFFFF` | Primary surface | Surface layer |
| `--elevated` | `#F1F2F4` | Interactive hover / nested panel | Surface layer |
| `--foreground` | `#0B0C0E` | Primary ink | 18.75:1 on `#FAFAFA` (AA/AAA) |
| `--muted-foreground` | `#525866` | Secondary prose & metadata | 6.83:1 on `#FAFAFA`, 7.13:1 on `#FFFFFF`, 6.36:1 on `#F1F2F4` |
| `--input` | `#767D8A` | Interactive control & input borders | 3.97:1 on `#FAFAFA`, 4.14:1 on `#FFFFFF` (WCAG 1.4.11 >= 3:1) |
| `--border` | `#E1E4E8` | Non-interactive structural dividers | Structural hairline |
| `--brand` | `#0369A1` | Deliberate accent | 5.68:1 on `#FAFAFA`, 5.93:1 on `#FFFFFF` |
| `--success` | `#15803D` | Live / implemented status | 5.02:1 on `#FFFFFF` |
| `--warning` | `#B45309` | Setup / concept status | 5.02:1 on `#FFFFFF` |
| `--destructive` | `#B91C1C` | Validation & error states | 6.47:1 on `#FFFFFF` |

---

## Written One-Line Decision Rationales (R-31)

- **Color (`#08090B` + `#38BDF8` dark, `#FAFAFA` + `#0369A1` light):** Dark slate canvas mirrors engineering workspaces without neon saturation, paired with a single calibrated cyan/cobalt accent reserved for focal indicators and system links.
- **Typography (`Plus Jakarta Sans` + `IBM Plex Mono`):** Plus Jakarta Sans gives geometric warmth with Indonesian design roots instead of the default Inter/Geist template look; IBM Plex Mono is restricted strictly to code, indices, and stack identifiers without wide-tracked uppercase eyebrow slogans.
- **Layout & Rhythm (`RHYTHM 3`):** Each homepage band shifts composition (split hero + architecture schematic, pausable discipline strip, editorial statement + 6-stage rail, asymmetric 2-tier expertise ledger, alternating case studies, split numbered philosophy list, full-bleed closing band) so sections never blur into one repeated card grid.
- **Spacing:** Section padding deliberately alternates between tight utility bands (`py-14 md:py-20`) and deeper editorial moments (`py-20 md:py-28`) with smaller mobile steps so narrow screens stay scannable.
- **Radius (`0.5rem` base):** Inputs and buttons use `rounded-lg`, primary media containers use `rounded-xl`, and compact tags/status chips use `rounded-md`; uniform pill shapes are avoided so component roles stay legible.
- **Surface Effects (Glass, Glow, Grid):** `backdrop-blur-md` is capped at 1 element (the sticky header when scrolled); decorative glow orbs and background grid wallpaper are omitted so real typography and diagrams carry visual hierarchy.
- **Icons & Visuals:** Custom geometric SVG technical icons (square-cap 1.6px strokes) replace default rounded Lucide icons and the generic Sparkles icon; bespoke 1600x1000 SVG system architecture schematics replace placeholder mockups so every project visual communicates real architecture honestly.
- **Motion (`MOTION 2`):** Subtle entrance and section reveals respect `prefers-reduced-motion`; zero endless pulses; the discipline ticker includes a keyboard-accessible Pause/Play control.
