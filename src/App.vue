<script setup lang="ts">
import { ref } from 'vue'
import Line from './components/Line.vue'

const linesCount = ref(0)
</script>

<template>
  <header><h1>안영</h1></header>
  <main>
    <Line v-for="idx in linesCount + 1" :idx="idx" :is-first="idx === 1" :is-last="idx === linesCount" :is-tmp="idx === linesCount + 1" @inc="linesCount++" @dec="linesCount--" />
  </main>
</template>

<style scoped></style>
