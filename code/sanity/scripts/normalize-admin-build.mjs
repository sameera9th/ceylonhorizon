import { readdir, readFile, writeFile } from 'node:fs/promises'

const indexPath = new URL('../dist/index.html', import.meta.url)
const manifestPath = new URL('../dist/static/create-manifest.json', import.meta.url)
const staticPath = new URL('../dist/static/', import.meta.url)
const indexHtml = await readFile(indexPath, 'utf8')
const normalizedHtml = indexHtml.replaceAll('="/static/', '="/admin/static/')
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'))
const runtimeFile = (await readdir(staticPath)).find((file) => /^sanity-.*\.js$/.test(file))

if (!runtimeFile) {
  throw new Error('Sanity runtime bundle was not generated')
}

const runtime = await readFile(new URL(runtimeFile, staticPath), 'utf8')

if (normalizedHtml.includes('/admin/admin/')) {
  throw new Error('Sanity build contains a duplicated /admin base path')
}

if (normalizedHtml.includes('="/static/')) {
  throw new Error('Sanity build still contains root-relative static asset paths')
}

if (!runtime.includes('basePath:"/admin"')) {
  throw new Error('Sanity runtime does not use the /admin deployment base path')
}

if (runtime.includes('/admin/admin')) {
  throw new Error('Sanity runtime contains a duplicated /admin base path')
}

if (
  manifest.workspaces.some(
    (workspace) =>
      workspace.projectId !== '5c55dqxe' ||
      workspace.dataset !== 'production' ||
      workspace.title !== 'Ceylon Horizon' ||
      workspace.basePath !== '/',
  )
) {
  throw new Error('Sanity manifest contains unexpected workspace configuration')
}

await writeFile(indexPath, normalizedHtml)
