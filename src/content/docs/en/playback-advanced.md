---
title: "Playback Advanced"
description: "Advanced playback notes for mpv options, hardware decoding, HDR, subtitles, and external players."
section: core-workflows
icon: "sliders"
order: 4
badges: ["mpv", "HDR", "Subtitles"]
---

## mpv options

Desktop builds use mpv under the hood. Advanced users can pass raw mpv options through Settings -> Playback -> MPV Options.

```
video-sync=display-resample
hwdec=auto-safe
sub-font-size=44
```

:::warning
**Use mpv options carefully.** Invalid options can break playback until removed.
:::

## Hardware decoding

Hardware decoding can reduce CPU usage, especially for 4K, H.265/HEVC, and AV1. If playback stutters or shows a black screen, try a different source first, then adjust decoder settings.

## HDR and Dolby Vision

HDR or Dolby Vision files can look washed out on unsupported screens. Try a non-HDR source, adjust Dolby Vision fallback, or use a display that supports the format.

## External player setup

If internal playback does not fit your setup, set the default player to an external app in Settings -> Playback. Fluxa will pass the selected stream URL to that player.

## Subtitle styling

Use Settings -> Subtitles for preferred language, text color, outline color, opacity, and size. If characters look wrong, try another track from a subtitle addon.
