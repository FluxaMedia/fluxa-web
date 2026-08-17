---
title: "Sync & Accounts"
description: "Connect optional third-party services to track what you watch and keep your library in sync."
section: "Core workflows"
icon: "refresh-cw"
order: 2
badges: ["Nuvio", "Trakt", "MAL", "Simkl"]
---

## Trakt

Trakt is a service that tracks everything you watch. Connecting it to Fluxa means every movie you finish and every episode you watch gets automatically logged to your Trakt profile. Your existing Trakt history is also pulled into Fluxa when you first connect.

To connect, go to **Settings → Account → Trakt** and tap Connect. Your browser will open to Trakt's sign-in page — log in and approve Fluxa's access. After that, you'll be sent back to the app and sync starts automatically.

To disconnect, tap Disconnect in the same place. Your Trakt data stays on Trakt — only the connection to Fluxa is removed.

## MyAnimeList

If you watch anime, you can connect your MyAnimeList account to track it automatically. When you finish an anime episode in Fluxa, it gets marked on your MAL profile. Your MAL lists — watching, planned, and completed — also show up in your Fluxa Library.

Connect it the same way as Trakt: **Settings → Account → MyAnimeList → Connect**. Your browser opens to the MAL login page, you approve, and you're brought back to the app.

## Simkl

Simkl tracks movies, TV, and anime all in one place. Like Trakt, connecting it gives you two-way sync — what you watch in Fluxa appears on Simkl, and your Simkl lists show up in your Fluxa Library.

Connect it from **Settings → Account → Simkl → Connect**.

:::note
You can connect all three at once — Trakt, MAL, and Simkl can all be active simultaneously. Fluxa pushes to all of them whenever you watch something.
:::

## How the sign-in flow works

When you connect a tracking service, Fluxa opens your browser to that service's login page. After you approve, the browser sends you back to Fluxa automatically. Nothing goes through an outside server — the connection happens directly between your browser, the service, and Fluxa on your machine.

## Nuvio — cross-device sync

Nuvio is an optional third-party sync service, separate from Fluxa. Unlike Trakt/MAL/Simkl, which only track watch history, Nuvio syncs your whole Fluxa state — profiles, installed addons and their order, library entries, continue watching, collections, and relevant settings — between desktop and Android.

To sign in, go to **Settings → Account** and connect your Nuvio account, or create one from the same screen. It's entirely optional — on a single device, or if you don't need your data to follow you, skip it and everything stays stored locally.

A few things don't sync: downloaded app binaries or installer state, local OS permissions and file associations, device-only playback capabilities like GPU behavior, and other services' passwords (Trakt/MAL/Simkl each keep their own connection per device).

If two devices change the same item while offline, the most recently saved version generally wins once sync resumes. Watch progress is timestamped and resolves safely; avoid editing the same collection from two devices at once.

## Profiles and accounts

Each profile has its own completely separate set of accounts. If you have two profiles, each one can be connected to a different Trakt account, or none at all. Switching profiles switches everything.

A profile can also be set to share the addon list with your main profile instead of having its own. Useful if you want a second profile for a family member but don't want to set up all the addons again.
