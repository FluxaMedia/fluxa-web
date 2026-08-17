---
title: "Playback"
description: "Everything about watching — picking a source, controlling the player, subtitles, and what happens next."
section: core-workflows
icon: "play-circle"
order: 3
badges: ["Desktop", "Android", "mpv"]
---

## Picking a source

When you tap Play, Fluxa asks your stream addons for available sources. Depending on your settings, one of three things happens:

- **Manual** — a list appears showing every available source with quality info. You pick the one you want.
- **Auto (first source)** — Fluxa picks the first source it gets back and starts playing immediately.
- **Auto (regex match)** — Fluxa picks the first source whose name or quality matches a pattern you define. Useful if you always want 1080p or a specific addon's streams.

You can change this in **Settings → Playback → Stream Source Selection**.

### Switching sources mid-playback

The source list is always available while watching — there's a button in the player controls. If a source is buffering slowly or stops working, tap it and switch to another without closing the player.

## Torrents

Some stream addons provide torrent links instead of direct video files. Fluxa has a built-in download engine, so these work without any outside app — just tap Play and it handles everything.

Torrent playback goes through a few stages before video starts: finding other people who have the file, downloading the beginning, and then starting playback once there's enough to watch. The whole thing usually takes under a minute if the torrent is healthy. If it's stuck for a long time, there may not be enough sources available — try switching to a different stream source.

## Player controls

| Action | How |
| --- | --- |
| Play / Pause | Click the video or press Space |
| Skip forward 10 seconds | Right arrow or the +10 button |
| Skip back 10 seconds | Left arrow or the −10 button |
| Volume | Up/Down arrow keys or the volume slider |
| Fullscreen | F key or the fullscreen button |
| Playback speed | Speed selector in the toolbar |
| Hold to speed up | Hold down on the video — releases back to normal when you let go |

The skip amount and hold speed can both be changed in Settings → Playback.

## Subtitles

Open the subtitles menu in the player toolbar to see all available subtitle tracks — ones embedded in the video file and any provided by subtitle addons you've installed. Tap a track to switch to it, or tap Off to disable subtitles.

In **Settings → Subtitles** you can set a preferred language so subtitles in that language turn on automatically. You can also adjust the text size, colour, and outline there.

## Audio tracks

If a video has multiple audio tracks — different languages, commentary, etc. — the audio menu in the player toolbar lets you switch between them.

## Auto-play next episode

When an episode ends, Fluxa can automatically start the next one after a short countdown. A card appears in the corner showing what's coming up — you can dismiss it to stay on the current episode or tap Play Now to skip the countdown. Turn this on or off in **Settings → Playback → Auto-play Next Episode**.

## Skip intro and recap

Fluxa can detect intro and recap segments for many shows and display a Skip button at the right moment. Tap it to jump past the segment, or ignore it and it disappears on its own when the segment ends. Both can be turned on or off in Settings → Playback.
