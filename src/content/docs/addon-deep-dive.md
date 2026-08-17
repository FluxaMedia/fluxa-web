---
title: "Addon Deep Dive"
description: "Manifest structure, endpoint types, compatibility, and common addon failure modes."
section: "How it works"
icon: "blocks"
order: 2
badges: ["Addons", "Stremio"]
---

## Manifest basics

Every addon starts with a `/manifest.json` URL. The manifest tells Fluxa the addon name, supported resource types, content types, catalogs, ID prefixes, and whether configuration is required.

```json
{
  "id": "example.addon",
  "name": "Example Addon",
  "resources": ["catalog", "meta", "stream", "subtitles"],
  "types": ["movie", "series"]
}
```

## Endpoint types

| Endpoint | Purpose |
| --- | --- |
| catalog | Rows of titles, genre lists, discover pages, home sections. |
| meta | Title details, seasons, episodes, posters, cast, trailers. |
| stream | Playable source results after pressing Play. |
| subtitles | Subtitle tracks for the selected video. |

## Stremio compatibility

Fluxa understands the Stremio addon protocol, so most Stremio-compatible manifests work directly. If an addon requires configuration, open its config page first, set the options, then install the generated manifest URL in Fluxa.

## Common addon failure modes

- **Manifest unreachable:** the URL is wrong or the addon server is down.
- **No catalog rows:** the addon does not provide catalogs, or the selected rows are disabled.
- **No streams:** the addon has no source for that title, or required account/API settings are missing.
- **Wrong metadata:** IDs differ between catalog and metadata providers.
- **Slow startup:** one or more addons are timing out during startup or search.
