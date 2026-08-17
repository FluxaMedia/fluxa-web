---
title: "Settings"
description: "A reference for every option in Fluxa, explained in plain terms."
section: "Reference"
icon: "sliders"
order: 1
badges: ["Desktop", "Android"]
---

## General

| Setting | What it does |
| --- | --- |
| Language | Changes the language of the app's interface and catalog labels. |
| Start Page | Which screen opens first after you choose a profile — Home, Search, Library, or Discover. |
| Show Hero Section | Turns the large featured banner at the top of the Home screen on or off. |
| Notifications | Allows Fluxa to send notifications on your device. |
| New episode alerts | Sends a notification when a new episode drops for a show in your watchlist. |
| Check for updates | Shows your current version and lets you update the app from inside Fluxa. |

## Appearance

| Setting | What it does |
| --- | --- |
| Accent Color | The highlight colour used for buttons and active states throughout the app. |
| Home Catalogs | Choose which catalog rows appear on the Home screen and set their order. |
| Top 10 Catalogs | Select which rows show large ranking numbers (1–10) on their posters. |
| Hero Catalogs | Choose which catalogs supply content to the large featured banner. |

## Playback

| Setting | What it does |
| --- | --- |
| Stream Source Selection | Manual shows you a list of sources to pick from. Auto picks immediately. Regex lets you set a pattern to match automatically. |
| Regex Pattern | The pattern used in Regex mode. For example: `1080p` to always pick 1080p sources first. |
| Default Player | Use Fluxa's built-in player or open streams in an external app. |
| Resume Playback | When you reopen something you've already started, jump straight to where you left off. |
| Auto-play Next Episode | Automatically starts the next episode when the current one finishes. |
| Countdown Duration | How long the auto-play countdown shows before the next episode starts. |
| Playback Speed | The default speed for all videos. 1.0 is normal. |
| Skip Amount | How far the forward and back buttons jump. Default is 10 seconds. |
| Hold to Speed Up | When held, the video plays faster. Releases back to normal speed when you let go. |
| Hold Speed | How fast the video plays while holding. |
| Skip Intro | Shows a Skip Intro button when an intro segment is detected. |
| Skip Recap | Shows a Skip Recap button for anime content. |
| MPV Options | Advanced: raw options passed to the video player. One per line. Ignore this unless you know what you're doing. |
| Scripts Directory | Advanced: a folder of player scripts to load at startup. |

## Buffer & Cache

| Setting | What it does |
| --- | --- |
| Buffer Cache | How much memory Fluxa can use to pre-load video data. |
| Forward Buffer | How many seconds ahead the player tries to keep ready. |
| Back Buffer | How many seconds behind your current position you can seek back to instantly. |

## Subtitles

| Setting | What it does |
| --- | --- |
| Preferred Language | Automatically enables subtitle tracks in this language when available. |
| Font Size | How big the subtitle text appears on screen. |
| Outline Colour | The colour of the shadow behind the text. |
| Outline Opacity | How visible the shadow is. |
| Text Colour | The colour of the subtitle text itself. |

## Metadata

| Setting | What it does |
| --- | --- |
| TMDB API Key | Optional. Supplements your addons with additional cast photos, trailers, and recommendations from The Movie Database when your addons don't already provide them. Free to get at themoviedb.org. |
| Cast Images | Show actor photos on detail pages. |
| Trailers | Show a trailer on the detail page. |
| Recommendations | Show "You may also like" on the detail page. |
| Similar Titles | Show a "Similar" row on the detail page. |
| Episode Images | Show thumbnail images for individual episodes. |
| Logos & Backdrops | Use high-quality title logos and backdrop images where available. |

## Decoder

These are advanced options for video quality and compatibility. Most people won't need to touch them.

| Setting | What it does |
| --- | --- |
| FFmpeg Audio Decoder | Use an alternative audio decoder. Try this if you're getting no audio or distorted audio with certain files. |
| Dolby Vision Fallback | How to handle Dolby Vision video on hardware that doesn't fully support it. Auto is usually fine. |

## Account

This is where you connect and manage Nuvio, Trakt, MyAnimeList, and Simkl. See the [Sync & Accounts](/docs/sync-accounts) guide for details on each.

## Addons

Install new addons by pasting a manifest URL, remove ones you don't use, drag to reorder them, or toggle individual addons on and off. See [Addons & Catalogs](/docs/addons-catalogs) for more.
