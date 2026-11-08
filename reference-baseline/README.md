# Krigsvold canonical Astro source baseline (content neutral)

This is an isolated **source specimen**, not the public `astro.krigsvolddesign.dev` reference site. It preserves the visual grammar of the real `krigsvold.org` Astro application while replacing all institutional content and identifying imagery with fictional or abstract fixtures. The original Antarctic landscape hero is retained as source evidence for photographic overlay geometry.

Origin: `basuhoward/krigsvold.org` at pinned commit `007a4d379e9bd37dee55f86827df6e067ff27335`.

Source files `src/styles/site.css`, `public/assets/css/material-kit.min.css` and the original Bootstrap/Material Kit scripts are copied verbatim. Header/footer and home hero preserve source markup, CSS classes, and control behavior with content replaced. Shared layout imports the historical `@krigsvold/astro@1.0.0` and `@krigsvold/theme@2.0.0` used by the working source site; these are measurement dependencies, not the intended new Core API. The retained Material Kit stylesheet includes its upstream copyright and license notice.

## Run

From this directory: `npm install --ignore-scripts`; then `npm run build` or `npm run dev`. Routes: `/` (home composition), `/article/` (editorial reading), `/document/` (documentation), `/search/` (functional local synthetic route search). No source-site content or live data is used. The baseline is `noindex` and is not yet wired into Cloudflare deployment.

## Architecture and acceptance

- Blue, gold, and white are all native to the language. Krigsvold's default composition gives blue/navy/ice prominent roles, with gold as restrained emphasis.
- Dark navigation, photography, light editorial paper, and dark footer are simultaneous structural regions in the original source, not evidence that the site requires a global light/dark toggle.
- Do not modify the source repos or use the copied CSS as a permanent dependency for Astro/React/Jekyll reference sites. Extract reusable grammar into Core, then rebuild each framework reference as an ordinary package consumer.
- Add optional, configurable appearance presets for dashboard/application contexts only after the default source composition is understood.
- Work stays on feature branches and `develop`; no `main`, tags, npm publication or release workflow.

Pinned source Git blobs: {
  "css": "0aa51776db5bb626341b6fedeb16735a9a3b8fbb",
  "header": "cffe4a6e3fdf22470d5398d9cbda8fb92885ca83",
  "footer": "3e2d7fd5b27443e6e286f25281f0ba37f9ca80b5",
  "hero": "b15c2905ea05b5991ee0f44135f7f298a8a9b9f7",
  "content": "368bac13bbbc181f58c3ff90062ce2434a6fa891",
  "material": "656f156348cedef6d93c5e2d4991300473c9dc12",
  "bootstrap": "0644715fcb26cc753f0478e841d349d17d467c45",
  "popper": "b0b21c22626c70729cf661c50a282705245dfebe",
  "materialJs": "d5b4d856c7e7d87e4022edaa20bf7a6d17c441e5"
}
