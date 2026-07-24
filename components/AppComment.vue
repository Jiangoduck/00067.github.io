<template>
  <div class="comment-wrap">
    <h3 class="comment-title">
      <span class="fa fa-comment"></span> 评论
    </h3>
    <ClientOnly>
      <div class="giscus"></div>
    </ClientOnly>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const el = document.querySelector('.giscus')
  if (!el || el.hasChildNodes()) return

  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.setAttribute('data-repo', 'Jiangoduck/00067.github.io')
  script.setAttribute('data-repo-id', 'R_kgDOS2Nr4g')
  script.setAttribute('data-category', 'General')
  script.setAttribute('data-category-id', 'DIC_kwDOS2Nr4s4DB523')

  script.setAttribute('data-mapping', 'pathname')
  script.setAttribute('data-strict', '0')
  script.setAttribute('data-reactions-enabled', '1')
  script.setAttribute('data-emit-metadata', '0')
  script.setAttribute('data-input-position', 'bottom')
  script.setAttribute('data-theme', 'preferred_color_scheme')
  script.setAttribute('data-lang', 'zh-CN')
  script.setAttribute('data-loading', 'lazy')
  script.async = true
  script.crossOrigin = 'anonymous'

  el.appendChild(script)
})
</script>

<style>
.comment-wrap {
  margin-top: 3em;
  padding-top: 2em;
  border-top: 1px solid #ddd;
}
.comment-title {
  font-size: 1.1em;
  color: #555;
  margin-bottom: 1em;
  font-weight: normal;
}
.comment-title .fa {
  margin-right: 0.3em;
}
.giscus {
  min-height: 300px;
}
</style>
