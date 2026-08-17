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
