import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'

const content = JSON.parse(readFileSync(new URL('../src/content.json', import.meta.url)))
test('portfolio selection and all detailed media are preserved', () => {
  assert.equal(content.projects.length, 15)
  assert.equal(content.environment.length, 6)
  assert.equal(content.environment[0].slug, 'environment-bicycle')
  assert.equal(content.technical.length, 4)
  assert.ok(!content.environment.some(p => /maggi|project$|pathfinder/.test(p.slug)))
  for (const project of content.projects) {
    assert.ok(existsSync(`${project.slug}.html`), project.slug)
    assert.equal(new Set(project.sections.map(s => s.id)).size, project.sections.length)
    const sections = project.sections.flatMap(s => [s, ...(s.parts ?? [])])
    for (const media of [...project.cover, ...sections.flatMap(s => s.media)]) {
      assert.ok(existsSync(media.src), media.src)
      if (media.poster) assert.ok(existsSync(media.poster), media.poster)
      assert.ok(media.alt && media.width > 0 && media.height > 0, media.src)
    }
  }
})
test('TA cards lead to project details and keep work breakdowns on the detail page', () => {
  for (const item of content.technical) {
    assert.ok(item.summary && item.role && !item.features, item.slug)
    assert.ok(content.projects.some(p => p.slug === item.slug), item.slug)
  }
  const { sections } = content.projects.find(p => p.slug === 'technical-project')
  assert.deepEqual(sections.map(s => s.id), ['ball-shader', 'stickers'])
  assert.deepEqual(sections[0].parts.map(p => p.id), ['numbers', 'shader'])
})
