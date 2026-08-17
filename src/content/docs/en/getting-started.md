---
title: "Getting Started"
description: "From download to your first stream, step by step."
section: start
icon: "rocket"
order: 3
badges: ["Desktop", "Android", "Web", "Windows", "macOS", "Linux", "webOS"]
---

:::tip
**Fast path:** install Fluxa, create one profile, add one Stremio-compatible manifest URL, then play a title from Home or Search.
:::

## Download and install

Grab the file for your platform from the release page and install it.

| Platform | Download |
| --- | --- |
| Windows | `Fluxa_x.x.x_x64-setup.exe` |
| macOS | `Fluxa_x.x.x_universal.dmg` |
| Ubuntu / Debian | `fluxa_x.x.x_amd64.deb` |
| Fedora / RHEL | `fluxa-x.x.x-1.x86_64.rpm` |
| Linux portable | `fluxa_x.x.x_amd64.AppImage` |
| Android | `fluxa-x.x.x.apk` |
| LG webOS TV | `fluxa-x.x.x.ipk` |

**Windows, macOS, Linux:** from the [fluxa-desktop releases page](https://github.com/FluxaMedia/fluxa-desktop/releases/latest). Run the Windows installer and follow the prompts (no admin rights needed); open the macOS .dmg and drag Fluxa into Applications (approve it under System Settings → Privacy & Security → *Open Anyway* if blocked); install the Linux .deb/.rpm with your package manager, or run the .AppImage directly — mpv is bundled, nothing else to install.

**Android:** download the APK from the [fluxa-android releases page](https://github.com/KhooLy/Fluxa/releases/latest) and install it. You may need to allow "install unknown apps" for your browser or file manager first.

**Web / webOS:** the web app needs no install — open it in any browser. For LG TVs, get the native app from the [fluxa-web releases page](https://github.com/FluxaMedia/fluxa-web/releases/latest) and sideload it via the TV's Developer Mode app. See [webOS install notes](/docs/platform-install#webos) for the full walkthrough.

## First launch

When you open Fluxa for the first time, you'll be asked to create a profile. Give it a name and pick an avatar — that's all you need to get in. You can create more profiles later, and each one has its own completely separate library and settings.

After your profile is set up you'll see the home screen. It will look mostly empty at first, and that's normal — you need to add an addon before anything shows up.

<div class="ui-shot" aria-hidden="true">
  <div class="ui-shot-bar">
    <span class="ui-shot-dot"></span>
    <span class="ui-shot-dot"></span>
    <span class="ui-shot-dot"></span>
    <span class="ui-shot-title">Home after adding catalogs</span>
  </div>
  <div class="ui-shot-body">
    <div class="ui-shot-hero"></div>
    <div class="ui-shot-row-title"></div>
    <div class="ui-shot-posters">
      <span class="ui-shot-poster"></span>
      <span class="ui-shot-poster"></span>
      <span class="ui-shot-poster"></span>
      <span class="ui-shot-poster"></span>
      <span class="ui-shot-poster"></span>
    </div>
  </div>
</div>

## Adding your first addon

Addons are what bring content into Fluxa. Each addon has a link — a web address ending in `/manifest.json` — that you paste into Fluxa to install it.

```
https://example-addon.example/manifest.json
```

To add one, go to **Settings → Addons**, paste the addon link into the field, and confirm. The home screen will fill in immediately with content from that addon.

You can install as many addons as you like. Each one can add more content, more stream sources, or subtitles on top of what you already have.

:::info
**Where do I find addon links?** Search for "Stremio addon list" — Fluxa uses the same addon format. Community-maintained lists are easy to find online.
:::

## Finding something to watch

Browse the home screen rows, use the **Search** screen to look for a specific title, or open **Discover** to explore a catalog by genre. Tap any poster to open the detail page, where you can read the synopsis, see the cast, and hit Play.

## Playing something

When you tap Play, Fluxa asks your addons for available sources and either shows you a list to choose from or starts automatically, depending on your settings. Once a source is picked, the video starts playing in the built-in player.

If one source doesn't work, you can switch to another without going back to the detail page — there's a source button in the player itself.

## Screens at a glance

| Screen | What it's for |
| --- | --- |
| Home | Content rows from your installed addons. |
| Search | Look up any title across all your addons at once. |
| Discover | Browse one catalog at a time with genre and type filters. |
| Library | Your saved titles, continue watching, and collections. |
| Calendar | Upcoming episode dates for shows in your watchlist. |
| Settings | Everything configurable — playback, appearance, accounts, addons. |
