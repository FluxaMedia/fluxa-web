---
title: "Troubleshooting"
description: "Common problems and how to fix them."
section: reference
icon: "alert-circle"
order: 3
badges: ["Fixes", "Desktop", "Android"]
---

## Fast triage

:::cards
- [Empty Home](#the-home-screen-is-empty) — Cause: no active catalog addons. Fix: install or enable an addon and confirm Home Catalog rows are visible.
- [No sources](#nothing-plays-when-i-press-play) — Cause: no stream addon returned a result. Fix: install a stream addon or try another title/source.
- [Playback fails](#playback-stops-or-says-try-another-source) — Cause: source server, torrent health, or file issue. Fix: switch source from the player.
- [Sync stopped](#sync-with-trakt-mal-simkl-stopped-working) — Cause: expired token or account connection issue. Fix: disconnect and reconnect the service.
:::

## Nothing plays when I press Play

This usually means none of your stream addons returned a source for that title. Check that you have at least one addon installed that provides streams — not just catalog addons. Verify your internet connection is working. You can test an addon by opening its link directly in a browser; if you get an error page, the addon's server may be down or the link may have changed.

## Playback stops or says "try another source"

The stream you picked ran into a problem — the file may have moved, the server returned an error, or there were too few people sharing the torrent. Tap the source button in the player and pick a different one. Most titles have multiple sources across different addons.

## Torrents are stuck loading for a long time

Torrent playback needs enough active peers to start quickly. If it's been on "loading" or "preloading" for more than a couple of minutes, the torrent likely has very few people sharing it. Switch to a different stream source — ideally a direct link from another addon rather than another torrent of the same file.

Some networks (work networks, certain ISPs) block torrent traffic entirely. If torrents never work for you but direct links do, that's likely the cause. A VPN sometimes helps in this case.

## The home screen is empty

You either haven't installed any addons yet, or all your installed addons are disabled or unreachable. Go to **Settings → Addons** and confirm at least one is installed and switched on. Also check **Settings → Home Catalogs** to make sure some rows are enabled — all rows being hidden will also produce an empty home screen.

## Video is choppy or stuttering

Try switching to a different stream source — some sources have more reliable connections than others. Check your internet speed. If the problem persists across sources, try lowering the buffer cache in **Settings → Buffer & Cache**, or experiment with decoder settings in **Settings → Decoder**. On lower-end hardware, H.265/HEVC or AV1 streams may stutter while H.264 ones play fine.

## No audio during playback

First check your system volume and the player's volume slider. If the system audio is working but the player is silent, open the audio track menu in the player toolbar and check if a different track is available. Enabling **FFmpeg Audio Decoder** in **Settings → Decoder** fixes audio for some file types that the default decoder doesn't handle correctly.

## Subtitles aren't showing up automatically

Check **Settings → Subtitles** and confirm a preferred language is set. If it is and subtitles still don't appear, the title may not have a track in that language available from your addons or embedded in the file. Open the subtitle menu in the player to see what's available and pick one manually.

## Subtitle text is garbled or showing wrong characters

This usually affects older subtitle formats like SRT with non-Latin text. If multiple subtitle tracks are available, try switching to a different one — external subtitle addons sometimes have better-encoded versions. There's no encoding fix built in, so a different track is the most reliable solution.

## Cast photos and trailers don't appear on detail pages

Cast photos and trailers can come from your installed metadata addons — many addons include this information. If your current addons don't provide them, you can add a free TMDB API key in **Settings → Metadata** for additional data from The Movie Database. Get a key at [themoviedb.org](https://www.themoviedb.org/settings/api).

## Sync with Trakt / MAL / Simkl stopped working

The connection token may have expired. Go to **Settings → Account**, disconnect the service, and reconnect it. The sign-in flow opens in your browser just like when you first connected. Your data stays on the service — only the connection to Fluxa is reset.

## After signing in to a tracking service, I wasn't sent back to Fluxa

This happens when the callback link that sends you back to Fluxa isn't registered with your operating system. On Windows and macOS this registers automatically when you install Fluxa. On Linux, reinstalling or running Fluxa once from the terminal usually fixes it. If it keeps happening, try the sign-in flow again — a second attempt sometimes works after the system has registered the protocol handler.

## Episode numbers are wrong for some shows

Different addons sometimes use different numbering conventions, which is especially common with anime that aired as split-cour seasons. The catalog addon (which shows the episode list) and the stream addon (which provides the video) may be counting episodes differently. Try a different stream addon for that title and see if the numbers align better.

## Continue Watching shows the wrong position

Clear the progress for that title by opening its detail page and marking it as unwatched, then start fresh. If Nuvio or another sync service is active, the wrong position may have been pushed from another device.

## Search returns no results

Not all catalog addons support search — some only provide home screen rows. Make sure at least one of your installed addons supports search. If you're certain it should work, try a broader search term, and check that the addon is reachable by opening its link in a browser.

## The calendar shows the wrong times for episodes

Fluxa converts episode air times to your local timezone automatically — there's no setting to toggle. If times still look off, it's most likely the addon itself reporting the wrong air time or date for that episode rather than a timezone issue. Try a different catalog addon for that show if it has one, or check the episode's air time on the addon's own site.

## App crashes on startup or won't open

Try reinstalling the latest version from the releases page. If the crash happens after an update, check the GitHub issues page to see if others are reporting the same thing.

## App is slow to start or takes a long time to load

Startup slowness is usually caused by having many addons installed where some take a long time to respond. Go to **Settings → Addons** and disable any addons you rarely use. You can identify the slow one by disabling them one at a time and seeing which removal makes startup faster.

## App is using too much memory or CPU

Disable addons you don't use regularly — each active addon is polled at startup and during browsing. Lower the buffer cache in **Settings → Buffer & Cache** if memory usage is high during playback. If CPU is spiking during video, the current stream may be using a codec your hardware struggles to decode — try switching to an H.264 source if available.

## Video plays but colours look washed out or wrong

This typically happens with HDR or Dolby Vision content on a monitor that doesn't support it. Try changing **Dolby Vision Fallback** in **Settings → Decoder** — the available options handle the conversion differently, and one may look better than others on your display.

## Nuvio sync isn't working

Check your internet connection first. Go to **Settings → Account** and check the Nuvio status — it will show if there's a problem. Signing out and back in usually resolves temporary issues.

## macOS says Fluxa is damaged and can't be opened

This is a macOS security prompt for apps downloaded outside the App Store. Go to **System Settings → Privacy & Security**, scroll down to where it mentions Fluxa, and click *Open Anyway*. You only need to do this once.

## On Linux, the video window is black

This is almost always a GPU driver or video output issue. Make sure your GPU drivers are up to date (especially on AMD/Intel with Mesa, or proprietary NVIDIA drivers). If you're on Wayland, try switching your session to X11 (or vice versa) to see if that resolves it. You can also try a different video output by setting `vo=x11` or `vo=xv` in **Settings → Playback → MPV Options** as a fallback if hardware-accelerated rendering isn't working on your system.

:::note
**Still stuck?** Open an issue on [GitHub](https://github.com/FluxaMedia/fluxa-desktop/issues) with your OS, Fluxa version (Settings → Advanced → Version), and a description of what happened.
:::
