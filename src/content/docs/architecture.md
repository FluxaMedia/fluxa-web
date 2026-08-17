---
title: "Architecture"
description: "How Fluxa Desktop, Android, Web/webOS, fluxa-core, addons, playback, and sync fit together."
section: "How it works"
icon: "git-branch"
order: 1
badges: ["Core", "Desktop", "Android"]
---

## Repos and responsibilities

Fluxa is split into app shells and shared logic. **fluxa-desktop** owns the desktop interface, windows, installers, and OS integration. **fluxa-android** owns the Android interface and Android platform integration. **fluxa-web** owns the browser interface and also packages as a native app for LG webOS TVs. **fluxa-core** is the shared Rust layer for addon resolution, library state, search behavior, source handling, and playback policy.

This split keeps platform code close to each app while keeping the media logic consistent across desktop, Android, and web/webOS.

## What runs locally vs remotely

| Part | Where it runs | What it does |
| --- | --- | --- |
| Fluxa app | Your device | UI, profiles, settings, playback controls, library views. |
| fluxa-core | Your device | Addon calls, source selection, local state, playback decisions. |
| Addons | Remote servers | Catalogs, metadata, streams, subtitles. |
| Nuvio | Remote sync service | Optional cross-device account sync. |
| Tracking services | Third-party services | Optional watch history and list sync. |

## Data flow

1. A catalog addon provides rows or search results.
2. Metadata fills detail pages with posters, summaries, cast, episodes, and trailers.
3. When you press Play, stream addons return direct links, torrents, or addon-specific source labels.
4. Fluxa applies your source selection settings, starts playback, and saves progress locally.
5. Optional services such as Nuvio, Trakt, MyAnimeList, or Simkl receive sync updates.

## Failure boundaries

:::info
**Most empty or missing content issues are addon-side.** If a catalog, stream, image, or subtitle is missing, Fluxa can only show what the installed addons return.
:::

Fluxa can recover from many addon failures by combining results from multiple addons, but it cannot force an unavailable addon server to respond or create content that an addon does not provide.
