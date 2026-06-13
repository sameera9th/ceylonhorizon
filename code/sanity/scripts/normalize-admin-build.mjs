import { readFile, writeFile } from 'node:fs/promises'

const indexPath = new URL('../dist/index.html', import.meta.url)
const indexHtml = await readFile(indexPath, 'utf8')
const normalizedHtml = indexHtml.replaceAll('="/static/', '="/admin/static/')

if (normalizedHtml.includes('/admin/admin/')) {
  throw new Error('Sanity build contains a duplicated /admin base path')
}

if (normalizedHtml.includes('="/static/')) {
  throw new Error('Sanity build still contains root-relative static asset paths')
}

await writeFile(indexPath, normalizedHtml)
