---
title: "FAQ"
description: "Answers to the most common questions."
section: "Reference"
icon: "help-circle"
order: 7
badges: ["Answers"]
---

:::faq[Is Fluxa free?]
Yes. Fluxa is completely free to download and use. The optional third-party services you can connect — Trakt, MyAnimeList, Simkl, Nuvio — are separate products with their own accounts and pricing. Fluxa itself has no subscription or paid features.
:::

:::faq[Is it legal?]
Fluxa itself is a legal, open-source app. It doesn't host or provide any content. What you can actually watch depends entirely on the addons you install — Fluxa has no control over what addon developers make available. You're responsible for the addons you use and the content you access through them.
:::

:::faq[Do I need to create an account?]
No. Fluxa works completely without any account. Trakt, MAL, Simkl, and Nuvio are all optional third-party services — you can connect any or none of them. You can stream, save to your library, make collections, and use profiles without ever signing in to anything.
:::

:::faq[Why is the home screen empty after I install the app?]
Fluxa doesn't come with any built-in content. You need to install an addon first. Go to **Settings → Addons**, paste in an addon link, and the home screen fills up right away. See [Getting Started](/docs/getting-started) for a full walkthrough.
:::

:::faq[Where do I find addon links?]
Fluxa uses the same addon format as Stremio, so searching for "Stremio addon list" will turn up plenty of community-maintained lists. Each addon has its own link — a web address ending in `/manifest.json` — that you paste into Fluxa to install it.
:::

