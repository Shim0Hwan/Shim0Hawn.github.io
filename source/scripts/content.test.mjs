import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'

const content = JSON.parse(readFileSync(new URL('../src/content.json', import.meta.url)))
test('portfolio selection and all detailed media are preserved', () => {
  assert.equal(content.projects.length, 15)
  assert.equal(content.environment.length, 7)
  assert.equal(content.environment[0].slug, 'environment-bicycle')
  assert.equal(content.technical.length, 4)
  assert.ok(!content.environment.some(p => /maggi|project$/.test(p.slug)))
  for (const project of content.projects) {
    assert.ok(existsSync(`${project.slug}.html`), project.slug)
    assert.equal(new Set(project.sections.map(s => s.id)).size, project.sections.length)
    for (const media of [...project.cover, ...project.sections.flatMap(s => s.media)]) {
      assert.ok(existsSync(media.src), media.src)
      if (media.poster) assert.ok(existsSync(media.poster), media.poster)
      assert.ok(media.alt && media.width > 0 && media.height > 0, media.src)
    }
  }
})
test('every TA feature deep link resolves to its own section', () => {
  for (const item of content.technical) {
    for (const feature of item.features) {
      const [page, id] = feature.href.split('#')
      assert.ok(feature.title.length > 2, feature.href)
      const project = content.projects.find(p => p.slug === page.replace('.html',''))
      assert.ok(project?.sections.some(s => s.id === id), feature.href)
    }
  }
})
