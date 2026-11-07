# Krigsvold release and migration playbook

| Repository | Responsibility |
| --- | --- |
| krigsvolddesign/core | Canonical source.json, framework-independent design tokens, fonts, optional styles and host capabilities |
| krigsvolddesign/astro | Astro components and neutral starter, consuming the core peer dependency |
| krigsvolddesign/core | Theme demonstration, downloads, and application port generators |
| basuhoward/krigsvold.org | Originating site, content, identity, navigation, metadata, consent and analytics |

## Source

The design comes from krigsvold.org at commit e92e989b6e850b3a9cd8fbb565edb7eba6d3a6f7. Roboto is the body/UI family; Roboto Slab supplies distinct serif and display roles; Roboto Mono is the agreed public monospace companion. Read the core repository's docs/provenance.md for source selectors and normalization decisions. The demonstration site is a consumer, never the design source.

## Package verification and publication

Build and test the core, then pack it. Pack the Astro package, install both actual archives into the neutral starter, and build with each supported Astro version. Check both modes, local font emission, no remote font requests, shell slots and native button behavior. Review npm pack output and retain font licenses.

Publish @krigsvold/theme 2.0.0 first, then @krigsvold/astro 1.0.0. GitHub organization krigsvoldtheme and npm scope krigsvold are separate. CI does not publish automatically.

## First consumer: krigsvoldtheme.dev

Prepare the migration with versioned release snapshots if necessary for prepublication testing. Do not deploy the migration until both registry versions exist. Replace archive dependencies with exact registry versions, regenerate the lockfile, remove snapshots, and prove clean npm ci installs. Import the package Layout and source design definitions; keep the site's landscape artwork, content, consent, analytics and footer in the site. Port generators must read the installed core and never synthesize another npm package.

Run unit/native tests, production build, browser consent and clipboard checks, download integrity, both appearance modes, keyboard focus, reduced motion and narrow viewport checks. Confirm production deployment succeeds with the published packages.

## Second consumer: krigsvold.org

Only after the first consumer passes that gate, begin the Jekyll-to-Astro migration. Inventory Jekyll-generated routes and content before changing it. Preserve collections, posts, fellows, positions, redirects, canonical metadata, structured data, search, feeds, navigation, consent and analytics. Keep arms and other personal identity out of the shared packages. Compare route inventories and normalized content before merging the migration.

## Versioning

Each npm package uses independent semantic versions. Patch fixes preserve the contract; minor releases add compatible features; breaking token/component behavior requires a major release. Consumers pin deliberate releases and lockfile integrity, rather than a moving Git branch or CDN latest URL.

## Current publication authority

The Core integration shipped in Astro 2.0.0. Local tarballs remain useful for candidate verification; they are not required for ordinary installation. Keep original extraction decisions above as historical rationale. Use the [current release procedure](releasing.md) and canonical GitFlow acceptance; do not reconstruct historical reviews or CI in deployment.
