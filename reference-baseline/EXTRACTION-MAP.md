# Krigsvold extraction map — source-derived baseline

## Authority and status

Canonical: `basuhoward/krigsvold.org` at `007a4d379e9bd37dee55f86827df6e067ff27335`, a functioning Astro site. This source specimen is the **first content-neutral baseline**, not the complete original website and not evidence that all reusable capabilities already exist. Original CSS and its Material Kit foundation are preserved verbatim; the representative homepage and article content are fictional.

## Source to fixture mapping

| Source construct | Origin | Neutral fixture | Verification |
| --- | --- | --- | --- |
| Body, link, headings, controls, spacings | `src/styles/site.css`, historical `@krigsvold/theme` | All routes | Computed typography, color and focus |
| Material Kit/Bootstrap layout foundation | `assets/css/material-kit.min.css` | All routes | Container, row/col, dropdown, responsive behavior |
| Translucent navy nav and popup | `src/components/SiteHeader.astro` | All routes | Dropdown hover/click, Escape and mobile collapse |
| Photographic hero, navy veil, identity column | `src/components/HomeHero.astro` | `/` | Hero geometry, image treatment, responsive behavior |
| Source home section grammar | `src/components/HomeContent.astro` | `/` | Status block, 3-column work cards, feature, evidence, geography, record |
| Page masthead and editorial prose | `src/layouts/Page.astro`, `site.css` | `/article/`, `/document/` | Navy region above paper background; serif headings |
| Form control, table, quotation | `src/styles/site.css` | `/article/` | Input, button, table, quote and focus |
| Original Krigsvold footer layout | `src/components/SiteFooter.astro` | All routes | Identity column, grouped navigation, footer base |
| Site search affordance | `src/components/SiteHeader.astro` | `/search/` | Native form GET and local synthetic query results |

### Coverage not yet claimed

Origin also includes page-specific news and briefing variants, fellows, positions, announcements, photography, FAQs, content figures, and supplementary navigation. These require detailed source comparison. A working specimen is not by itself an externally complete design language. The reused Material Kit/Bootstrap classes are a **source observation**, not evidence that Core should depend forever on Material Kit.

### Color and appearance decision

Both languages use **blue, gold and white**, with different distributions. Krigsvold leads with navy, blue and ice, using gold selectively. Preserve the exact native source roles, including deep navy, translucent navigation, light dropdown over dark navigation, photographic veils, paper editorial content and dark footer. These light/dark *regions* are simultaneous and structural. They are not a mandatory global mode switch. Future dashboard/application appearance presets should recompose the same roles with configurable colors and independent contrast verification.

### Extract into Core

For each required construct: preserve origin rules; identify reusable structure, semantics and behavior; express it in `@krigsvold/core` and reusable framework components; demonstrate a **clean consumer** with no local source CSS or Jekyll clones. Replace historical `@krigsvold/theme`/Material Kit dependencies only once the Core implementation independently reproduces the source. No duplicate framework palettes or secret reference-site CSS.

### Deployment

No changes to existing `starter/`, Cloudflare target, `main`, version tags, npm or releases. Develop preview may follow successful standalone build and source comparison. This baseline has not yet been independently rendered or visually certified.
