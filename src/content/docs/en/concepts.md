---
title: "Concepts"
description: "Plain-English explanations of the terms and ideas that come up when using Fluxa."
section: start
icon: "library"
order: 4
badges: ["Addons", "Stremio", "Nuvio"]
---

## Addons

An addon is a small online service that Fluxa connects to in the background. You install one by giving Fluxa its address (a URL ending in `/manifest.json`), and Fluxa starts talking to it automatically from that point on. Most addons run on someone else's server. You just link to them.

Addons come in a few distinct types, though many addons combine more than one type in a single package.

### Catalog addon

Provides lists of titles (trending, top-rated, new releases, by genre) that fill the rows on your home screen and search results. It tells Fluxa *what exists*, not the video itself. Install as many as you want; pick which ones show in Settings → Home Catalogs.

### Stream addon

Provides the actual video link when you press Play. Fluxa asks all your stream addons at once and shows the combined results (or picks automatically). Without at least one, you can browse but can't play anything. This is the type to prioritize.

### Metadata addon

Provides cast, synopsis, episodes, trailers, and artwork for the detail page. Most addons bundle this with catalog/stream data, but some specialize in metadata only to enrich what other addons already give you.

### Subtitle addon

Provides subtitle files for whatever you're playing, shown in the player's subtitle menu alongside any tracks embedded in the video itself. Worth adding if you watch content that's short on embedded subtitles for your language.

### Combined addons

Most popular addons do more than one of these at once: catalog, streams, and metadata in a single install. Fluxa uses it for everything it offers.

