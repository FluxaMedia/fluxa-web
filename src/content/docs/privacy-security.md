---
title: "Privacy & Security"
description: "What Fluxa stores locally, what third-party services see, and how addon trust works."
section: "How it works"
icon: "shield-check"
order: 4
badges: ["Privacy", "Security"]
---

## Local data

Fluxa stores app settings, profiles, installed addon URLs, library entries, collections, and playback progress locally on your device. See [Data Locations](/docs/data-locations) for platform paths.

## Third-party services

Addons see the requests needed to provide catalogs, metadata, streams, or subtitles. Tracking services see the titles you sync to them. Nuvio sees the account data required for Fluxa cross-device sync. Debrid or Usenet providers see API requests made by the addon that you configured with that provider.

## Addon trust model

:::warning
**Only install addons you trust.** Addons are remote services. Fluxa can call them, but it does not control what they log, how long they stay online, or what sources they return.
:::

Prefer addon links from maintainers or communities you recognize. If an addon asks for API keys, understand which service receives those keys.

## Tokens and API keys

Service tokens and API keys should be treated like passwords. Do not paste them into random pages. If a key leaks, revoke it from the provider dashboard and generate a new one.
