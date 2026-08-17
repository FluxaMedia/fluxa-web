import { visit } from 'unist-util-visit';

const CALLOUT_ICONS = { info: 'info', warning: 'alert-triangle', tip: 'lightbulb', note: 'info' };

const CARD_GRIDS = {
  cards: ['quick-grid', 'quick-card'],
  doccards: ['doc-card-grid', 'doc-card'],
  taskcards: ['task-grid', 'task-card'],
};

function html(node, value) {
  node.type = 'html';
  node.value = value;
  delete node.children;
}

function label(node) {
  const first = node.children[0];
  if (first && first.data && first.data.directiveLabel) {
    node.children.shift();
    return first.children.map(c => c.value ?? '').join('');
  }
  return '';
}

export function remarkFluxaDirectives() {
  return tree => {
    visit(tree, node => {
      if (node.type !== 'containerDirective') return;

      if (node.name === 'faq') {
        const q = label(node);
        node.data = { hName: 'div', hProperties: { className: ['faq-item'] } };
        node.children = [
          { type: 'html', value: `<button class="faq-q" type="button">${q}<span class="ch"></span></button><div class="faq-a">` },
          ...node.children,
          { type: 'html', value: '</div>' },
        ];
        return;
      }

      if (CARD_GRIDS[node.name]) {
        const [gridClass, cardClass] = CARD_GRIDS[node.name];
        const list = node.children.find(c => c.type === 'list');
        const cards = (list ? list.children : []).map(item => {
          const para = item.children[0];
          const link = para.children.find(c => c.type === 'link');
          if (!link) return '';
          const title = link.children.map(c => c.value ?? '').join('');
          const rest = para.children
            .slice(para.children.indexOf(link) + 1)
            .map(c => c.value ?? '')
            .join('')
            .replace(/^\s*[—-]\s*/, '');
          return `<a class="${cardClass}" href="${link.url}"><strong>${title}</strong><span>${rest}</span></a>`;
        });
        html(node, `<div class="${gridClass}">${cards.join('')}</div>`);
        return;
      }

      if (node.name === 'note') {
        node.data = { hName: 'div', hProperties: { className: ['note'] } };
        return;
      }

      if (CALLOUT_ICONS[node.name]) {
        node.data = { hName: 'div', hProperties: { className: ['callout', `callout-${node.name}`] } };
        node.children = [
          { type: 'html', value: `<i data-lucide="${CALLOUT_ICONS[node.name]}"></i><div>` },
          ...node.children,
          { type: 'html', value: '</div>' },
        ];
      }
    });
  };
}

const DEFAULT_LOCALE = 'en';

export function remarkBaseLinks() {
  const base = (process.env.BASE_URL ?? '/fluxa-docs-web').replace(/\/$/, '');
  return (tree, file) => {
    const match = (file.path ?? '').replace(/\\/g, '/').match(/\/content\/(?:docs|home)\/([^/]+)/);
    const locale = match ? match[1].replace(/\.md$/, '') : DEFAULT_LOCALE;
    const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

    visit(tree, 'link', node => {
      if (!node.url.startsWith('/') || node.url.startsWith('//')) return;
      if (base && node.url.startsWith(base + '/')) return;
      node.url = base + prefix + node.url;
    });
  };
}
