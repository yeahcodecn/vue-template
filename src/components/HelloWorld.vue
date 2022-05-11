<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <nav>
    <router-link to="/">Home</router-link>
  </nav>
  <p class="text-base">字体大小text-base</p>
  <p class="text-lg">字体大小text-lg</p>
  <p class="text-xl">字体大小text-xl</p>
  <p class="text-2xl">字体大小text-2xl</p>
  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VS Code</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank"> Vite Documentation </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <button type="button" @click="count++">count is: {{ count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<style scoped lang="scss">
a {
  color: #42b983;
}
h1 {
  border-radius: 10px;
  border: 1px solid red;
  transform: rotate(-3deg);
  background: blue;
  user-select: none; // 添加 user-select 属性，测试浏览器前缀是否有添加
}
</style>
