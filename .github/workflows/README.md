# Workflows

This repository now includes one security-focused workflow:

- [sync-community-catalog.yml](sync-community-catalog.yml)

Purpose:

- Pulls approved submissions from `slop-sys/community-pages`
- Validates all imported submissions using local guardrails
- Generates `data/community-sites.catalog.json`
- Commits catalog changes when they differ

Schedule:

- Hourly (`15 * * * *`) and manual dispatch

Notes:

- This workflow is intentionally narrow in scope and does not run arbitrary user code.
