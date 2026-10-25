# Grammar 0.3 and Astro support

Canonical source: https://github.com/krigsvoldtheme/npm/tree/f567b51abbe199f89cbb09b5a8cb9e77bed1e117

The [coverage ledger](https://github.com/krigsvoldtheme/npm/blob/f567b51abbe199f89cbb09b5a8cb9e77bed1e117/docs/coverage.md), [validated form](https://github.com/krigsvoldtheme/npm/blob/f567b51abbe199f89cbb09b5a8cb9e77bed1e117/docs/patterns/forms.md), and [query/results](https://github.com/krigsvoldtheme/npm/blob/f567b51abbe199f89cbb09b5a8cb9e77bed1e117/docs/patterns/query-results.md) specify shared composition and interaction obligations. The interactive references use React's existing exports.

Astro 1.2.1 supplies its documented layout, reading, contents and footer components. Native HTML can express the form labels, groups, errors, table and checkbox structure; host scripts must implement validation, query transport, state, focus transitions and cancellation. There is no Astro Form, QueryResults or selection controller in this package. Shared grammar does not create a shared event/prop API.

The source-profile import remains opt-in. Existing package defaults and APIs are unchanged. Grammar 0.3, full dark mode and the new application contracts remain experimental. Compact density, manual assistive technology, localization/RTL, dashboard breadth and sustained consumer use remain open.

## Platform-specific contracts

TableOfContents takes `{href,label,depth?:2|3}`, not React’s `{id,label,depth}`. ArticleLayout uses `contents` and `sidebar` slots; supporting content follows body in source order. SiteFooter’s `variant="grouped"` uses groups with links and host-supplied `identity`/`base` slots. SiteHeader remains the existing generic wrapping-link header and requires host adaptation for a source masthead. Contents remain visible in print by default. Verify the installed source rather than transferring React props or print rules.
