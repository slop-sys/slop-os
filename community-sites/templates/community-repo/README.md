# Community Sites Repository (Template)

This repository accepts untrusted community submissions for Microslop Explorer.

## Structure

- submissions/<site-id>/site.json
- submissions/<site-id>/sites/<site-id>/index.html
- submissions/<site-id>/sites/<site-id>/assets/*

## Rules

1. No JavaScript in submitted HTML.
2. No inline handlers (onclick, onerror, etc).
3. No script tags.
4. No javascript: links.
5. Keep submissions small and static.

## Validation

Use the workflow in .github/workflows/validate-submission.yml.

## Publishing model

This repo does not publish directly to production. The trusted main repo imports approved submissions after review.
