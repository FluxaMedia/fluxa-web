---
title: "Addons & Catalogs"
description: "Addons are the source of everything in Fluxa. Here's how they work and what you can do with them."
section: "Core workflows"
icon: "puzzle"
order: 1
badges: ["Addons", "Stremio"]
---

## What addons do

An addon is a small online service that Fluxa talks to behind the scenes. Different addons do different things — some bring catalogs of movies and shows, some provide the actual video streams when you press Play, and some add subtitles. Many do more than one of these at once.

You can have as many addons installed as you like. They stack on top of each other, so one addon might show you what to watch and another provides the stream when you pick something.

## Installing an addon

Every addon has a link — a web address that ends in `/manifest.json`. To install one, go to **Settings → Addons**, paste that link into the field, and confirm. The addon shows up in your list right away and its content appears on the home screen immediately.

To remove an addon, find it in the addon list in Settings and tap the remove button. To temporarily disable one without removing it, toggle it off in the same list.

### Addon order matters for streams

When you press Play on a title, Fluxa asks all your stream addons at once and combines everything they return. The order your addons are in (which you can change by dragging in Settings → Addons) determines how the source list is sorted. If you have a preferred addon, put it at the top.

## Catalogs

A catalog is a named list of content that an addon exposes — for example "Trending Movies" or "Top Rated Anime". One addon can offer many catalogs.

Each catalog can show up as a row on your home screen. You choose which ones are visible and in what order from **Settings → Home Catalogs**. Turning off a row doesn't remove the addon — it just hides that particular list from your home screen.

### The featured banner

The large banner at the top of the home screen pulls from catalogs you select in **Settings → Hero Catalogs**. It rotates through featured titles from those catalogs. You can disable it entirely from the same settings screen if you prefer to skip straight to the rows.

## Search

The Search screen queries all your addons at the same time and shows you combined results. You can narrow things down with the type filter (Movies or Series) and genre chips above the results.

Your recent searches are saved so you can quickly repeat them. Tap one to search again, or tap the clear button to remove it.

## Discover

Discover lets you browse a single catalog in full, with filters. Choose the catalog from the list at the top, then use the type and genre options to narrow down. It's useful when you want to properly explore one source rather than scrolling through the home screen.

## The detail page

Tapping any title opens its detail page. Here you'll see the synopsis, release year, genres, rating, cast, and trailers. Cast photos and trailers can come from your installed metadata addons — many addons include this information. If yours don't, you can add a TMDB API key in **Settings → Metadata** as an additional source.

For TV shows, all the seasons and episodes are listed here. You can play any episode directly from this page, add the show to your library, or mark individual episodes as watched.

:::note
**Cast photos or trailers not showing?** Check if your installed addons provide metadata. If not, adding a free TMDB API key in [Settings → Metadata](/docs/settings) will pull in additional cast and trailer data from The Movie Database.
:::
