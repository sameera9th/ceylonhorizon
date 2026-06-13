import { cp, mkdir, rm } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const sanityDist = fileURLToPath(new URL('../../sanity/dist/', import.meta.url))
const adminDist = fileURLToPath(new URL('../dist/admin/', import.meta.url))

await rm(adminDist, { recursive: true, force: true })
await mkdir(adminDist, { recursive: true })
await cp(sanityDist, adminDist, { recursive: true })
