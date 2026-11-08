# Krigsvold — source-derived Astro reference

This is a **standalone Astro application**, not a special deployment of the component library. It is a content-neutral adaptation of [krigsvold.org](https://krigsvold.org/), with fictional research and editorial material. Its original source CSS, Material Kit foundation and site construction remain as a *comparison baseline* while the reusable Krigsvold grammar is extracted.

## Clone, edit, run

```sh
git clone --branch feature/krigsvold-canonical-neutral-baseline https://github.com/krigsvolddesign/astro.git
cd astro/reference-baseline
npm ci
npm run dev
```

Edit `src/pages/`, `src/components/`, and `public/`. Build and serve the same static site through standard npm scripts:

```sh
npm run build
npm run preview
```

Output: `dist/`. No bespoke reference-site build scripts, provenance generators, or release workflows are required. `wrangler.json` provides standard optional Cloudflare Workers static-asset configuration; `npx wrangler preview` deploys a branch preview separately from production.

**Temporary repository location:** A dedicated public site repository is not yet created. The app lives in `reference-baseline/` in the public Astro component repository while we preserve the library's main branch. This is a working interim location, **not** the final public clone URL or an npm-published scaffolder.

## Design authority

- Canonical source: `basuhoward/krigsvold.org` pinned to `007a4d379e9bd37dee55f86827df6e067ff27335`.
- Preserved as source material: `src/styles/site.css`, `public/assets/css/material-kit.min.css`, original Bootstrap/Material Kit scripts and the canonical navigation/hero/footer compositions.
- Representative routes: `/`, `/article/`, `/document/`, and `/search/`.
- Blue, gold and white occur in both languages. Krigsvold gives blue/navy/ice prominent functional roles, with restrained gold; Martlet has a different color hierarchy.
- Simultaneous navy navigation, photographic mastheads, pale editorial surfaces and dark footer do not imply a global appearance toggle.
- Future independently configurable color roles and optional dashboard appearance presets belong in Core. This original CSS is **not** a long-term application dependency. The final site must use published `@krigsvold/core` and `@krigsvold/astro` packages without private overrides.
- Source imagery and third-party Material Kit attribution/license notices require review before publishing a general public template. See `EXTRACTION-MAP.md`.

Only feature branches and `develop` are in scope. No `main`, tags, npm publication, or production deployment.
