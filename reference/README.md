# Krigsvold Astro reference

The complete Krigsvold reference application: 50 canonical examples, three dashboards, a scientific workspace, and layout and form specimens. It consumes the published `@krigsvold/astro` and `@krigsvold/core` packages at exact versions recorded in `package.json` and `package-lock.json`.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

## Hosting

Use the Astro package repository as the Cloudflare project source. Root directory: `reference`; build command: `npm run build`; static output: `dist`. `develop` is the development branch and `main` is the release branch. Branch selection provides deployment approval; no separate attestation, archive reconstruction, package assembly, or deployment script is required.

For Cloudflare Workers static assets, the included `wrangler.json` uses `dist`. The standard deploy command is `npx wrangler deploy`; for a Workers preview use `npx wrangler preview`. The configuration includes the required empty `previews` block; static assets and compatibility settings stay at the top level. Cloudflare Pages uses `dist` directly without a deploy command.

## Package boundary

Update dependency pins and the lockfile together with npm, then build the reference. Unreleased library code is tested in the library repository, not silently substituted for registry packages here. This app is private and is never published to npm.

The clonable starting point is [krigsvolddesign/astro-starter](https://github.com/krigsvolddesign/astro-starter). The component package lives alongside this app in the same [krigsvolddesign/astro](https://github.com/krigsvolddesign/astro) repository. `reference/` is excluded from the npm archive. The primary design website remains `krigsvolddesign/website`.

## Source and examples

Application content was extracted from `krigsvolddesign/astro` at `f71ddf5131d9122d5d5dbb0f60baaf742507d013`. Existing asset credits and provenance files are retained. Reference records are fictional; interactive examples run locally in the browser and do not submit to a service.
