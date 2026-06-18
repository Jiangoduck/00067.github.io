import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const postsDir = path.join(root, 'content/posts')
const publicDir = path.join(root, 'public')

const siteUrl = 'https://jiang00067.top'
const siteName = '00067的博客'
const author = 'Jiang00067'
const subtitle = '记录学习（或许吧 可能有一些胡思乱想）'

function parseFrontMatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return null
  const frontMatter = {}
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    let value = line.slice(idx + 1).trim()
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1).split(',').map(v => v.trim().replace(/['"]/g, ''))
    } else {
      value = value.replace(/^['"]|['"]$/g, '')
    }
    frontMatter[key] = value
  }
  return { frontMatter, body: match[2] }
}

function escapeXml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function generateAtomXml(posts) {
  const entries = posts.map(post => {
    const { frontMatter } = post
    const title = frontMatter.title || 'Untitled'
    const date = frontMatter.date ? new Date(frontMatter.date).toISOString() : new Date().toISOString()
    const desc = frontMatter.description || ''
    const slug = path.basename(post.file, '.md')
    const link = `${siteUrl}/posts/${slug}`
    const tags = Array.isArray(frontMatter.tags) ? frontMatter.tags : []

    return `  <entry>
    <title>${escapeXml(title)}</title>
    <link href="${escapeXml(link)}" rel="alternate"/>
    <id>${escapeXml(link)}</id>
    <published>${date}</published>
    <updated>${date}</updated>
    <author>
      <name>${escapeXml(author)}</name>
    </author>
    <summary type="text">${escapeXml(desc)}</summary>
${tags.length ? tags.map(tag => `    <category term="${escapeXml(tag)}"/>`).join('\n') : ''}
  </entry>`
  }).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${escapeXml(siteName)}</title>
  <subtitle>${escapeXml(subtitle)}</subtitle>
  <link href="${escapeXml(siteUrl)}/atom.xml" rel="self"/>
  <link href="${escapeXml(siteUrl)}/" rel="alternate"/>
  <id>${escapeXml(siteUrl)}/</id>
  <updated>${new Date().toISOString()}</updated>
  <author>
    <name>${escapeXml(author)}</name>
  </author>
${entries}
</feed>`
}

const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'))
const posts = files.map(file => {
  const content = fs.readFileSync(path.join(postsDir, file), 'utf-8')
  const parsed = parseFrontMatter(content)
  return { ...parsed, file }
}).filter(Boolean).sort((a, b) => new Date(b.frontMatter.date) - new Date(a.frontMatter.date))

const atomXml = generateAtomXml(posts)

fs.writeFileSync(path.join(publicDir, 'atom.xml'), atomXml, 'utf-8')
console.log(`✅ Generated atom.xml with ${posts.length} posts → public/atom.xml`)

const outputPublic = path.join(root, '.output/public')
if (fs.existsSync(outputPublic)) {
  fs.writeFileSync(path.join(outputPublic, 'atom.xml'), atomXml, 'utf-8')
}
