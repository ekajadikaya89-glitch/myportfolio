import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { describe, it } from 'node:test'
import { achievements } from '../content/achievements.ts'
import { articles, publishedArticles } from '../content/articles.ts'
import { experience } from '../content/experience.ts'
import { featuredProjects, projects } from '../content/projects.ts'
import { expertiseAreas, skillGroups } from '../content/skills.ts'

function collectStrings(value: unknown): string[] {
  if (typeof value === 'string') return [value]
  if (Array.isArray(value)) return value.flatMap(collectStrings)
  if (value && typeof value === 'object') return Object.values(value).flatMap(collectStrings)
  return []
}

describe('portfolio content integrity', () => {
  it('has unique project slugs and every referenced image exists in public/', () => {
    const slugs = new Set(projects.map((p) => p.slug))
    assert.equal(slugs.size, projects.length)
    assert.ok(featuredProjects.length >= 4)

    for (const project of projects) {
      assert.ok(project.image.startsWith('/projects/'), `Unexpected image path: ${project.image}`)
      const diskPath = path.join(process.cwd(), 'public', project.image.replace(/^\//, ''))
      assert.equal(fs.existsSync(diskPath), true, `Missing project asset on disk: ${diskPath}`)
    }
  })

  it('links achievements only to valid project slugs and verified https evidence URLs', () => {
    const slugs = new Set(projects.map((p) => p.slug))
    const verifiedCount = achievements.filter((item) => item.evidenceUrl?.startsWith('https://')).length
    assert.ok(verifiedCount >= 2)

    for (const item of achievements) {
      if (item.relatedProject) {
        assert.equal(slugs.has(item.relatedProject), true, `Invalid relatedProject: ${item.relatedProject}`)
      }
      if (item.evidenceUrl) {
        assert.ok(item.evidenceUrl.startsWith('https://'), `Non-HTTPS evidenceUrl: ${item.evidenceUrl}`)
      }
    }
  })

  it('keeps published articles complete with bilingual bodies across AI and backend topics', () => {
    assert.ok(publishedArticles.length >= 4)
    const aiArticles = publishedArticles.filter((a) => a.category.en === 'AI Engineering')
    assert.ok(aiArticles.length >= 2)
    for (const article of publishedArticles) {
      assert.ok(article.body?.en.length, `Missing EN body for ${article.slug}`)
      assert.ok(article.body?.id.length, `Missing ID body for ${article.slug}`)
    }
  })

  it('contains zero em dashes across all content collections (R-02)', () => {
    const all = [
      ...collectStrings(projects),
      ...collectStrings(experience),
      ...collectStrings(achievements),
      ...collectStrings(skillGroups),
      ...collectStrings(expertiseAreas),
      ...collectStrings(articles),
    ]
    for (const text of all) {
      assert.equal(text.includes('\u2014'), false, `Unexpected em dash in content: ${text}`)
    }
  })
})
