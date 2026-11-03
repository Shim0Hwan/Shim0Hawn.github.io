import { cp, readdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

// Keep the existing public media URLs stable across the React migration.
for (const name of await readdir('.')) {
  if (name.startsWith('portfolio-') && /\.(webp|png|mp4|txt)$/.test(name)) {
    await cp(name, join('dist', name))
  }
}
await writeFile('dist/.nojekyll', '')
await cp('THIRD_PARTY_NOTICES.txt', 'dist/THIRD_PARTY_NOTICES.txt')
console.log('Packaged portfolio media with unchanged public filenames.')
