<template>
  <div class="links-page">
    <h1 class="links-title">友链</h1>
    <div class="link-card" v-for="link in links" :key="link.name">
      <a :href="link.url" target="_blank" rel="noopener" class="link-name">{{ link.name }}</a>
      <span class="link-url">{{ link.url }}</span>
      <p class="link-desc">{{ link.desc }}</p>
    </div>
  </div>
</template>

<script setup>
const links = [
  { name: '待添加', url: '#', desc: '暂无友链' },
  { name: 'f00001111的学习记录', url: 'https://mcsog.top/', desc: '记录学习过程' },
]
</script>

<style scoped>
.links-page {
  padding: 1em 0;
}
.links-title {
  font-size: 1.5em;
  margin-bottom: 1em;
}
.link-card {
  margin-bottom: 1.5em;
  padding: 1em;
  border-bottom: 1px solid #ddd;
}
.link-name {
  font-size: 1.1em;
  font-weight: bold;
  display: block;
  margin-bottom: 0.3em;
}
.link-url {
  font-size: 0.85em;
  color: #888;
}
.link-desc {
  margin: 0.5em 0 0;
  color: #555;
}
</style>
