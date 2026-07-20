<template>
  <div id="container">
    <div id="wrap">
      <header id="header">
        <div id="banner"></div>
        <div id="header-outer" class="outer">
          <div id="header-title" class="inner">
            <h1 id="logo-wrap">
              <a href="/" id="logo">00067的博客</a>
            </h1>
            <h2 id="subtitle-wrap">
              <a href="/" id="subtitle">记录学习（或许吧 可能有一些胡思乱想）</a>
            </h2>
          </div>
          <div id="header-inner" class="inner">
            <nav id="main-nav">
              <a id="main-nav-toggle" class="nav-icon"><span class="fa fa-bars"></span></a>
              <a class="main-nav-link" v-for="item in navItems" :key="item.text" :href="item.link">{{ item.text }}</a>
              <a class="main-nav-link dark-toggle" href="#" @click.prevent="toggleDark" title="切换暗色模式">
                <span class="fa" :class="darkEnabled ? 'fa-sun-o' : 'fa-moon-o'"></span>
              </a>
            </nav>

          </div>
        </div>
      </header>

      <div class="outer">
        <section id="main">
          <slot />
        </section>
        <aside id="sidebar">
          <div class="widget-wrap">
            <h3 class="widget-title">归档</h3>
            <div class="widget">
              <ul class="archive-list">
                <li class="archive-list-item" v-for="arc in archives" :key="arc.label">
                  <a class="archive-list-link" :href="arc.link">{{ arc.label }}</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="widget-wrap">
            <h3 class="widget-title">最新文章</h3>
            <div class="widget">
              <ul>
                <li v-for="post in recentPosts" :key="post._path">
                  <a :href="post._path">{{ post.title }}</a>
                </li>
              </ul>
            </div>
          </div>
        </aside>
      </div>

      <footer id="footer">
        <div class="outer">
          <div id="footer-info" class="inner">
            &copy; 2026 Jiang00067<br>
            <span id="busuanzi_container_site_pv">本站总访问量 <span id="busuanzi_value_site_pv">0</span> 次</span><br>
            Powered by <a href="https://nuxt.com/" target="_blank">Nuxt</a>
          </div>
        </div>
      </footer>
    </div>

    <nav id="mobile-nav">
      <a class="mobile-nav-link" v-for="item in navItems" :key="item.text" :href="item.link">{{ item.text }}</a>
      <a class="mobile-nav-link dark-toggle" href="#" @click.prevent="toggleDark">
        <span class="fa" :class="darkEnabled ? 'fa-sun-o' : 'fa-moon-o'"></span>
        {{ darkEnabled ? '亮色模式' : '暗色模式' }}
      </a>
    </nav>

    <script src="/js/jquery-3.6.4.min.js"></script>
    <script src="/fancybox/jquery.fancybox.min.js"></script>
    <script src="/js/script.js"></script>
  </div>
</template>

<script setup>
import { enable as enableDarkMode, disable as disableDarkMode } from 'darkreader'

const DR_CONFIG = { brightness: 100, contrast: 90, sepia: 10 }
const darkEnabled = ref(false)

function toggleDark() {
  if (darkEnabled.value) {
    disableDarkMode()
    darkEnabled.value = false
  } else {
    enableDarkMode(DR_CONFIG)
    darkEnabled.value = true
  }
  try { localStorage.setItem('dark-mode', darkEnabled.value ? '1' : '0') } catch {}
}

function initDark() {
  let enabled = false
  try {
    const saved = localStorage.getItem('dark-mode')
    if (saved !== null) {
      enabled = saved === '1'
    } else {
      enabled = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
  } catch {
    enabled = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  if (enabled) {
    enableDarkMode(DR_CONFIG)
    darkEnabled.value = true
  }
}

if (import.meta.client) {
  initDark()
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (localStorage.getItem('dark-mode') === null) {
      if (e.matches) enableDarkMode(DR_CONFIG)
      else disableDarkMode()
      darkEnabled.value = e.matches
    }
  })
}

const navItems = [
  { text: '主页', link: '/' },
  { text: '归档', link: '/archives' },
  { text: '友链', link: '/links' },
]

const { data: posts } = await useAsyncData('sidebar-posts', () =>
  queryContent('/posts')
    .only(['title', '_path', 'date'])
    .sort({ date: -1 })
    .find()
)

const archives = computed(() => {
  if (!posts.value) return []
  const map = {}
  for (const post of posts.value) {
    if (!post.date) continue
    const d = new Date(post.date)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    if (!map[key]) {
      const months = ['', '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
      map[key] = {
        label: `${months[d.getMonth() + 1]} ${d.getFullYear()}`,
        link: '/archives'
      }
    }
  }
  return Object.values(map)
})

const recentPosts = computed(() => {
  if (!posts.value) return []
  return posts.value.slice(0, 5)
})

useHead({
  titleTemplate: (titleChunk) => titleChunk ? `${titleChunk} | 00067的博客` : '00067的博客',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
    { property: 'og:site_name', content: '00067的博客' },
    { property: 'og:locale', content: 'zh_CN' },
    { property: 'article:author', content: 'Jiang00067' },
    { name: 'twitter:card', content: 'summary' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.png', type: 'image/png' },
    { rel: 'stylesheet', href: '/css/style.css' },
    { rel: 'stylesheet', href: '/fancybox/jquery.fancybox.min.css' },
    { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/fork-awesome@1.2.0/css/fork-awesome.min.css' }
  ],
  script: [
    { src: '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js', async: true }
  ],
  noscript: [
    { children: '您的浏览器已拦截不蒜子统计，请添加白名单以正常显示访问量' }
  ]
})
</script>
