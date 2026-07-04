// First-occurrence auto-linking for known services and tools.
// Each term is linked at most once per page, only in body text (never in headings, code, nav, or existing links).

const GLOSSARY = [
  { term: 'Real-Debrid',   url: 'https://real-debrid.com' },
  { term: 'AllDebrid',     url: 'https://alldebrid.com' },
  { term: 'Debrid-Link',   url: 'https://debrid-link.com' },
  { term: 'TorBox',        url: 'https://torbox.app' },
  { term: 'Premiumize',    url: 'https://www.premiumize.me' },
  { term: 'Torrentio',     url: 'https://torrentio.strem.fun' },
  { term: 'Easynews',      url: 'https://www.easynews.com' },
  { term: 'Newshosting',   url: 'https://www.newshosting.com' },
  { term: 'Eweka',         url: 'https://www.eweka.nl' },
  { term: 'UsenetServer',  url: 'https://www.usenetserver.com' },
  { term: 'Trakt',         url: 'https://trakt.tv' },
  { term: 'MyAnimeList',   url: 'https://myanimelist.net' },
  { term: 'Simkl',         url: 'https://simkl.com' },
  { term: 'TMDB',          url: 'https://www.themoviedb.org' },
  { term: 'Letterboxd',    url: 'https://letterboxd.com' },
  { term: 'MDBList',       url: 'https://mdblist.com' },
  { term: 'mpv',           url: 'https://mpv.io' },
];

const BLOCKED_TAGS = new Set(['a', 'code', 'pre', 'h1', 'h2', 'h3', 'h4', 'button', 'nav', 'script', 'style']);

function linkifyTerms(root) {
  const linked = new Set();

  function walk(node) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      if (BLOCKED_TAGS.has(node.tagName.toLowerCase())) return;
      Array.from(node.childNodes).forEach(walk);
    } else if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim()) {
      let best = null;
      for (const { term, url } of GLOSSARY) {
        if (linked.has(term)) continue;
        const idx = node.nodeValue.indexOf(term);
        if (idx === -1) continue;
        if (!best || idx < best.idx) best = { term, url, idx };
      }
      if (!best) return;

      linked.add(best.term);

      const before = node.nodeValue.slice(0, best.idx);
      const afterText = node.nodeValue.slice(best.idx + best.term.length);
      const frag = document.createDocumentFragment();

      if (before) frag.appendChild(document.createTextNode(before));

      const a = document.createElement('a');
      a.href = best.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.className = 'glossary-link';
      a.textContent = best.term;
      frag.appendChild(a);

      const afterNode = afterText ? document.createTextNode(afterText) : null;
      if (afterNode) frag.appendChild(afterNode);

      node.parentNode.replaceChild(frag, node);
      if (afterNode) walk(afterNode);
    }
  }

  walk(root);
}

document.addEventListener('DOMContentLoaded', () => {
  const content = document.querySelector('.content');
  if (content) linkifyTerms(content);
});
