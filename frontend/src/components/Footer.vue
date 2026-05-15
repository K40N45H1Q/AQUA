<template>
  <footer>
    <a href="https://t.me/gh057wr">{{ year }} · Powered by @gh057wr 💬</a>
  </footer>
</template>

<style scoped>
footer {
  opacity: 0.7;
  padding-bottom: 20px;
  text-align: center;
  font-size: 12px;
}

footer a {
  all: unset;
  cursor: pointer !important;
}
</style>

<script setup>
const year = new Date().getFullYear();
</script>