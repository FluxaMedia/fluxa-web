import { execFileSync } from 'node:child_process';
import { statSync } from 'node:fs';

const cache = new Map<string, string>();

export function lastUpdated(file: string): string {
  if (cache.has(file)) return cache.get(file)!;
  let date = '';
  try {
    date = execFileSync('git', ['log', '-1', '--format=%cs', '--', file], { encoding: 'utf8' }).trim();
  } catch {}
  if (!date) {
    try { date = statSync(file).mtime.toISOString().slice(0, 10); } catch {}
  }
  cache.set(file, date);
  return date;
}
