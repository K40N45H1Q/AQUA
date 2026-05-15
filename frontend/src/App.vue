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
  color: white;
  box-sizing: border-box;
  font-family: "JetBrainsMono", monospace;
}
body, html, #root {
  height: 100%;
  background-color: #fff;
}
a {
  text-decoration: none;
}
</style>

<template>
  <Navbar />
  <SearchForm />
  <Companies />
</template>

<script setup>
import Navbar from './components/Navbar.vue';
import SearchForm from './components/SearchForm.vue';
import Companies from './components/Companies.vue';
</script>