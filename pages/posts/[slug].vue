<template>
  <article v-if="post" class="h-entry article article-type-post" itemprop="blogPost" itemscope itemtype="https://schema.org/BlogPosting">
    <div class="article-meta">
      <a :href="post._path" class="article-date">
        <time class="dt-published" :datetime="post.date" itemprop="datePublished">{{ formatDate(post.date) }}</time>
      </a>
    </div>
    <div class="article-inner">
      <header class="article-header">
        <h1 class="p-name article-title" itemprop="headline name">{{ post.title }}</h1>
      </header>
      <div class="e-content article-entry" itemprop="articleBody">
        <ContentRenderer :value="post" />
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
        <span id="busuanzi_container_page_pv" style="margin-left: 15px;">
          该文章浏览量 <span id="busuanzi_value_page_pv">0</span>
        </span>
      </footer>
    </div>
  </article>
  <AppComment v-if="post" />
</template>

<script setup>
const route = useRoute()
const siteUrl = 'https://jiangoduck.github.io'

const { data: post } = await useAsyncData(`post-${route.params.slug}`, () =>
  queryContent(`/posts/${route.params.slug}`).findOne()
)

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

useHead({
  title: post.value?.title || '文章',
  meta: [
    { name: 'description', content: post.value?.description || '' },
    { property: 'og:type', content: 'article' },
    { property: 'og:title', content: post.value?.title || '' },
    { property: 'og:url', content: siteUrl + route.path },
    { property: 'og:description', content: post.value?.description || '' }
  ]
})
</script>
