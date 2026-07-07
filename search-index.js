window.SEARCH_INDEX = [
  {
    "page": "docs.html",
    "pageTitle": "Fluxa Docs",
    "sections": [
      {
        "title": "Start here",
        "anchor": "start-here",
        "content": "What Fluxa is The short explanation, platform support, and content model. Install and first stream Download, create a profile, install an addon, and play something. Terms and concepts Addons, catalogs, manifests, debrid, Usenet, mpv, and source quality. Quick answers Short answers for common account, addon, playback, and library questions."
      },
      {
        "title": "Common tasks",
        "anchor": "common-tasks",
        "content": "Install your first addon Paste a manifest URL and make content rows appear. Set up Nuvio sync Keep library, profiles, collections, and progress aligned across devices. Create a collection Build custom library sections and optionally pin them to Home. Fix playback issues Use symptom-based fixes for empty source lists, buffering, audio, and subtitles. Fluxa does not provide content. The app connects to addons you install. If the Home screen is empty or nothing plays, start with the addon guide and troubleshooting page."
      }
    ]
  },
  {
    "page": "what-is-fluxa.html",
    "pageTitle": "Fluxa",
    "sections": [
      {
        "title": "What is Fluxa?",
        "anchor": "what-is-fluxa",
        "content": "Fluxa is a free, open-source media player available on desktop (Windows, macOS, Linux) and Android. It doesn't come with content built in — instead, you install addons that bring in movies, shows, and anime from around the web. Think of it like a browser for streaming: Fluxa is the browser, and addons are the websites. Once you have an addon set up, you can browse catalogs, search for titles, and hit play. Fluxa handles the rest — fetching the stream, playing the video, tracking where you left off, and syncing your watch history. All platform versions share the same addon format, library structure, and tracking integrations. Your content and progress can sync between desktop and Android through optional third-party services."
      },
      {
        "title": "What can it do?",
        "anchor": "what-can-it-do",
        "content": "Browse and discover. Your home screen fills up with rows of content from every addon you've installed — trending, top rated, by genre, and more. You can also search across all your addons at once. Track what you watch. Fluxa saves where you left off in every movie and episode. It can also sync your watch history to Trakt, MyAnimeList, or Simkl so you have one place that knows everything you've ever seen. Build your library. Save titles to your watchlist, organise them into custom collections, and keep continue watching exactly where you need it. Play anything your addons provide. Direct streams, torrent links, subtitles from subtitle addons — the built-in player handles all of it. Multiple profiles. Up to five separate profiles on one install, each with its own library, addons, and accounts. Useful for households or anyone who wants to keep anime and regular TV separate."
      },
      {
        "title": "Supported platforms",
        "anchor": "supported-platforms",
        "content": "Windows 10 or later .exe installer macOS 11 or later .dmg (Intel & Apple Silicon) Ubuntu / Debian Linux .deb package Fedora / RHEL Linux .rpm package Any Linux (portable) .AppImage Android APK via GitHub releases"
      },
      {
        "title": "How it's built",
        "anchor": "how-it-s-built",
        "content": "Fluxa is split across three open-source repositories: fluxa-desktop — The desktop app (Tauri + React). Window management, UI, and OS integration for Windows, macOS, and Linux. fluxa — The Android app. Same features and addon compatibility, built for phones and tablets. fluxa-core — A shared Rust library used by both apps. All the business logic lives here: addon resolution, streaming, library state, search, and playback policy."
      },
      {
        "title": "A note on content",
        "anchor": "a-note-on-content",
        "content": "Fluxa doesn't host or provide any content itself. Everything you watch comes from addons that you choose to install. Whether those addons provide legal content depends on the addon — Fluxa has no control over or affiliation with what addon developers make available. You're responsible for the addons you use."
      }
    ]
  },
  {
    "page": "getting-started.html",
    "pageTitle": "Getting Started",
    "sections": [
      {
        "title": "Download and install",
        "anchor": "download-and-install",
        "content": "Grab the file for your platform from the release page and install it. Windows Fluxa_x.x.x_x64-setup.exe macOS Fluxa_x.x.x_universal.dmg Ubuntu / Debian fluxa_x.x.x_amd64.deb Fedora / RHEL fluxa-x.x.x-1.x86_64.rpm Linux portable fluxa_x.x.x_amd64.AppImage Android fluxa-x.x.x.apk LG webOS TV fluxa-x.x.x.ipk Windows, macOS, Linux: from the fluxa-desktop releases page. Run the Windows installer and follow the prompts; open the macOS .dmg and drag Fluxa into Applications; install the Linux .deb/.rpm with your package manager, or run the .AppImage directly — mpv is bundled. Android: download the APK from the fluxa-android releases page. Web / webOS: the web app needs no install — open it in any browser. For LG TVs, get the native app from the fluxa-web releases page and sideload it via Developer Mode."
      },
      {
        "title": "First launch",
        "anchor": "first-launch",
        "content": "When you open Fluxa for the first time, you'll be asked to create a profile. Give it a name and pick an avatar — that's all you need to get in. You can create more profiles later, and each one has its own completely separate library and settings. After your profile is set up you'll see the home screen. It will look mostly empty at first, and that's normal — you need to add an addon before anything shows up. Home after adding catalogs"
      },
      {
        "title": "Adding your first addon",
        "anchor": "adding-your-first-addon",
        "content": "Addons are what bring content into Fluxa. Each addon has a link — a web address ending in /manifest.json — that you paste into Fluxa to install it. https://example-addon.example/manifest.json To add one, go to Settings → Addons , paste the addon link into the field, and confirm. The home screen will fill in immediately with content from that addon. You can install as many addons as you like. Each one can add more content, more stream sources, or subtitles on top of what you already have. Where do I find addon links? Search for \"Stremio addon list\" — Fluxa uses the same addon format. Community-maintained lists are easy to find online."
      },
      {
        "title": "Finding something to watch",
        "anchor": "finding-something-to-watch",
        "content": "Browse the home screen rows, use the Search screen to look for a specific title, or open Discover to explore a catalog by genre. Tap any poster to open the detail page, where you can read the synopsis, see the cast, and hit Play."
      },
      {
        "title": "Playing something",
        "anchor": "playing-something",
        "content": "When you tap Play, Fluxa asks your addons for available sources and either shows you a list to choose from or starts automatically, depending on your settings. Once a source is picked, the video starts playing in the built-in player. If one source doesn't work, you can switch to another without going back to the detail page — there's a source button in the player itself."
      },
      {
        "title": "Screens at a glance",
        "anchor": "screens-at-a-glance",
        "content": "Screen What it's for Home Content rows from your installed addons. Search Look up any title across all your addons at once. Discover Browse one catalog at a time with genre and type filters. Library Your saved titles, continue watching, and collections. Calendar Upcoming episode dates for shows in your watchlist. Settings Everything configurable — playback, appearance, accounts, addons."
      }
    ]
  },
  {
    "page": "concepts.html",
    "pageTitle": "Concepts",
    "sections": [
      {
        "title": "Addons",
        "anchor": "addons",
        "content": "An addon is a small online service that Fluxa connects to in the background. You install one by giving Fluxa its address (a URL ending in /manifest.json ), and Fluxa starts talking to it automatically from that point on. Most addons run on someone else's server — you just link to them. Addons come in a few distinct types, though many addons combine more than one type in a single package. Catalog addon A catalog addon provides lists of titles: trending movies, top-rated shows, new anime releases, by genre, and so on. These are the rows that appear on your home screen and the results you see when you search. A catalog addon tells Fluxa what exists — it doesn't provide the actual video. You can have as many catalog addons as you want. Each one adds more rows and more content to discover. In Settings → Home Catalogs, you choose which rows appear and in what order. Stream addon A stream addon provides the actual video links when you press Play. When you tap Play on a title, Fluxa sends a request to all your stream addons at once, asking for available sources. Each addon replies with whatever it has — direct HTTP video links, torrent magnet links, or nothing. Fluxa shows you the combined"
      },
      {
        "title": "Debrid services",
        "anchor": "debrid-services",
        "content": "A debrid service (also called a \"premium link generator\" or just \"debrid\") is a paid third-party service that dramatically improves streaming performance. It's one of the most impactful things you can add to a setup like Fluxa if you watch frequently. How it works Many stream addons return torrent links rather than direct video files. Without debrid, playing a torrent requires your device to connect to a swarm of other users sharing that file — which can be slow, unreliable, or blocked by your ISP. A debrid service works differently: it downloads the torrent to its own fast servers and gives you a plain HTTP stream URL instead. You then stream directly from the debrid provider's server, not from random peers. The result is: Speed — You're pulling from a data center, not a peer swarm. Even 4K files start in seconds. Reliability — Popular content is cached on the debrid server already. You get it instantly. No ISP issues — Your traffic looks like a normal HTTPS download. Torrent throttling doesn't apply. Better quality — Full-quality remux and 4K sources that would be impractical to torrent stream fine over HTTP. The tradeoff is cost — debrid services are paid subscriptions, typicall"
      },
      {
        "title": "Usenet",
        "anchor": "usenet",
        "content": "Usenet is a decades-old, decentralized network of newsgroups. Outside its original purpose, it's become a fast and reliable way to get media — and like debrid, some stream addons can pull from it directly so you get a streamable link without downloading anything yourself. How it works Files on Usenet are uploaded as binary data spread across many small articles, described by a small text file called an NZB. The NZB doesn't contain the file itself — it's a set of pointers telling a Usenet client which articles to fetch and how to put them back together, similar to how a torrent file points at peers instead of containing the video. To use Usenet you need a paid Usenet provider (the server that actually stores the articles) and usually an indexer that searches for NZBs and hands the right one to your downloader. Speed — providers run high-bandwidth servers with many parallel connections, so downloads often max out a home connection. Privacy — there's no peer swarm to join. You only ever connect to your provider's servers over an encrypted connection. Long retention — most providers keep content for over a decade, so older or niche releases stay available long after they'd have died ou"
      },
      {
        "title": "Manifest URL",
        "anchor": "manifest-url",
        "content": "Every addon has a manifest URL — a web address ending in /manifest.json . This is the addon's \"address\" that you paste into Fluxa to install it (Settings → Addons). When Fluxa reads this file, it learns everything about the addon: its name, what types of content it provides (catalogs, streams, metadata, subtitles), and how to ask it for data. Think of the manifest URL like a phone number — it's what Fluxa dials to reach the addon. The addon itself runs on a remote server; the manifest URL just tells Fluxa where to look. If an addon has configuration options (like a debrid API key or content filters), its configuration page is usually found by opening the manifest URL in a browser and removing the /manifest.json part from the end."
      },
      {
        "title": "Stremio compatibility",
        "anchor": "stremio-compatibility",
        "content": "Fluxa uses the same addon protocol as Stremio. This means every Stremio-compatible addon works in Fluxa without any changes — you can install them exactly the same way by pasting the manifest URL. Communities that have built addons for Stremio have effectively built them for Fluxa too. This is intentional. Rather than building a proprietary addon ecosystem from scratch, Fluxa taps into the large existing ecosystem of community addons that Stremio users have built and maintained over the years."
      },
      {
        "title": "Direct streams vs torrents",
        "anchor": "direct-streams-vs-torrents",
        "content": "When you press Play, each stream source has a type: Direct (HTTP/HTTPS) — A plain video file served from a web server. Playback starts immediately. These come from hosting sites, debrid services (which convert torrents to direct links), or CDNs that addons have access to. Torrent (magnet link) — A torrent that Fluxa's built-in download engine connects to. Requires downloading the beginning of the file from a peer swarm before playback can start. Slower to begin, and quality depends on how many people are sharing. In the source list, you can usually tell them apart by looking at the quality label. If a source says something like \"via RD\" or has a debrid service name in it, that's a direct link that was originally a torrent but has been converted by the addon using your debrid account."
      },
      {
        "title": "Cached vs uncached debrid",
        "anchor": "cached-vs-uncached-debrid",
        "content": "When a debrid service has already downloaded a specific torrent file, it's \"cached\" — meaning everyone with a debrid account can stream it immediately as a direct link. When it's \"uncached\", the debrid service would have to download it first, which can take minutes. Most popular content is cached on Real-Debrid and AllDebrid within hours of a new release. Niche content, older films, or very new releases may not be cached yet. Addons that support debrid typically mark sources as cached or uncached so you know what to expect before you pick one."
      },
      {
        "title": "mpv",
        "anchor": "mpv",
        "content": "mpv is a free, open-source video player that Fluxa uses as its playback engine on desktop. It's what actually decodes and renders the video — Fluxa wraps it to provide the app interface. Because mpv supports virtually every video codec and format (MKV, MP4, AVI, H.264, H.265/HEVC, AV1, Dolby Vision, HDR, etc.), Fluxa inherits that compatibility without needing separate codec packs or plugins. The required libraries are bundled with Fluxa on every platform, including Linux — there's nothing extra to install. Advanced users can pass raw mpv options through Settings → Playback → MPV Options (one per line, e.g. video-sync=display-resample ). Only do this if you know what you're doing — wrong options can break playback."
      },
      {
        "title": "What is a \"4K remux\"?",
        "anchor": "what-is-a-4k-remux",
        "content": "You'll see terms like \"remux\", \"BluRay\", \"WEB-DL\", and \"encode\" in stream source names. They describe where the video came from and how much it's been compressed: Remux — The original video track from a Blu-ray or streaming source, with no additional compression. Largest file size, best quality. A 4K remux can be 60–100GB. BluRay encode / BDRip — Re-encoded from a Blu-ray source. Smaller than a remux, slightly lower quality, still very good. WEB-DL — Downloaded directly from a streaming service (Netflix, Amazon, etc.). Quality depends on the source bitrate. WEBRip — Screen-captured from a streaming service. Generally lower quality than WEB-DL. CAM / HDCAM — Recorded in a cinema. Poor quality. Avoid these. For daily watching, a 1080p WEB-DL or BluRay encode is indistinguishable from a remux on most screens. 4K remuxes only make a visible difference on large 4K TVs with HDR."
      }
    ]
  },
  {
    "page": "architecture.html",
    "pageTitle": "Architecture",
    "sections": [
      {
        "title": "Repos and responsibilities",
        "anchor": "repos-and-responsibilities",
        "content": "Fluxa is split into app shells and shared logic. fluxa-desktop owns the desktop interface, windows, installers, and OS integration. fluxa owns the Android interface and Android platform integration. fluxa-core is the shared Rust layer for addon resolution, library state, search behavior, source handling, and playback policy. This split keeps platform code close to each app while keeping the media logic consistent across desktop and Android."
      },
      {
        "title": "What runs locally vs remotely",
        "anchor": "local-vs-remote",
        "content": "Part Where it runs What it does Fluxa app Your device UI, profiles, settings, playback controls, library views. fluxa-core Your device Addon calls, source selection, local state, playback decisions. Addons Remote servers Catalogs, metadata, streams, subtitles. Nuvio Remote sync service Optional cross-device account sync. Tracking services Third-party services Optional watch history and list sync."
      },
      {
        "title": "Data flow",
        "anchor": "data-flow",
        "content": "A catalog addon provides rows or search results. Metadata fills detail pages with posters, summaries, cast, episodes, and trailers. When you press Play, stream addons return direct links, torrents, or addon-specific source labels. Fluxa applies your source selection settings, starts playback, and saves progress locally. Optional services such as Nuvio, Trakt, MyAnimeList, or Simkl receive sync updates."
      },
      {
        "title": "Failure boundaries",
        "anchor": "failure-boundaries",
        "content": "Most empty or missing content issues are addon-side. If a catalog, stream, image, or subtitle is missing, Fluxa can only show what the installed addons return. Fluxa can recover from many addon failures by combining results from multiple addons, but it cannot force an unavailable addon server to respond or create content that an addon does not provide."
      }
    ]
  },
  {
    "page": "addon-deep-dive.html",
    "pageTitle": "Addon Deep Dive",
    "sections": [
      {
        "title": "Manifest basics",
        "anchor": "manifest-basics",
        "content": "Every addon starts with a /manifest.json URL. The manifest tells Fluxa the addon name, supported resource types, content types, catalogs, ID prefixes, and whether configuration is required. { \"id\": \"example.addon\", \"name\": \"Example Addon\", \"resources\": [\"catalog\", \"meta\", \"stream\", \"subtitles\"], \"types\": [\"movie\", \"series\"] }"
      },
      {
        "title": "Endpoint types",
        "anchor": "endpoint-types",
        "content": "Endpoint Purpose catalog Rows of titles, genre lists, discover pages, home sections. meta Title details, seasons, episodes, posters, cast, trailers. stream Playable source results after pressing Play. subtitles Subtitle tracks for the selected video."
      },
      {
        "title": "Stremio compatibility",
        "anchor": "stremio-compatibility",
        "content": "Fluxa understands the Stremio addon protocol, so most Stremio-compatible manifests work directly. If an addon requires configuration, open its config page first, set the options, then install the generated manifest URL in Fluxa."
      },
      {
        "title": "Common addon failure modes",
        "anchor": "failure-modes",
        "content": "Manifest unreachable: the URL is wrong or the addon server is down. No catalog rows: the addon does not provide catalogs, or the selected rows are disabled. No streams: the addon has no source for that title, or required account/API settings are missing. Wrong metadata: IDs differ between catalog and metadata providers. Slow startup: one or more addons are timing out during startup or search."
      }
    ]
  },
  {
    "page": "accounts-comparison.html",
    "pageTitle": "Account Comparison",
    "sections": [
      {
        "title": "Quick comparison",
        "anchor": "quick-comparison",
        "content": "Account Required? Use it for No account No Local profiles, local addons, local playback, local library. Nuvio No Cross-device Fluxa sync for profiles, library, progress, addons, and collections. Stremio No Using a Stremio account from the web account page when supported. Trakt No Movies and TV watch history, lists, scrobbling. MyAnimeList No Anime lists and episode progress. Simkl No Movies, TV, and anime in one tracking account."
      },
      {
        "title": "Recommended setups",
        "anchor": "recommended-setups",
        "content": "Single device: no account is required. Add tracking only if you want external history. Desktop plus Android: use Nuvio if you want Fluxa state to follow you. Anime-heavy use: connect MyAnimeList or Simkl. TV and movie tracking: connect Trakt or Simkl."
      },
      {
        "title": "Profile scope",
        "anchor": "profile-scope",
        "content": "Accounts are profile-scoped. One profile can connect a Trakt account while another profile uses a different account or no account at all. Switching profiles changes addons, library, settings, and connected services."
      }
    ]
  },
  {
    "page": "privacy-security.html",
    "pageTitle": "Privacy & Security",
    "sections": [
      {
        "title": "Local data",
        "anchor": "local-data",
        "content": "Fluxa stores app settings, profiles, installed addon URLs, library entries, collections, and playback progress locally on your device. See Data Locations for platform paths."
      },
      {
        "title": "Third-party services",
        "anchor": "third-party-services",
        "content": "Addons see the requests needed to provide catalogs, metadata, streams, or subtitles. Tracking services see the titles you sync to them. Nuvio sees the account data required for Fluxa cross-device sync. Debrid or Usenet providers see API requests made by the addon that you configured with that provider."
      },
      {
        "title": "Addon trust model",
        "anchor": "addon-trust-model",
        "content": "Only install addons you trust. Addons are remote services. Fluxa can call them, but it does not control what they log, how long they stay online, or what sources they return. Prefer addon links from maintainers or communities you recognize. If an addon asks for API keys, understand which service receives those keys."
      },
      {
        "title": "Tokens and API keys",
        "anchor": "tokens-and-keys",
        "content": "Service tokens and API keys should be treated like passwords. Do not paste them into random pages. If a key leaks, revoke it from the provider dashboard and generate a new one."
      }
    ]
  },
  {
    "page": "addons-catalogs.html",
    "pageTitle": "Addons & Catalogs",
    "sections": [
      {
        "title": "What addons do",
        "anchor": "what-addons-do",
        "content": "An addon is a small online service that Fluxa talks to behind the scenes. Different addons do different things — some bring catalogs of movies and shows, some provide the actual video streams when you press Play, and some add subtitles. Many do more than one of these at once. You can have as many addons installed as you like. They stack on top of each other, so one addon might show you what to watch and another provides the stream when you pick something."
      },
      {
        "title": "Installing an addon",
        "anchor": "installing-an-addon",
        "content": "Every addon has a link — a web address that ends in /manifest.json . To install one, go to Settings → Addons , paste that link into the field, and confirm. The addon shows up in your list right away and its content appears on the home screen immediately. To remove an addon, find it in the addon list in Settings and tap the remove button. To temporarily disable one without removing it, toggle it off in the same list. Addon order matters for streams When you press Play on a title, Fluxa asks all your stream addons at once and combines everything they return. The order your addons are in (which you can change by dragging in Settings → Addons) determines how the source list is sorted. If you have a preferred addon, put it at the top."
      },
      {
        "title": "Catalogs",
        "anchor": "catalogs",
        "content": "A catalog is a named list of content that an addon exposes — for example \"Trending Movies\" or \"Top Rated Anime\". One addon can offer many catalogs. Each catalog can show up as a row on your home screen. You choose which ones are visible and in what order from Settings → Home Catalogs . Turning off a row doesn't remove the addon — it just hides that particular list from your home screen. The featured banner The large banner at the top of the home screen pulls from catalogs you select in Settings → Hero Catalogs . It rotates through featured titles from those catalogs. You can disable it entirely from the same settings screen if you prefer to skip straight to the rows."
      },
      {
        "title": "Search",
        "anchor": "search",
        "content": "The Search screen queries all your addons at the same time and shows you combined results. You can narrow things down with the type filter (Movies or Series) and genre chips above the results. Your recent searches are saved so you can quickly repeat them. Tap one to search again, or tap the clear button to remove it."
      },
      {
        "title": "Discover",
        "anchor": "discover",
        "content": "Discover lets you browse a single catalog in full, with filters. Choose the catalog from the list at the top, then use the type and genre options to narrow down. It's useful when you want to properly explore one source rather than scrolling through the home screen."
      },
      {
        "title": "The detail page",
        "anchor": "the-detail-page",
        "content": "Tapping any title opens its detail page. Here you'll see the synopsis, release year, genres, rating, cast, and trailers. Cast photos and trailers can come from your installed metadata addons — many addons include this information. If yours don't, you can add a TMDB API key in Settings → Metadata as an additional source. For TV shows, all the seasons and episodes are listed here. You can play any episode directly from this page, add the show to your library, or mark individual episodes as watched. Cast photos or trailers not showing? Check if your installed addons provide metadata. If not, adding a free TMDB API key in Settings → Metadata will pull in additional cast and trailer data from The Movie Database."
      }
    ]
  },
  {
    "page": "sync-accounts.html",
    "pageTitle": "Sync & Accounts",
    "sections": [
      {
        "title": "Trakt",
        "anchor": "trakt",
        "content": "Trakt is a service that tracks everything you watch. Connecting it to Fluxa means every movie you finish and every episode you watch gets automatically logged to your Trakt profile. Your existing Trakt history is also pulled into Fluxa when you first connect. To connect, go to Settings → Account → Trakt and tap Connect. Your browser will open to Trakt's sign-in page — log in and approve Fluxa's access. After that, you'll be sent back to the app and sync starts automatically. To disconnect, tap Disconnect in the same place. Your Trakt data stays on Trakt — only the connection to Fluxa is removed."
      },
      {
        "title": "MyAnimeList",
        "anchor": "myanimelist",
        "content": "If you watch anime, you can connect your MyAnimeList account to track it automatically. When you finish an anime episode in Fluxa, it gets marked on your MAL profile. Your MAL lists — watching, planned, and completed — also show up in your Fluxa Library. Connect it the same way as Trakt: Settings → Account → MyAnimeList → Connect . Your browser opens to the MAL login page, you approve, and you're brought back to the app."
      },
      {
        "title": "Simkl",
        "anchor": "simkl",
        "content": "Simkl tracks movies, TV, and anime all in one place. Like Trakt, connecting it gives you two-way sync — what you watch in Fluxa appears on Simkl, and your Simkl lists show up in your Fluxa Library. Connect it from Settings → Account → Simkl → Connect . You can connect all three at once — Trakt, MAL, and Simkl can all be active simultaneously. Fluxa pushes to all of them whenever you watch something."
      },
      {
        "title": "How the sign-in flow works",
        "anchor": "how-the-sign-in-flow-works",
        "content": "When you connect a tracking service, Fluxa opens your browser to that service's login page. After you approve, the browser sends you back to Fluxa automatically. Nothing goes through an outside server — the connection happens directly between your browser, the service, and Fluxa on your machine."
      },
      {
        "title": "Nuvio — cross-device sync",
        "anchor": "nuvio-cross-device-sync",
        "content": "Nuvio is an optional third-party sync service, separate from Fluxa. Unlike Trakt/MAL/Simkl, which only track watch history, Nuvio syncs your whole Fluxa state — profiles, installed addons and their order, library entries, continue watching, collections, and relevant settings — between desktop and Android. To sign in, go to Settings → Account and connect your Nuvio account, or create one from the same screen. It's entirely optional — on a single device, or if you don't need your data to follow you, skip it and everything stays stored locally. A few things don't sync: downloaded app binaries or installer state, local OS permissions and file associations, device-only playback capabilities like GPU behavior, and other services' passwords. If two devices change the same item while offline, the most recently saved version generally wins once sync resumes. Watch progress is timestamped and resolves safely; avoid editing the same collection from two devices at once."
      },
      {
        "title": "Profiles and accounts",
        "anchor": "profiles-and-accounts",
        "content": "Each profile has its own completely separate set of accounts. If you have two profiles, each one can be connected to a different Trakt account, or none at all. Switching profiles switches everything. A profile can also be set to share the addon list with your main profile instead of having its own. Useful if you want a second profile for a family member but don't want to set up all the addons again."
      }
    ]
  },
  {
    "page": "playback.html",
    "pageTitle": "Playback",
    "sections": [
      {
        "title": "Picking a source",
        "anchor": "picking-a-source",
        "content": "When you tap Play, Fluxa asks your stream addons for available sources. Depending on your settings, one of three things happens: Manual — a list appears showing every available source with quality info. You pick the one you want. Auto (first source) — Fluxa picks the first source it gets back and starts playing immediately. Auto (regex match) — Fluxa picks the first source whose name or quality matches a pattern you define. Useful if you always want 1080p or a specific addon's streams. You can change this in Settings → Playback → Stream Source Selection . Switching sources mid-playback The source list is always available while watching — there's a button in the player controls. If a source is buffering slowly or stops working, tap it and switch to another without closing the player."
      },
      {
        "title": "Torrents",
        "anchor": "torrents",
        "content": "Some stream addons provide torrent links instead of direct video files. Fluxa has a built-in download engine, so these work without any outside app — just tap Play and it handles everything. Torrent playback goes through a few stages before video starts: finding other people who have the file, downloading the beginning, and then starting playback once there's enough to watch. The whole thing usually takes under a minute if the torrent is healthy. If it's stuck for a long time, there may not be enough sources available — try switching to a different stream source."
      },
      {
        "title": "Player controls",
        "anchor": "player-controls",
        "content": "Action How Play / Pause Click the video or press Space Skip forward 10 seconds Right arrow or the +10 button Skip back 10 seconds Left arrow or the −10 button Volume Up/Down arrow keys or the volume slider Fullscreen F key or the fullscreen button Playback speed Speed selector in the toolbar Hold to speed up Hold down on the video — releases back to normal when you let go The skip amount and hold speed can both be changed in Settings → Playback."
      },
      {
        "title": "Subtitles",
        "anchor": "subtitles",
        "content": "Open the subtitles menu in the player toolbar to see all available subtitle tracks — ones embedded in the video file and any provided by subtitle addons you've installed. Tap a track to switch to it, or tap Off to disable subtitles. In Settings → Subtitles you can set a preferred language so subtitles in that language turn on automatically. You can also adjust the text size, colour, and outline there."
      },
      {
        "title": "Audio tracks",
        "anchor": "audio-tracks",
        "content": "If a video has multiple audio tracks — different languages, commentary, etc. — the audio menu in the player toolbar lets you switch between them."
      },
      {
        "title": "Auto-play next episode",
        "anchor": "auto-play-next-episode",
        "content": "When an episode ends, Fluxa can automatically start the next one after a short countdown. A card appears in the corner showing what's coming up — you can dismiss it to stay on the current episode or tap Play Now to skip the countdown. Turn this on or off in Settings → Playback → Auto-play Next Episode ."
      },
      {
        "title": "Skip intro and recap",
        "anchor": "skip-intro-and-recap",
        "content": "Fluxa can detect intro and recap segments for many shows and display a Skip button at the right moment. Tap it to jump past the segment, or ignore it and it disappears on its own when the segment ends. Both can be turned on or off in Settings → Playback."
      }
    ]
  },
  {
    "page": "playback-advanced.html",
    "pageTitle": "Playback Advanced",
    "sections": [
      {
        "title": "mpv options",
        "anchor": "mpv-options",
        "content": "Desktop builds use mpv under the hood. Advanced users can pass raw mpv options through Settings -> Playback -> MPV Options. video-sync=display-resample hwdec=auto-safe sub-font-size=44 Use mpv options carefully. Invalid options can break playback until removed."
      },
      {
        "title": "Hardware decoding",
        "anchor": "hardware-decoding",
        "content": "Hardware decoding can reduce CPU usage, especially for 4K, H.265/HEVC, and AV1. If playback stutters or shows a black screen, try a different source first, then adjust decoder settings."
      },
      {
        "title": "HDR and Dolby Vision",
        "anchor": "hdr-dolby-vision",
        "content": "HDR or Dolby Vision files can look washed out on unsupported screens. Try a non-HDR source, adjust Dolby Vision fallback, or use a display that supports the format."
      },
      {
        "title": "External player setup",
        "anchor": "external-player",
        "content": "If internal playback does not fit your setup, set the default player to an external app in Settings -> Playback. Fluxa will pass the selected stream URL to that player."
      },
      {
        "title": "Subtitle styling",
        "anchor": "subtitles-advanced",
        "content": "Use Settings -> Subtitles for preferred language, text color, outline color, opacity, and size. If characters look wrong, try another track from a subtitle addon."
      }
    ]
  },
  {
    "page": "library-collections.html",
    "pageTitle": "Library & Collections",
    "sections": [
      {
        "title": "My List",
        "anchor": "my-list",
        "content": "On any title's detail page, there's an Add to Library button. Tap it and that title is saved to your watchlist, visible in the Library screen under My List . Tap again to remove it. If you have Trakt, MAL, or Simkl connected, adding or removing a title from your list updates those services automatically too."
      },
      {
        "title": "Continue Watching",
        "anchor": "continue-watching",
        "content": "Fluxa saves your playback position every time you watch something. The Continue Watching row at the top of the home screen and Library screen shows everything you've started but not finished, with a progress bar on each poster. Tap one to pick up right where you left off. Once you finish something — roughly the last ten percent of a movie or episode — it gets marked as watched and leaves Continue Watching. For a series, the next episode moves into your queue automatically."
      },
      {
        "title": "Collections",
        "anchor": "collections",
        "content": "Collections are a way to build your own curated sections inside Fluxa. Each collection shows up as a tab in the Library screen, and you can optionally pin one to the top of your home screen so it always stays visible. A collection is made up of folders . Each folder is backed by a catalog from one of your addons, so the content stays live and up to date — it's not a static list of titles you've hand-picked. Creating a collection Tap + New Collection in the Library screen. Give it a name, optionally add a cover image, and decide whether you want it pinned above Continue Watching on the home screen. Then add folders to it. Adding folders Inside a collection, tap Add folder . Each folder needs a name and a catalog — you pick the catalog from your installed addons. You can also filter the catalog to a specific genre if you only want to see action movies or romance anime, for example. You can also choose how the posters look: Poster (tall, portrait-style), Square , or Wide (landscape). A collection can hold up to ten folders. Backing up and sharing collections You can export your collections as a file from the Advanced section of the collection editor, and import them back later or on a"
      }
    ]
  },
  {
    "page": "collections-cookbook.html",
    "pageTitle": "Collections Cookbook",
    "sections": [
      {
        "title": "Seasonal anime collection",
        "anchor": "seasonal-anime",
        "content": "Create a collection called Seasonal Anime. Add folders for currently airing, popular, and completed anime catalogs. Use poster layout for title browsing. Connect MyAnimeList or Simkl if you want tracking."
      },
      {
        "title": "Kids profile collection",
        "anchor": "kids-profile",
        "content": "Create a separate profile. Install only addons and catalogs appropriate for that profile. Create collections by age range or genre. Keep account connections separate from adult profiles."
      },
      {
        "title": "Top-rated movies row",
        "anchor": "top-rated-movies",
        "content": "Create a Movies collection. Add a folder from a top-rated movie catalog. Filter by genre if needed. Pin it near the top of Home for quick access."
      },
      {
        "title": "Export and import examples",
        "anchor": "sharing-json",
        "content": "Use export when moving collections between devices or profiles. Review imported JSON before saving if you received it from someone else."
      }
    ]
  },
  {
    "page": "debrid-usenet-setup.html",
    "pageTitle": "Debrid & Usenet Setup",
    "sections": [
      {
        "title": "Generic setup flow",
        "anchor": "setup-flow",
        "content": "Create an account with the provider you choose. Find the provider API key or credentials in its dashboard. Open the stream addon's configuration page. Paste the key, choose quality filters, and save. Install the generated manifest URL in Fluxa."
      },
      {
        "title": "Cached vs uncached",
        "anchor": "cached-vs-uncached",
        "content": "Cached means the provider already has the file and can stream immediately. Uncached means the provider needs to fetch it first, which can take time or fail if the source is weak."
      },
      {
        "title": "Direct stream vs torrent",
        "anchor": "direct-vs-torrent",
        "content": "Debrid and some Usenet integrations convert source references into direct HTTP streams. Direct streams usually start faster and avoid peer-swarm reliability problems."
      },
      {
        "title": "Provider neutrality",
        "anchor": "provider-neutrality",
        "content": "Fluxa does not require a specific provider. Choose based on addon support, region, price, reliability, and your own needs."
      }
    ]
  },
  {
    "page": "data-locations.html",
    "pageTitle": "Data Locations",
    "sections": [
      {
        "title": "Desktop paths",
        "anchor": "desktop-paths",
        "content": "Platform Typical path Windows %APPDATA%\\fluxa-desktop macOS ~/Library/Application Support/fluxa-desktop Linux ~/.local/share/fluxa-desktop"
      },
      {
        "title": "Android storage",
        "anchor": "android-storage",
        "content": "Android app data is managed by Android. Normal users should use Nuvio sync or in-app export flows instead of manually editing app storage."
      },
      {
        "title": "Backup and restore",
        "anchor": "backup-restore",
        "content": "Close Fluxa fully. Copy the app data folder for your platform. Install Fluxa on the new device. Close Fluxa, replace the new data folder with your backup, then reopen. For collections only, use collection export/import instead of copying the whole app data folder."
      },
      {
        "title": "When to use Nuvio instead",
        "anchor": "when-to-use-nuvio",
        "content": "Use Nuvio when you want ongoing sync between devices. Use manual backups when moving one installation or saving a snapshot before risky changes."
      }
    ]
  },
  {
    "page": "updates-releases.html",
    "pageTitle": "Updates & Releases",
    "sections": [
      {
        "title": "Official downloads",
        "anchor": "official-downloads",
        "content": "Use the official GitHub releases linked from the Fluxa site. Avoid re-uploaded installers from third-party mirrors unless you know and trust the distributor."
      },
      {
        "title": "Per-platform updates",
        "anchor": "per-platform",
        "content": "Platform Update method Windows Download and run the latest installer, or use in-app update if available. macOS Replace the app from the latest DMG, then approve Gatekeeper if prompted. Linux Install the new DEB/RPM/AppImage package for your distro. Android Install the latest APK from the official release page."
      },
      {
        "title": "Verify your version",
        "anchor": "verify-version",
        "content": "Check the app version in Settings. If you report a bug, include the version number, platform, install package type, and whether the issue started after an update."
      },
      {
        "title": "After a bad update",
        "anchor": "bad-update",
        "content": "Restart the app and your device. Install the latest patch release if one exists. Temporarily disable recently added addons. Back up data before trying a downgrade. Open a GitHub issue with logs and your platform details."
      }
    ]
  },
  {
    "page": "platform-install.html",
    "pageTitle": "Platform Install Notes",
    "sections": [
      {
        "title": "Windows",
        "anchor": "windows",
        "content": "Use the EXE installer from the release page. If Windows SmartScreen appears, confirm the publisher/source and choose to run anyway only if you downloaded from the official release. Uninstall from Windows Settings like any other app. App data may remain unless you remove it manually."
      },
      {
        "title": "macOS",
        "anchor": "macos",
        "content": "Open the DMG and drag Fluxa into Applications. If macOS blocks first launch, go to System Settings -> Privacy & Security and choose Open Anyway for Fluxa."
      },
      {
        "title": "Linux",
        "anchor": "linux",
        "content": "Use DEB for Debian/Ubuntu, RPM for Fedora/RHEL, or AppImage for portable use. If video output is black, test Wayland vs X11 and see the playback troubleshooting notes."
      },
      {
        "title": "Android",
        "anchor": "android",
        "content": "Download the APK from official releases. Android may ask for permission to install unknown apps for your browser or file manager. Disable that permission again after installing if you prefer a stricter setup."
      }
    ]
  },
  {
    "page": "recommended-settings.html",
    "pageTitle": "Recommended Settings",
    "sections": [
      {
        "title": "Low-end devices",
        "anchor": "low-end-devices",
        "content": "Prefer 720p or 1080p H.264 sources. Reduce buffer cache if memory is limited. Disable addons you rarely use. Avoid heavy HDR or AV1 sources if decoding stutters."
      },
      {
        "title": "4K and HDR",
        "anchor": "4k-hdr",
        "content": "Prefer direct or cached sources. Use wired or strong Wi-Fi. Check Dolby Vision fallback if colors look wrong. Keep hardware decoding enabled if stable."
      },
      {
        "title": "Slow internet",
        "anchor": "slow-internet",
        "content": "Use manual source selection and choose smaller files. Prefer 720p/1080p over 4K. Increase forward buffer if available. Avoid uncached torrents."
      },
      {
        "title": "Anime",
        "anchor": "anime",
        "content": "Connect MyAnimeList or Simkl for progress tracking. Enable preferred subtitle language. Enable skip intro and recap if detection works well for your sources. Create seasonal anime collections."
      }
    ]
  },
  {
    "page": "settings.html",
    "pageTitle": "Settings",
    "sections": [
      {
        "title": "General",
        "anchor": "general",
        "content": "Setting What it does Language Changes the language of the app's interface and catalog labels. Start Page Which screen opens first after you choose a profile — Home, Search, Library, or Discover. Show Hero Section Turns the large featured banner at the top of the Home screen on or off. Notifications Allows Fluxa to send notifications on your device. New episode alerts Sends a notification when a new episode drops for a show in your watchlist. Check for updates Shows your current version and lets you update the app from inside Fluxa."
      },
      {
        "title": "Appearance",
        "anchor": "appearance",
        "content": "Setting What it does Accent Color The highlight colour used for buttons and active states throughout the app. Home Catalogs Choose which catalog rows appear on the Home screen and set their order. Top 10 Catalogs Select which rows show large ranking numbers (1–10) on their posters. Hero Catalogs Choose which catalogs supply content to the large featured banner."
      },
      {
        "title": "Playback",
        "anchor": "playback",
        "content": "Setting What it does Stream Source Selection Manual shows you a list of sources to pick from. Auto picks immediately. Regex lets you set a pattern to match automatically. Regex Pattern The pattern used in Regex mode. For example: 1080p to always pick 1080p sources first. Default Player Use Fluxa's built-in player or open streams in an external app. Resume Playback When you reopen something you've already started, jump straight to where you left off. Auto-play Next Episode Automatically starts the next episode when the current one finishes. Countdown Duration How long the auto-play countdown shows before the next episode starts. Playback Speed The default speed for all videos. 1.0 is normal. Skip Amount How far the forward and back buttons jump. Default is 10 seconds. Hold to Speed Up When held, the video plays faster. Releases back to normal speed when you let go. Hold Speed How fast the video plays while holding. Skip Intro Shows a Skip Intro button when an intro segment is detected. Skip Recap Shows a Skip Recap button for anime content. MPV Options Advanced: raw options passed to the video player. One per line. Ignore this unless you know what you're doing. Scripts Directory Adv"
      },
      {
        "title": "Buffer & Cache",
        "anchor": "buffer-and-cache",
        "content": "Setting What it does Buffer Cache How much memory Fluxa can use to pre-load video data. Forward Buffer How many seconds ahead the player tries to keep ready. Back Buffer How many seconds behind your current position you can seek back to instantly."
      },
      {
        "title": "Subtitles",
        "anchor": "subtitles",
        "content": "Setting What it does Preferred Language Automatically enables subtitle tracks in this language when available. Font Size How big the subtitle text appears on screen. Outline Colour The colour of the shadow behind the text. Outline Opacity How visible the shadow is. Text Colour The colour of the subtitle text itself."
      },
      {
        "title": "Metadata",
        "anchor": "metadata",
        "content": "Setting What it does TMDB API Key Optional. Supplements your addons with additional cast photos, trailers, and recommendations from The Movie Database when your addons don't already provide them. Free to get at themoviedb.org. Cast Images Show actor photos on detail pages. Trailers Show a trailer on the detail page. Recommendations Show \"You may also like\" on the detail page. Similar Titles Show a \"Similar\" row on the detail page. Episode Images Show thumbnail images for individual episodes. Logos & Backdrops Use high-quality title logos and backdrop images where available."
      },
      {
        "title": "Decoder",
        "anchor": "decoder",
        "content": "These are advanced options for video quality and compatibility. Most people won't need to touch them. Setting What it does FFmpeg Audio Decoder Use an alternative audio decoder. Try this if you're getting no audio or distorted audio with certain files. Dolby Vision Fallback How to handle Dolby Vision video on hardware that doesn't fully support it. Auto is usually fine."
      },
      {
        "title": "Account",
        "anchor": "account",
        "content": "This is where you connect and manage Nuvio, Trakt, MyAnimeList, and Simkl. See the Sync & Accounts guide for details on each."
      },
      {
        "title": "Addons",
        "anchor": "addons",
        "content": "Install new addons by pasting a manifest URL, remove ones you don't use, drag to reorder them, or toggle individual addons on and off. See Addons & Catalogs for more."
      }
    ]
  },
  {
    "page": "keyboard-shortcuts.html",
    "pageTitle": "Keyboard Shortcuts",
    "sections": [
      {
        "title": "Docs shortcuts",
        "anchor": "docs-shortcuts",
        "content": "Shortcut Action / Focus docs search. Esc Close search and clear focus."
      },
      {
        "title": "Playback shortcuts",
        "anchor": "playback-shortcuts",
        "content": "Shortcut Action Space Play or pause. Left Arrow Seek back by the configured skip amount. Right Arrow Seek forward by the configured skip amount. Up/Down Adjust volume when supported. F Toggle fullscreen."
      },
      {
        "title": "Notes",
        "anchor": "notes",
        "content": "Keyboard behavior can differ if focus is inside a text input, menu, browser view, or external player. External players use their own shortcut map."
      }
    ]
  },
  {
    "page": "troubleshooting.html",
    "pageTitle": "Troubleshooting",
    "sections": [
      {
        "title": "Fast triage",
        "anchor": "fast-triage",
        "content": "Empty Home Cause: no active catalog addons. Fix: install or enable an addon and confirm Home Catalog rows are visible. No sources Cause: no stream addon returned a result. Fix: install a stream addon or try another title/source. Playback fails Cause: source server, torrent health, or file issue. Fix: switch source from the player. Sync stopped Cause: expired token or account connection issue. Fix: disconnect and reconnect the service."
      },
      {
        "title": "Nothing plays when I press Play",
        "anchor": "nothing-plays-when-i-press-play",
        "content": "This usually means none of your stream addons returned a source for that title. Check that you have at least one addon installed that provides streams — not just catalog addons. Verify your internet connection is working. You can test an addon by opening its link directly in a browser; if you get an error page, the addon's server may be down or the link may have changed."
      },
      {
        "title": "Playback stops or says \"try another source\"",
        "anchor": "playback-stops-or-says-try-another-source",
        "content": "The stream you picked ran into a problem — the file may have moved, the server returned an error, or there were too few people sharing the torrent. Tap the source button in the player and pick a different one. Most titles have multiple sources across different addons."
      },
      {
        "title": "Torrents are stuck loading for a long time",
        "anchor": "torrents-are-stuck-loading-for-a-long-time",
        "content": "Torrent playback needs enough active peers to start quickly. If it's been on \"loading\" or \"preloading\" for more than a couple of minutes, the torrent likely has very few people sharing it. Switch to a different stream source — ideally a direct link from another addon rather than another torrent of the same file. Some networks (work networks, certain ISPs) block torrent traffic entirely. If torrents never work for you but direct links do, that's likely the cause. A VPN sometimes helps in this case."
      },
      {
        "title": "The home screen is empty",
        "anchor": "the-home-screen-is-empty",
        "content": "You either haven't installed any addons yet, or all your installed addons are disabled or unreachable. Go to Settings → Addons and confirm at least one is installed and switched on. Also check Settings → Home Catalogs to make sure some rows are enabled — all rows being hidden will also produce an empty home screen."
      },
      {
        "title": "Video is choppy or stuttering",
        "anchor": "video-is-choppy-or-stuttering",
        "content": "Try switching to a different stream source — some sources have more reliable connections than others. Check your internet speed. If the problem persists across sources, try lowering the buffer cache in Settings → Buffer & Cache , or experiment with decoder settings in Settings → Decoder . On lower-end hardware, H.265/HEVC or AV1 streams may stutter while H.264 ones play fine."
      },
      {
        "title": "No audio during playback",
        "anchor": "no-audio-during-playback",
        "content": "First check your system volume and the player's volume slider. If the system audio is working but the player is silent, open the audio track menu in the player toolbar and check if a different track is available. Enabling FFmpeg Audio Decoder in Settings → Decoder fixes audio for some file types that the default decoder doesn't handle correctly."
      },
      {
        "title": "Subtitles aren't showing up automatically",
        "anchor": "subtitles-aren-t-showing-up-automatically",
        "content": "Check Settings → Subtitles and confirm a preferred language is set. If it is and subtitles still don't appear, the title may not have a track in that language available from your addons or embedded in the file. Open the subtitle menu in the player to see what's available and pick one manually."
      },
      {
        "title": "Subtitle text is garbled or showing wrong characters",
        "anchor": "subtitle-text-is-garbled-or-showing-wrong-characters",
        "content": "This usually affects older subtitle formats like SRT with non-Latin text. If multiple subtitle tracks are available, try switching to a different one — external subtitle addons sometimes have better-encoded versions. There's no encoding fix built in, so a different track is the most reliable solution."
      },
      {
        "title": "Cast photos and trailers don't appear on detail pages",
        "anchor": "cast-photos-and-trailers-don-t-appear-on-detail-pages",
        "content": "Cast photos and trailers can come from your installed metadata addons — many addons include this information. If your current addons don't provide them, you can add a free TMDB API key in Settings → Metadata for additional data from The Movie Database. Get a key at themoviedb.org ."
      },
      {
        "title": "Sync with Trakt / MAL / Simkl stopped working",
        "anchor": "sync-with-trakt-mal-simkl-stopped-working",
        "content": "The connection token may have expired. Go to Settings → Account , disconnect the service, and reconnect it. The sign-in flow opens in your browser just like when you first connected. Your data stays on the service — only the connection to Fluxa is reset."
      },
      {
        "title": "After signing in to a tracking service, I wasn't sent back to Fluxa",
        "anchor": "after-signing-in-to-a-tracking-service-i-wasn-t-sent-back-to-fluxa",
        "content": "This happens when the callback link that sends you back to Fluxa isn't registered with your operating system. On Windows and macOS this registers automatically when you install Fluxa. On Linux, reinstalling or running Fluxa once from the terminal usually fixes it. If it keeps happening, try the sign-in flow again — a second attempt sometimes works after the system has registered the protocol handler."
      },
      {
        "title": "Episode numbers are wrong for some shows",
        "anchor": "episode-numbers-are-wrong-for-some-shows",
        "content": "Different addons sometimes use different numbering conventions, which is especially common with anime that aired as split-cour seasons. The catalog addon (which shows the episode list) and the stream addon (which provides the video) may be counting episodes differently. Try a different stream addon for that title and see if the numbers align better."
      },
      {
        "title": "Continue Watching shows the wrong position",
        "anchor": "continue-watching-shows-the-wrong-position",
        "content": "Clear the progress for that title by opening its detail page and marking it as unwatched, then start fresh. If Nuvio or another sync service is active, the wrong position may have been pushed from another device."
      },
      {
        "title": "Search returns no results",
        "anchor": "search-returns-no-results",
        "content": "Not all catalog addons support search — some only provide home screen rows. Make sure at least one of your installed addons supports search. If you're certain it should work, try a broader search term, and check that the addon is reachable by opening its link in a browser."
      },
      {
        "title": "The calendar shows the wrong times for episodes",
        "anchor": "the-calendar-shows-the-wrong-times-for-episodes",
        "content": "Fluxa converts episode air times to your local timezone automatically — there's no setting to toggle. If times still look off, it's most likely the addon itself reporting the wrong air time or date for that episode rather than a timezone issue. Try a different catalog addon for that show if it has one, or check the episode's air time on the addon's own site."
      },
      {
        "title": "App crashes on startup or won't open",
        "anchor": "app-crashes-on-startup-or-won-t-open",
        "content": "Try reinstalling the latest version from the releases page. If the crash happens after an update, check the GitHub issues page to see if others are reporting the same thing."
      },
      {
        "title": "App is slow to start or takes a long time to load",
        "anchor": "app-is-slow-to-start-or-takes-a-long-time-to-load",
        "content": "Startup slowness is usually caused by having many addons installed where some take a long time to respond. Go to Settings → Addons and disable any addons you rarely use. You can identify the slow one by disabling them one at a time and seeing which removal makes startup faster."
      },
      {
        "title": "App is using too much memory or CPU",
        "anchor": "app-is-using-too-much-memory-or-cpu",
        "content": "Disable addons you don't use regularly — each active addon is polled at startup and during browsing. Lower the buffer cache in Settings → Buffer & Cache if memory usage is high during playback. If CPU is spiking during video, the current stream may be using a codec your hardware struggles to decode — try switching to an H.264 source if available."
      },
      {
        "title": "Video plays but colours look washed out or wrong",
        "anchor": "video-plays-but-colours-look-washed-out-or-wrong",
        "content": "This typically happens with HDR or Dolby Vision content on a monitor that doesn't support it. Try changing Dolby Vision Fallback in Settings → Decoder — the available options handle the conversion differently, and one may look better than others on your display."
      },
      {
        "title": "Nuvio sync isn't working",
        "anchor": "nuvio-sync-isn-t-working",
        "content": "Check your internet connection first. Go to Settings → Account and check the Nuvio status — it will show if there's a problem. Signing out and back in usually resolves temporary issues."
      },
      {
        "title": "macOS says Fluxa is damaged and can't be opened",
        "anchor": "macos-says-fluxa-is-damaged-and-can-t-be-opened",
        "content": "This is a macOS security prompt for apps downloaded outside the App Store. Go to System Settings → Privacy & Security , scroll down to where it mentions Fluxa, and click Open Anyway . You only need to do this once."
      },
      {
        "title": "On Linux, the video window is black",
        "anchor": "on-linux-the-video-window-is-black",
        "content": "This is almost always a GPU driver or video output issue. Make sure your GPU drivers are up to date (especially on AMD/Intel with Mesa, or proprietary NVIDIA drivers). If you're on Wayland, try switching your session to X11 (or vice versa) to see if that resolves it. You can also try a different video output by setting vo=x11 or vo=xv in Settings → Playback → MPV Options as a fallback if hardware-accelerated rendering isn't working on your system. Still stuck? Open an issue on GitHub with your OS, Fluxa version (Settings → Advanced → Version), and a description of what happened."
      }
    ]
  },
  {
    "page": "troubleshooting-flows.html",
    "pageTitle": "Troubleshooting Flows",
    "sections": [
      {
        "title": "Home is empty",
        "anchor": "home-empty",
        "content": "Check Settings -> Addons: is at least one catalog addon installed and enabled? Check Settings -> Home Catalogs: are rows hidden? Open the manifest URL in a browser: does it load? Try another catalog addon to separate app issues from addon downtime."
      },
      {
        "title": "No streams",
        "anchor": "no-streams",
        "content": "Confirm you installed a stream addon, not only a catalog addon. Try a popular title to rule out niche title coverage. Check addon configuration for required API keys. Try another stream addon."
      },
      {
        "title": "Video buffers or stops",
        "anchor": "video-buffers",
        "content": "Switch to a different source from the player. Prefer direct/debrid sources over weak torrents when available. Lower quality from 4K to 1080p. Check network speed and VPN behavior."
      },
      {
        "title": "Sync missing data",
        "anchor": "sync-missing",
        "content": "Confirm the correct profile is active. Check account connection status. Wait for both devices to come online. Sign out and back in if status looks stale."
      },
      {
        "title": "Login callback failed",
        "anchor": "callback-failed",
        "content": "Retry the sign-in flow once. Make sure Fluxa is installed, not just unpacked temporarily. On Linux, run the installed app once from your app launcher or terminal. Reinstall if protocol links still do not return to Fluxa."
      }
    ]
  },
  {
    "page": "glossary.html",
    "pageTitle": "Glossary",
    "sections": [
      {
        "title": "Addon terms",
        "anchor": "addon-terms",
        "content": "Term Meaning Addon Remote service that provides catalogs, metadata, streams, or subtitles. Manifest JSON document that describes an addon and its capabilities. Catalog A row or browsable list of titles. Metadata Details like poster, synopsis, cast, trailers, episodes, and artwork. Stream A playable source result returned after pressing Play."
      },
      {
        "title": "Source terms",
        "anchor": "source-terms",
        "content": "Term Meaning Debrid Provider that converts supported links or torrents into fast direct streams. Usenet Provider/indexer ecosystem that can supply fast media sources. Cached Provider already has the file ready to stream. Remux High-quality source with little or no extra compression. WEB-DL Video sourced directly from a streaming service."
      },
      {
        "title": "App terms",
        "anchor": "app-terms",
        "content": "Term Meaning Profile Separate user space with its own library, addons, settings, and accounts. Library Saved titles, continue watching, collections, and related history. Sync Optional cross-device or third-party account update flow."
      }
    ]
  },
  {
    "page": "known-limitations.html",
    "pageTitle": "Known Limitations",
    "sections": [
      {
        "title": "No hosted content",
        "anchor": "no-hosted-content",
        "content": "Fluxa does not host, bundle, or provide media. Content availability depends entirely on the addons you install."
      },
      {
        "title": "Addon reliability",
        "anchor": "addon-reliability",
        "content": "Addons are third-party services. They can change, go offline, rate-limit, return incomplete data, or stop supporting a provider without Fluxa changing."
      },
      {
        "title": "Offline use",
        "anchor": "offline-use",
        "content": "Fluxa can open locally and show existing local state, but watching requires network access because streams come from online sources. Offline downloads are not currently supported."
      },
      {
        "title": "Platform differences",
        "anchor": "platform-differences",
        "content": "Desktop and Android aim for feature parity, but playback behavior can vary because hardware decoding, OS permissions, and video output systems differ by platform."
      }
    ]
  },
  {
    "page": "faq.html",
    "pageTitle": "FAQ",
    "sections": [
      {
        "title": "Overview",
        "anchor": "",
        "content": "FAQ Answers to the most common questions. Is Fluxa free? ▾ Yes. Fluxa is completely free to download and use. The optional third-party services you can connect — Trakt, MyAnimeList, Simkl, Nuvio — are separate products with their own accounts and pricing. Fluxa itself has no subscription or paid features. Is it legal? ▾ Fluxa itself is a legal, open-source app. It doesn't host or provide any content. What you can actually watch depends entirely on the addons you install — Fluxa has no control over what addon developers make available. You're responsible for the addons you use and the content you access through them. Do I need to create an account? ▾ No. Fluxa works completely without any account. Trakt, MAL, Simkl, and Nuvio are all optional third-party services — you can connect any or no"
      }
    ]
  },
  {
    "page": "contributing-docs.html",
    "pageTitle": "Contributing Docs",
    "sections": [
      {
        "title": "Report docs issues",
        "anchor": "report-issues",
        "content": "Open a GitHub issue with the page URL, the unclear or outdated section, and what you expected it to say. Screenshots are useful when the app UI changed."
      },
      {
        "title": "Writing style",
        "anchor": "writing-style",
        "content": "Prefer task-first headings. Use short paragraphs and concrete steps. Call out platform-specific behavior. Avoid promising that third-party addons or providers will always work. Link related docs instead of repeating long explanations."
      },
      {
        "title": "Screenshots and examples",
        "anchor": "screenshots",
        "content": "Use screenshots when a user needs to match text to UI. Use code blocks for manifest patterns, paths, config snippets, or mpv options. Keep examples generic unless a page is explicitly about a provider."
      }
    ]
  }
];
