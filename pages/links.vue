<template>
  <div class="links-page">
    <h1 class="links-title">友链</h1>
    <div class="links-contact">
      <p class="links-contact-text">
        ✦ 想和本博客贴贴换友链？ ✦<br>
        带上你的站点名称、简介和链接，敲 QQ
        <a href="https://qm.qq.com/cgi-bin/qm/qr?k=3573833258" target="_blank" rel="noopener">3573833258</a>
        ～<br>
        看到就会通过哒，只是可能偶尔会迷路一会儿 (´･ω･`)
      </p>
    </div>
    <div class="link-card" v-for="link in links" :key="link.name">
      <a :href="link.url" target="_blank" rel="noopener" class="link-name">{{ link.name }}</a>
      <span class="link-url">{{ link.url }}</span>
      <p class="link-desc">{{ link.desc }}</p>
    </div>
  </div>
</template>

<script setup>
const links = [
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
.links-contact {
  background: #faf0f5;
  padding: 1.2em 1.5em;
  border-radius: 12px;
  margin-bottom: 1.5em;
  border: 1px solid #f0d9e6;
}
.links-contact-text {
  margin: 0;
  color: #855;
  line-height: 1.8;
}
.links-contact-text a {
  color: #d4729a;
  font-weight: bold;
  text-decoration: none;
}
</style>
