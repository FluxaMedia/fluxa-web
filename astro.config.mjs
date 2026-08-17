import { defineConfig } from 'astro/config';
import remarkDirective from 'remark-directive';
import { remarkFluxaDirectives, remarkBaseLinks } from './src/plugins/remark-fluxa.mjs';

export default defineConfig({
  site: 'https://fluxamedia.github.io',
  base: '/fluxa-docs-web',
  trailingSlash: 'ignore',
  markdown: {
    remarkPlugins: [remarkDirective, remarkFluxaDirectives, remarkBaseLinks],
    shikiConfig: { theme: 'github-dark-default', wrap: true },
  },
});
