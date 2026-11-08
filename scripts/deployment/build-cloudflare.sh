#!/usr/bin/env bash
set -euo pipefail
if [[ -n "${WORKERS_CI_BRANCH:-}" && -n "${ASTRO_DEPLOY_BRANCH:-}" && "$WORKERS_CI_BRANCH" != "$ASTRO_DEPLOY_BRANCH" ]]; then
  echo 'Conflicting native and local GitFlow branch signals' >&2; exit 1
fi
branch="${WORKERS_CI_BRANCH:-${ASTRO_DEPLOY_BRANCH:-}}"
sha=$(git rev-parse HEAD)
if [[ -n "${WORKERS_CI_COMMIT_SHA:-}" && "$WORKERS_CI_COMMIT_SHA" != "$sha" ]]; then
  echo 'Cloudflare source commit differs from checkout' >&2; exit 1
fi
case "$branch" in
  main|develop)
    python3 scripts/deployment/artifact.py guard --branch "$branch" --sha "$sha"
    timeout 600s npm exec --yes --package=npm@11.15.0 -- node scripts/deployment/build-reference.mjs
    python3 scripts/deployment/artifact.py finalize --branch "$branch" --sha "$sha" --directory .cloudflare-site
    npm ci --prefix infra/deployment --ignore-scripts --no-audit --no-fund
    python3 scripts/deployment/artifact.py config --branch "$branch" --sha "$sha" --directory .cloudflare-site --output ".cloudflare-wrangler.$branch.json"
    ;;
  feature/*|fix/*|hotfix/*|release/*)
    if [[ "$branch" = "feature/krigsvold-canonical-neutral-baseline" ]]; then
      CANONICAL_SOURCE_REPO="basuhoward/krigsvold.org" CANONICAL_SOURCE_SHA="007a4d379e9bd37dee55f86827df6e067ff27335" \
        timeout 600s npm exec --yes --package=npm@11.15.0 -- node scripts/deployment/build-neutral-baseline.mjs
    else
      timeout 600s npm exec --yes --package=npm@11.15.0 -- node scripts/deployment/build-reference.mjs
    fi
    printf 'User-agent: *\nDisallow: /\n' > .cloudflare-site/robots.txt
    printf '/*\n  X-Robots-Tag: noindex, nofollow, noarchive\n  X-Content-Type-Options: nosniff\n' > .cloudflare-site/_headers
    npm ci --prefix infra/deployment --ignore-scripts --no-audit --no-fund
    node scripts/deployment/feature-preview-config.mjs config "$branch"
    ;;
  *) echo 'Unknown Cloudflare build branch' >&2; exit 1 ;;
esac
