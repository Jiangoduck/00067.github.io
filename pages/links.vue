<template>
  <div class="links-page">
    <div class="links-header">
      <h1 class="links-title">友链</h1>
      <p class="links-subtitle">朋友们 🌟</p>
    </div>

    <div class="links-contact">
      <p class="links-contact-text">
        ✦ 想和本博客贴贴换友链？ ✦<br>
        带上你的站点名称、简介和链接，敲 QQ
        <a href="https://qm.qq.com/cgi-bin/qm/qr?k=3573833258" target="_blank" rel="noopener">3573833258</a>
        ～<br>
        看到就会通过哒，只是可能偶尔会迷路一会儿 (´･ω･`)
      </p>
    </div>

    <div class="links-grid">
      <a
        v-for="link in links" :key="link.name"
        :href="link.url"
        target="_blank"
        rel="noopener"
        class="link-card"
      >
        <div class="link-avatar">
          <img v-if="link.avatar" :src="link.avatar" :alt="link.name" class="avatar-img">
          <span v-else class="avatar-fallback">{{ link.name.charAt(0) }}</span>
        </div>
        <div class="link-info">
          <div class="link-name">{{ link.name }}</div>
          <div class="link-desc">{{ link.desc }}</div>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
const links = [
  {
    name: 'f00001111的学习记录',
    url: 'https://mcsog.top/',
    desc: '记录学习过程',
    avatar: 'https://mcsog.top/images/logo.png'
  },
]
</script>

<style scoped>
.links-page {
  padding: 1em 0;
}

.links-header {
  margin-bottom: 1.5em;
}

.links-title {
  font-size: 1.5em;
  margin: 0;
}

.links-subtitle {
  color: #888;
  margin: 0.3em 0 0;
  font-size: 0.9em;
}

.links-contact {
  background: #faf0f5;
  padding: 1.2em 1.5em;
  border-radius: 12px;
  margin-bottom: 2em;
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

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1em;
}

.link-card {
  display: flex;
  align-items: center;
  gap: 1em;
  padding: 1em;
  border: 1px solid #eee;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.2s ease;
  background: #fff;
}

.link-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  border-color: #d4729a;
}

.link-avatar {
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  overflow: hidden;
  background: #f0d9e6;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-fallback {
  font-size: 1.3em;
  font-weight: bold;
  color: #d4729a;
}

.link-info {
  flex: 1;
  min-width: 0;
}

.link-name {
  font-size: 1em;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.2em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.link-desc {
  font-size: 0.85em;
  color: #888;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 640px) {
  .links-grid {
    grid-template-columns: 1fr;
  }
}
</style>