:::faq[What's the difference between catalog addons and stream addons?]
Catalog addons provide the lists of movies and shows that fill your home screen and search results. Stream addons provide the actual video when you press Play. Many addons do both at once. You need at least one stream addon to actually watch anything.
:::

:::faq[Why does it say "Trying…" for a while before playback starts?]
Fluxa is asking your addons for stream sources. How long this takes depends on how fast your addons respond. If some are slow or offline, it takes longer. Disabling addons you rarely use in **Settings → Addons** can speed this up noticeably.
:::

:::faq[Why is the video quality low?]
In **Manual** source selection mode you can pick any source from the list, including higher-quality ones. In **Auto** mode, switch to **Regex** and enter a pattern like `1080p` — Fluxa will automatically prefer sources whose names match it. Both settings are in **Settings → Playback → Stream Source Selection**.
:::

:::faq[Can I use an external video player instead?]
Yes. Go to **Settings → Playback → Default Player** and set it to an external app. When you press Play, Fluxa sends the stream link to that app instead of playing it internally.
:::

:::faq[How do I set up Fluxa for anime?]
Install an anime catalog addon to browse and discover titles, and at least one streaming addon that provides anime sources. Connect MyAnimeList or Simkl from **Settings → Account** to track what you watch. The **Skip Recap** setting in **Settings → Playback** is also useful for anime.
:::

:::faq[Why don't I see cast photos or trailers?]
Cast photos and trailers can come from your installed metadata addons — many addons include this information alongside streams. If yours don't provide them, you can add a free TMDB API key in **Settings → Metadata** to pull in additional data from The Movie Database. Get a free key at [themoviedb.org](https://www.themoviedb.org/settings/api).
:::

:::faq[Can I import my Trakt or MAL watch history into Fluxa?]
Yes. When you first connect Trakt or MyAnimeList, your existing watch history is pulled into Fluxa's Library automatically.
:::

:::faq[How do I update Fluxa?]
Go to **Settings → General → Check for updates**. The app shows your current version and downloads the latest one automatically. You can also download a new version manually from the releases page.
:::

:::faq[Can I download content to watch offline?]
No. Fluxa doesn't support offline downloads — everything plays live from online sources. The app caches some data while playing, but you can't save content for later.
:::

:::faq[What video formats does Fluxa support?]
Fluxa uses mpv to play video, which supports virtually every format: MKV, MP4, AVI, H.264, H.265/HEVC, AV1, and more. If a video plays in mpv, it will play in Fluxa.
:::

:::faq[Can I use a VPN with Fluxa?]
Yes, VPNs work normally with Fluxa. A VPN may affect how individual addons and stream sources behave — some sources may be slower or unavailable depending on your exit location — but the app itself works fine with one running.
:::

:::faq[How do keyboard shortcuts work?]
In the player: Space to play/pause, left/right arrow keys to seek, up/down arrow keys to adjust volume, F to toggle fullscreen. The skip amount for the arrow keys is configurable in **Settings → Playback → Skip Amount**.
:::

:::faq[Can I change subtitles or audio language while watching?]
Yes. Both the subtitle menu and audio track menu are always available in the player toolbar while something is playing. You can switch tracks or turn subtitles off without pausing.
:::

:::faq[Why are episode numbers wrong for some shows?]
Different addons sometimes use different episode numbering, especially common with anime that aired as split-cour seasons. If the numbers don't match, try a different stream addon — the catalog and stream addon may be counting episodes by different conventions.
:::

:::faq[What is Nuvio and do I need it?]
Nuvio is an optional third-party sync service, not part of Fluxa itself. It lets you keep your library, watch progress, and settings in sync between Fluxa on desktop and Fluxa on Android. If you only use one device, or don't mind setting up each device separately, you don't need Nuvio — Fluxa works exactly the same without it.
:::

:::faq[Can multiple people use Fluxa on the same computer?]
Yes. Fluxa supports up to five profiles per installation, each with its own completely separate library, addon list, and accounts. You can set a PIN on a profile to keep it private.
:::

:::faq[Can each profile have different settings and addons?]
Yes, every profile is fully independent — separate addons, appearance settings, accounts, and library. A profile can also be optionally configured to share the addon list with your main profile. Useful for a second profile for a family member.
:::

:::faq[How do I move my data to a new device?]
If you use Nuvio sync, just sign in on the new device and everything syncs over. Without Nuvio, you can export your collections as a file from the collection editor and import them on the new device. Watch history can be recovered by reconnecting Trakt or MAL if you have those set up.
:::

:::faq[Where does Fluxa store my data?]
Everything is stored in your system's standard app data folder:

Windows: `%APPDATA%\fluxa-desktop`

macOS: `~/Library/Application Support/fluxa-desktop`

Linux: `~/.local/share/fluxa-desktop`
:::

:::faq[Can I use Fluxa without an internet connection?]
The app opens offline and your saved library and collections are readable without internet. But actually watching something requires a connection — streams come from online sources and catalogs are fetched live from your addons.
:::

:::faq[What's the difference between Fluxa Desktop and Fluxa for Android?]
They're the same app on different platforms. The features, addon support, and sync are identical — the interface is adapted for desktop vs. mobile. Watch progress and library sync between them if you have Nuvio or the same tracking accounts connected.
:::

:::faq[How do I report a problem or suggest something?]
Open an issue on [GitHub](https://github.com/FluxaMedia/fluxa-desktop/issues). Include your OS, your Fluxa version (Settings → Advanced → Version), and a clear description of what happened. For playback issues, mentioning which addon and source you were using helps a lot.
:::

:::faq[Can I use Stremio addons?]
Yes. Fluxa supports the Stremio addon protocol, so Stremio-compatible manifest URLs can be installed in Fluxa. If the addon has a configuration page, configure it first and install the generated manifest URL.
:::

:::faq[Why do some addons disappear or stop working?]
Addons are third-party remote services. They can go offline, change their URLs, require new configuration, lose provider support, or be rate-limited. Fluxa can only use the response an addon returns.
:::

:::faq[Why does one profile show different content than another?]
Profiles are separate. Each profile can have different addons, catalog rows, settings, accounts, and library state. Check the active profile and compare Settings -> Addons and Settings -> Home Catalogs.
:::

:::faq[What happens if Nuvio is down?]
Local Fluxa usage still works. You can browse with installed addons and use local library state, but cross-device sync may pause until Nuvio is reachable again. Avoid making the same collection edits on multiple devices while sync is unavailable.
:::

:::faq[Can I migrate from Stremio?]
You can reuse Stremio-compatible addon manifest URLs. Stremio account data itself is separate unless a specific Fluxa account page or addon integration supports importing it. Tracking history is best recovered through Trakt, MyAnimeList, or Simkl.
:::

:::faq[Which account should I create first?]
If you only use one device, start without an account. If you use desktop and Android, create a Nuvio account for Fluxa sync. Add Trakt, MyAnimeList, or Simkl only if you want external tracking.
:::
