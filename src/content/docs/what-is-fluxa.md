---
title: "What is Fluxa"
description: "Fluxa is a free, open-source media player for desktop and Android that connects to addons for movies, shows, and anime."
section: "Start"
icon: "info"
order: 2
badges: ["Desktop", "Android", "Web"]
---

# Fluxa

A free, open-source media player for desktop, Android, and the web. Connect addons, track what you watch, and build your library — no account required.

[Get started](/docs/getting-started)
[Download Desktop](https://github.com/FluxaMedia/fluxa-desktop/releases/latest)
[Download Android](https://github.com/KhooLy/Fluxa/releases/latest)
[Download webOS](https://github.com/FluxaMedia/fluxa-web/releases/latest)

## What is Fluxa?

Fluxa is a free, open-source media player for desktop (Windows, macOS, Linux), Android, and the web (including a native app for LG webOS TVs). It doesn't come with content built in — you install addons that bring in movies, shows, and anime from around the web. Think of it like a browser for streaming: Fluxa is the browser, and addons are the websites.

Once an addon is set up, browse catalogs, search for titles, and hit play — Fluxa fetches the stream, plays it, and tracks where you left off. All platforms share the same addon format and library, and can optionally sync to each other.

## What can it do?

**Browse and discover.** Your home screen fills up with rows of content from every addon you've installed — trending, top rated, by genre, and more. You can also search across all your addons at once.

**Track what you watch.** Fluxa saves where you left off in every movie and episode. It can also sync your watch history to Trakt, MyAnimeList, or Simkl so you have one place that knows everything you've ever seen.

**Build your library.** Save titles to your watchlist, organise them into custom collections, and keep continue watching exactly where you need it.

**Play anything your addons provide.** Direct streams, torrent links, subtitles from subtitle addons — the built-in player handles all of it.

**Multiple profiles.** Up to five separate profiles on one install, each with its own library, addons, and accounts. Useful for households or anyone who wants to keep anime and regular TV separate.

## Supported platforms

| Platform | Download |
| --- | --- |
| Windows 10 or later | `.exe installer` |
| macOS 11 or later | `.dmg (Intel & Apple Silicon)` |
| Ubuntu / Debian Linux | `.deb package` |
| Fedora / RHEL Linux | `.rpm package` |
| Any Linux (portable) | `.AppImage` |
| Android | `APK via GitHub releases` |
| Web browser | `No install — open and go` |
| LG webOS TVs | `Sideloaded via Developer Mode` |

## How it's built

Fluxa is free and open-source, split across four repositories on GitHub — one shared Rust core plus a desktop, Android, and web/webOS app built on top of it. See [Architecture](/docs/architecture) for how they fit together.

## A note on content

Fluxa doesn't host or provide any content itself. Everything you watch comes from addons that you choose to install. Whether those addons provide legal content depends on the addon — Fluxa has no control over or affiliation with what addon developers make available. You're responsible for the addons you use.
