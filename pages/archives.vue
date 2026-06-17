<template>
    <section class="archives-wrap" v-for="(group, year) in byYear" :key="year">
    <div class="archive-year-wrap">
      <a href="/archives" class="archive-year">{{ year }}</a>
    </div>
    <div class="archives">
      <div class="archive-article archive-type-post" v-for="post in group" :key="post._path">
        <div class="archive-article-inner">
          <header class="archive-article-header">
            <a :href="post._path" class="archive-article-date">
              <time class="dt-published" :datetime="post.date" itemprop="datePublished">{{ formatShortDate(post.date) }}</time>
            </a>
            <h1 itemprop="name">
              <a class="archive-article-title" :href="post._path">{{ post.title }}</a>
            </h1>
          </header>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { data: posts } = await useAsyncData('archive-posts', () =>
  queryContent('/posts')
    .only(['title', '_path', 'date'])
    .sort({ date: -1 })
    .find()
)

const byYear = computed(() => {
  if (!posts.value) return {}
  const groups = {}
  for (const post of posts.value) {
    if (!post.date) continue
    const year = new Date(post.date).getFullYear()
    if (!groups[year]) groups[year] = []
    groups[year].push(post)
  }
  return groups
})

function formatShortDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return `${d.getMonth() + 1}月 ${d.getDate()}`
}

useHead({
  title: '归档',
  meta: [
    { name: 'description', content: '归档 - 00067的博客' },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: '归档 | 00067的博客' },
    { property: 'og:url', content: 'https://jiangoduck.github.io/archives/' },
    { property: 'og:description', content: '归档 - 00067的博客' }
  ]
})
</script>
