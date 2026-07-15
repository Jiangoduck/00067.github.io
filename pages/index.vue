<template>
  <div>
    <div class="profile-card">
      <div class="profile-avatar">
        <img src="https://avatars.githubusercontent.com/Jiangoduck" alt="avatar" class="avatar-img">
      </div>
      <div class="profile-info">
        <div class="profile-name">Jiangoduck</div>
        <div class="profile-bio">记录学习（或许吧 可能有一些胡思乱想）</div>
        <div class="profile-links">
          <a href="https://github.com/Jiangoduck" target="_blank" rel="noopener" class="profile-link">
            <span class="fa fa-github"></span> GitHub
          </a>
          <a href="https://qm.qq.com/cgi-bin/qm/qr?k=3573833258" target="_blank" rel="noopener" class="profile-link">
            <span class="fa fa-qq"></span> QQ
          </a>
        </div>
      </div>
    </div>

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
  </div>
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
    { name: 'description', content: 'Jiangoduck 的个人博客' },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: '00067的博客' },
    { property: 'og:url', content: 'https://jiangoduck.github.io/' },
    { property: 'og:description', content: 'Jiangoduck 的个人博客' }
  ]
})
</script>

<style scoped>
.profile-card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 2em;
  margin-bottom: 2em;
  display: flex;
  align-items: center;
  gap: 1.5em;
  box-shadow: 1px 2px 3px #ddd;
}

:global(.dark-mode) .profile-card {
  background: #161b22;
  border-color: #21262d;
  box-shadow: none;
}

.profile-avatar {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  background: #f0d9e6;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-info {
  flex: 1;
  min-width: 0;
}

.profile-name {
  font-size: 1.3em;
  font-weight: bold;
  color: #555;
  margin-bottom: 0.3em;
}

:global(.dark-mode) .profile-name {
  color: #c9d1d9;
}

.profile-bio {
  color: #888;
  font-size: 0.9em;
  margin-bottom: 0.6em;
  line-height: 1.5;
}

:global(.dark-mode) .profile-bio {
  color: #8b949e;
}

.profile-links {
  display: flex;
  gap: 1em;
  flex-wrap: wrap;
}

.profile-link {
  color: #258fb8;
  text-decoration: none;
  font-size: 0.85em;
}

.profile-link:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .profile-card {
    flex-direction: column;
    text-align: center;
  }
  .profile-links {
    justify-content: center;
  }
}
</style>
