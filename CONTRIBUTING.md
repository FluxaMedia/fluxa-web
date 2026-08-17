# Editing the docs

Every documentation page is a Markdown file in `src/content/docs/`. The file name becomes the URL:
`src/content/docs/playback.md` → `/docs/playback`.

You do not need to touch the sidebar, the search index, or the "on this page" rail. All three are built
from the Markdown files, so adding a page is enough to make it appear everywhere.

## Fixing a typo

Click **Edit this page** at the bottom of any docs page. GitHub opens the file in its editor, and you can
propose the change without cloning anything.

## Frontmatter

Each file starts with a small block of metadata:

```yaml
---
title: "Playback"
description: "How Fluxa plays a stream, and what to change when it does not."
section: "Core workflows"
icon: "play-circle"
order: 3
badges: ["Desktop", "Android", "mpv"]
---
```

| Field | Required | Meaning |
| --- | --- | --- |
| `title` | yes | Page heading and sidebar label |
| `description` | yes | Subtitle under the heading, plus the meta description and search snippet |
| `section` | yes | Sidebar group. One of: Start, How it works, Core workflows, Operations, Reference |
| `icon` | no | Any [Lucide](https://lucide.dev/icons) icon name |
| `order` | no | Position inside the sidebar group, lowest first |
| `badges` | no | Small tags shown under the heading |
| `draft` | no | `true` hides the page from the site and the search index |

The "Updated" date is taken from the last Git commit that touched the file, so it is never stale and you
should not write it by hand.

## Writing

Standard Markdown works: headings, lists, tables, links, `code`, and fenced code blocks with syntax
highlighting.

Use `##` for the main sections of a page. Those are what the right-hand "On this page" rail lists, and
what search results link to, so give them meaningful names.

Link to other docs pages with an absolute path, without the `.md`:

```markdown
See [Troubleshooting](/docs/troubleshooting) or jump to [webOS install](/docs/platform-install#webos).
```

## Callouts

Four highlighted blocks are available:

```markdown
:::note
Plain highlighted paragraph.
:::

:::info
Neutral background information.
:::

:::warning
Something that can break playback or lose data.
:::

:::tip
A shortcut or recommended setting.
:::
```

## FAQ entries

```markdown
:::faq[Do I need to create an account?]
No. Fluxa works completely without any account.
:::
```

Each block renders as one collapsible question. Put them under a normal `##` heading to group them.

## Card grids

For a page that mostly points elsewhere, a list of links inside `:::cards` renders as a grid:

```markdown
:::cards
- [Empty Home](#the-home-screen-is-empty) — Cause: no active catalog addons. Fix: install one.
- [No sources](#nothing-plays) — Cause: no stream addon returned a result.
:::
```

The text after the em dash becomes the card description.

## Adding a new page

1. Create `src/content/docs/your-page.md`.
2. Give it frontmatter with at least `title`, `description`, and `section`.
3. Write the content.

That is all — the sidebar, search, and previous/next links pick it up automatically.

## Previewing locally

```bash
npm install
npm run dev
```

Then open the printed URL. Pages reload as you save.

Before opening a pull request, `npm run build` should finish without errors — it fails on a missing
frontmatter field or an unknown `section`, which catches most mistakes.

# Translating

Documentation lives under `src/content/docs/<locale>/`. English is the source language and is always
complete; every other locale is a partial copy that falls back to English where a page is missing.

## Translating a page

Copy the English file to your locale, keeping the same file name, and translate it:

```bash
cp src/content/docs/en/playback.md src/content/docs/tr/playback.md
```

The file name is the URL, so it must not change: `tr/playback.md` serves `/tr/docs/playback`.

In the frontmatter, translate `title`, `description`, and `badges`. Leave `section`, `icon`, and `order`
exactly as they are — `section` is a key that maps to a translated label, not display text.

```yaml
---
title: "Oynatma"
description: "Fluxa bir akışı nasıl oynatır ve oynatmadığında ne değiştirmelisin."
section: core-workflows   # do not translate
icon: "play-circle"       # do not translate
order: 3                  # do not translate
badges: ["Masaüstü", "Android", "mpv"]
---
```

In the body, translate the prose and the headings. Leave link paths alone — write `/docs/playback` and
the locale prefix is added automatically, so a Turkish page links to `/tr/docs/playback` on its own.
Directive names stay in English (`:::warning`, `:::faq[...]`); only the text inside them is translated.

Heading anchors come from the translated heading text, so a cross-page link to a specific section
(`/docs/platform-install#webos`) resolves against the English heading until that page is translated too.
Translate whole pages rather than half of one, and this stays consistent.

## Checking what needs work

```bash
npm run translations
```

This lists, per locale, how many pages are done, which are missing, and which are **older than their
English source** — those have drifted and need a pass. Pages that have not been translated yet are marked
`EN` in the sidebar and show a notice at the top explaining that the reader is seeing English.

## Adding a new language

1. Add the locale to `LOCALES` and the `strings` table in `src/i18n/ui.ts`. Every key in the English
   block needs a translation; missing keys fall back to English rather than breaking the build.
2. Add the locale code to `locales` in `astro.config.mjs`.
3. Create `src/content/docs/<locale>/` and translate at least one page.
4. Optionally translate the docs landing page by copying `src/content/home/en.md` to
   `src/content/home/<locale>.md`.

The language picker in the top bar, the per-language search index, and the `hreflang` tags are all
generated from that list — there is nothing else to register.
