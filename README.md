# fluxa-docs-web

Landing page, documentation, and account control panel for [Fluxa](https://github.com/FluxaMedia/fluxa-desktop),
built with [Astro](https://astro.build) and deployed to GitHub Pages.

## Layout

```
src/content/docs/     documentation pages (Markdown)
src/pages/            landing page, docs home, account panel, search index endpoint
src/components/       topbar, sidebar, on-this-page rail
src/layouts/          docs page shell
src/plugins/          Markdown directives for callouts, FAQ blocks, card grids
public/               static assets, stylesheets, account panel scripts
```

The sidebar, search index, previous/next links, and "Updated" dates are all derived from the Markdown
files at build time. There is no list of pages to keep in sync by hand.

## Development

```bash
npm install
npm run dev      # local server with live reload
npm run build    # static output in dist/
npm run preview  # serve the built output
```

## Editing documentation

See [CONTRIBUTING.md](CONTRIBUTING.md). In short: every page is a Markdown file in `src/content/docs/`,
and adding one is enough for it to appear in the sidebar and in search.

## Deployment

Pushing to `master` triggers `.github/workflows/deploy.yml`, which builds the site and publishes it to
GitHub Pages. The workflow checks out full history because the "Updated" date on each page comes from
`git log`.

The site is configured for a project page at `/fluxa-docs-web`. If you move it to a custom domain,
drop `base` from `astro.config.mjs` and delete the fallback in `src/plugins/remark-fluxa.mjs`.
