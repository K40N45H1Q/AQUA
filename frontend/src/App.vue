<style>
@font-face {
  font-family: "JetBrainsMono";
  font-style: normal;
  font-weight: 100 900;
  src: url("/JetBrainsMono.ttf") format("truetype");
  font-display: swap;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "JetBrainsMono", monospace;
}

html, body, #root, .test {
  height: 100%;
}

a {
  text-decoration: none;
}

html, body, #root, .wrapper {
  scrollbar-width: thin;
  scrollbar-color: #1538d4 #000;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: transparent !important;
}

::-webkit-scrollbar-thumb {
  background: #1538d4;
  border-radius: 999px;
  border: 2px solid #000;
}

::-webkit-scrollbar-thumb:hover {
  background: #0f2fb0;
}

.repair-wrapper {
  height: max-content;
  overflow: hidden;
  background-color: #1538d4;
}

</style>

<template>
  <div class="repair-wrapper">
    <Navbar />
    <SearchForm />
  </div>
  <Companies />
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import SearchForm from './components/SearchForm.vue'
import Companies from './components/Companies.vue'
</script>