# Contributing Community Sites

Thanks for contributing to Microslop Explorer community pages.

## What You Can Submit

- One static HTML entry page per submission.
- Static assets (images, CSS).
- A valid site manifest (`site.json`).

## What Is Not Allowed

- JavaScript in submitted HTML.
- Script tags.
- Inline event handlers (`onclick`, `onerror`, etc).
- `javascript:` links.
- Redirect/meta refresh patterns.

## Submission Layout

submissions/<site-id>/
- site.json
- sites/<site-id>/index.html
- sites/<site-id>/assets/*

`site-id` must match manifest `id` and `slug`.

## Review Process

1. Open a PR.
2. Automated validation must pass.
3. Maintainer review is required.
4. Approved submissions are later synced into the trusted main repo.
