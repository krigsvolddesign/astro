# Changelog

## 2.0.5

- Keep native reference masthead title wrapping consistent with the accepted Jekyll host, preventing the component library’s balanced-heading default from changing mobile line breaks.
- Scope the correction to the shipped reference masthead; preserve component defaults, typography, imagery, and page content.

## 2.0.4

- Restore direct article children in reference Markdown pages so the existing family stylesheet applies its lead-paragraph typography and spacing.
- Preserve optional inline contents, stable heading anchors, and all page content without adding a parallel style override.

## 2.0.3

- Keep native component-demo mastheads below navigation and their metadata legible on the inverse header.

- Make reference-page contents navigation opt-in, with no automatically inserted TOC by default.
- Render explicitly supplied contents inline above the prose in `ArticleLayout` and `DocumentationLayout`; default `TableOfContents` to its inline variant.
- Preserve authored section links, component slots, supporting sidebars, and the separate documentation site-navigation sidebar.
- Use a single native contents navigation when explicitly enabled, avoiding nested wrappers and duplicate borders.

## 2.0.2

- Replace the generic starter shell with native Astro compositions following the accepted Krigsvold Jekyll visual baseline.
- Include the approved responsive signature and section imagery, image attribution, and compact page mastheads.
- Give the reference site a real root homepage, with the example catalog kept at `/examples/`.
- Apply the family’s navigation, typography, colors, footer, and canonical example compositions to the shipped starter and hosted reference.
- Retain the existing component APIs and the 50 canonical examples’ content and interactions.

## 2.0.1

- Require Core 2.2.5 so native input placeholders retain readable contrast in both appearances.
- Give the analytics table scroll region its own accessible name.
- Fix independently installed dashboard family tokens and source styling without build-only environment variables.
- Correct installation and publication guidance for the published Core integration.
- Complete stage-only trusted publication and verified GitHub source releases.
- Add native static reference delivery with accepted-source and artifact verification.

## 2.0.0 — core migration candidate

- Prepare the independent core peer and versioned documentation archive; publication remains disabled pending immutable storage verification.

## 1.2.2 — adoption repair preview

- Honor native button type without duplicate attributes. Add a complete simulated form starter and rendered regression assertions; document exact starter retrieval. Pair with core ^2.2.2.

## Unreleased — source consolidation

- Add versioned source guidance, optional source roles, and contents/footer pattern support. Existing defaults remain compatible; see docs/consolidation.md.


## 1.1.0

- Add structural primitives, responsive site chrome, and article, landing, and documentation layouts.
- Expand the neutral starter with complete page and layout examples.
- Require core 2.1 for optional layout styling; retain existing component APIs.
- Record extraction provenance and test both appearances, narrow and nested layouts, source order, and enlarged text.

## 1.0.0

Initial published Astro wrapper and neutral starter.
