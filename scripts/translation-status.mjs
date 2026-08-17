import { execFileSync } from 'node:child_process';
import { readdirSync, existsSync } from 'node:fs';

const ROOT = 'src/content/docs';
const DEFAULT_LOCALE = 'en';

const commitDate = file => {
  try {
    return execFileSync('git', ['log', '-1', '--format=%cs', '--', file], { encoding: 'utf8' }).trim();
  } catch {
    return '';
  }
};

const locales = readdirSync(ROOT, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name)
  .filter(name => name !== DEFAULT_LOCALE);

const sources = readdirSync(`${ROOT}/${DEFAULT_LOCALE}`).filter(f => f.endsWith('.md'));

if (!locales.length) {
  console.log('No translations yet. Create src/content/docs/<locale>/ to start one.');
  process.exit(0);
}

let stale = 0;

for (const locale of locales) {
  const missing = [];
  const outdated = [];
  let done = 0;

  for (const file of sources) {
    const target = `${ROOT}/${locale}/${file}`;
    if (!existsSync(target)) {
      missing.push(file);
      continue;
    }
    done++;
    if (commitDate(target) < commitDate(`${ROOT}/${DEFAULT_LOCALE}/${file}`)) outdated.push(file);
  }

  const percent = Math.round((done / sources.length) * 100);
  console.log(`\n${locale}  ${done}/${sources.length} pages (${percent}%)`);

  if (outdated.length) {
    console.log(`  needs update (${outdated.length}):`);
    for (const file of outdated) console.log(`    ${file}`);
    stale += outdated.length;
  }
  if (missing.length) {
    console.log(`  not translated (${missing.length}):`);
    for (const file of missing) console.log(`    ${file}`);
  }
}

if (process.argv.includes('--strict') && stale) {
  console.error(`\n${stale} translated page(s) older than their English source.`);
  process.exit(1);
}
