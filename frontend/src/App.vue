<style>
@font-face {
  font-style: normal;
  font-weight: 100 900;
  font-family: "JetBrainsMono";
  src: url("/JetBrainsMono.ttf") format("truetype");
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
  background-color: black;
}
a {
  text-decoration: none;
}
</style>

<template>
  <Navbar />
</template>

<script setup>
import Navbar from './components/Navbar.vue';
</script>