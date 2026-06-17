<template>
  <article
    v-for="post in posts" :key="post._path"
    class="h-entry article article-type-post" itemprop="blogPost"
    itemscope itemtype="https://schema.org/BlogPosting"
  >
    <div class="article-meta">
      <a :href="post._path" class="article-date">
        <time class="dt-published" :datetime="post.date" itemprop="datePublished">{{ formatDate(post.date) }}</time>
      </a>
    </div>
    <div class="article-inner">
      <header class="article-header">
        <h1 itemprop="name">
          <a class="p-name article-title" :href="post._path">{{ post.title }}</a>
        </h1>
      </header>
      <div class="e-content article-entry" itemprop="articleBody">
        <p>{{ post.description }}</p>
      </div>
      <footer class="article-footer">
        <a
          :data-url="siteUrl + post._path"
          data-id="share-link"
          :data-title="post.title"
          class="article-share-link"
        >
          <span class="fa fa-share">分享</span>
        </a>
      </footer>
    </div>
  </article>
</template>

<script setup>
const siteUrl = 'https://jiangoduck.github.io'

const { data: posts } = await useAsyncData('home-posts', () =>
  queryContent('/posts')
    .only(['title', '_path', 'date', 'description'])
    .sort({ date: -1 })
    .find()
)

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

useHead({
  title: '',
  meta: [
    { name: 'description', content: '一个暂时用Nuxt搭建的博客' },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: '00067的博客' },
    { property: 'og:url', content: 'https://jiangoduck.github.io/' },
    { property: 'og:description', content: '一个暂时用Nuxt搭建的博客' }
  ]
})
</script>