:::note
**Where to find addons.** Fluxa uses the same addon format as Stremio. Search for ["Stremio addon list"](https://www.google.com/search?q=stremio+addon+list) to find community-maintained directories. Each addon's page will show its manifest URL.
:::

## Debrid services

A debrid service (also called a "premium link generator" or just "debrid") is a paid third-party service that dramatically improves streaming performance. It's one of the most impactful things you can add to a setup like Fluxa if you watch frequently.

### How it works

Many stream addons return torrent links. Without debrid, playing one means connecting to a swarm of peers: slow, unreliable, and sometimes throttled by your ISP. A debrid service downloads the torrent to its own servers first and hands you a plain HTTP stream URL instead, so you're pulling from a data center, not random peers:

- **Speed**: Even 4K files start in seconds.
- **Reliability**: Popular content is already cached and ready instantly.
- **No ISP issues**: Looks like a normal HTTPS download.
- **Better quality**: Full remux/4K sources that wouldn't torrent-stream well.

The tradeoff is cost. Typically €3–5/month. Not required to use Fluxa, but worth it if stream quality matters to you.

### Common debrid providers

| Service | Notes |
| --- | --- |
| [Real-Debrid](https://real-debrid.com) | The most widely supported. Almost every stream addon has Real-Debrid integration. ~3€/month. |
| [AllDebrid](https://alldebrid.com) | Similar feature set to Real-Debrid, also very popular. ~3€/month. |
| [Premiumize](https://www.premiumize.me) | Includes cloud storage and a VPN in addition to debrid. ~10€/month. |
| [Debrid-Link](https://debrid-link.com) | Alternative with a similar feature set to Real-Debrid. |
| [TorBox](https://torbox.app) | Newer provider with a generous free tier and strong torrent support. Popular choice for getting started. |

### How to use Debrid with Fluxa

Debrid integration is handled by your stream addons, not by Fluxa itself. Most (e.g. Torrentio) have a configuration page, usually the manifest URL opened in a browser with `/manifest.json` removed, where you paste the API key from your debrid account. After that, Play automatically checks for a cached version and returns a fast link instead of a raw torrent.

:::note
Fluxa itself doesn't know about your debrid account. It just receives whatever link the addon provides. The addon is what talks to debrid on your behalf.
:::

## Usenet

Usenet is a decades-old, decentralized network of newsgroups. Outside its original purpose, it's become a fast and reliable way to get media. And like debrid, some stream addons can pull from it directly so you get a streamable link without downloading anything yourself.

### How it works

Usenet files are uploaded as binary data spread across many small articles, described by a small pointer file called an NZB (like a torrent file, but pointing at a provider's servers instead of peers). You need a paid provider that stores the articles, plus usually an indexer that finds the right NZB.

- **Speed**: High-bandwidth servers often max out a home connection.
- **Privacy**: No peer swarm, just an encrypted connection to your provider.
- **Long retention**: Most providers keep content for over a decade.

The tradeoff, like debrid, is cost. Typically €5–10/month for the provider, often plus a separate indexer subscription.

### Common Usenet providers

| Service | Notes |
| --- | --- |
| [Easynews](https://www.easynews.com) | Bundles provider, indexer, and direct web streaming in one. No separate downloader needed. Closest experience to debrid. ~10€/month. |
| [Newshosting](https://www.newshosting.com) | Long-standing provider with high retention and a bundled VPN option. |
| [Eweka](https://www.eweka.nl) | European provider, popular for its EU-based servers and consistent speeds. |
| [UsenetServer](https://www.usenetserver.com) | Established provider with a generous trial and good completion rates. |

### How to use Usenet with Fluxa

As with debrid, Usenet is handled entirely by your stream addons. Easynews streams straight from its own servers, no separate client needed; others expect an NZB indexer and downloader (like SABnzbd) behind the scenes. Where supported, you'll find Usenet/NZB fields on the addon's configuration page alongside any debrid settings.

:::note
Usenet and debrid solve the same problem (a fast, direct stream instead of waiting on a torrent swarm) through different mechanisms. Plenty of people use only one or the other; some addons support both side by side.
:::

## Manifest URL

Every addon has a manifest URL, a web address ending in `/manifest.json`, that you paste into Fluxa to install it (Settings → Addons). Think of it like a phone number: it's what Fluxa dials to reach the addon, which actually runs on a remote server. Reading the manifest tells Fluxa the addon's name and what it provides (catalogs, streams, metadata, subtitles).

If an addon has configuration options (a debrid key, content filters), its config page is usually the manifest URL opened in a browser with `/manifest.json` removed.

## Stremio compatibility

Fluxa uses the same addon protocol as Stremio, so every Stremio-compatible addon works in Fluxa unchanged. Install it the same way, by pasting the manifest URL. Rather than building a separate addon ecosystem, Fluxa taps into the one Stremio's community has already built and maintained for years.

## Source types

Each stream source you see after pressing Play is one of two types:

- **Direct (HTTP/HTTPS)**: A plain video file, playback starts immediately. Comes from hosting sites, CDNs, or debrid services converting a torrent to a direct link (look for "via RD" or a debrid name in the label).
- **Torrent (magnet link)**: Fluxa's built-in download engine connects to a peer swarm first, so it's slower to start and quality depends on how many people are sharing.

For debrid sources specifically, a torrent is "cached" if the debrid service already has it downloaded, instantly playable, or "uncached" if it needs to fetch it first, which can take minutes. Most popular content is cached within hours of release; niche or brand-new content may not be yet. Addons that support debrid usually label sources as cached or uncached.

## mpv

mpv is a free, open-source video player that Fluxa uses as its playback engine on desktop. It's what actually decodes and renders the video. Fluxa wraps it to provide the app interface. Because mpv supports virtually every video codec and format (MKV, MP4, AVI, H.264, H.265/HEVC, AV1, Dolby Vision, HDR, etc.), Fluxa inherits that compatibility without needing separate codec packs or plugins.

The required libraries are bundled with Fluxa on every platform, including Linux. There's nothing extra to install.

Advanced users can pass raw mpv options through **Settings → Playback → MPV Options** (one per line, e.g. `video-sync=display-resample`). Only do this if you know what you're doing. Wrong options can break playback.

## What is a "4K remux"?

You'll see terms like "remux", "BluRay", "WEB-DL", and "encode" in stream source names. They describe where the video came from and how much it's been compressed:

- **Remux**: The original video track from a Blu-ray or streaming source, with no additional compression. Largest file size, best quality. A 4K remux can be 60–100GB.
- **BluRay encode / BDRip**: Re-encoded from a Blu-ray source. Smaller than a remux, slightly lower quality, still very good.
- **WEB-DL**: Downloaded directly from a streaming service (Netflix, Amazon, etc.). Quality depends on the source bitrate.
- **WEBRip**: Screen-captured from a streaming service. Generally lower quality than WEB-DL.
- **CAM / HDCAM**: Recorded in a cinema. Poor quality. Avoid these.

For daily watching, a 1080p WEB-DL or BluRay encode is indistinguishable from a remux on most screens. 4K remuxes only make a visible difference on large 4K TVs with HDR.
