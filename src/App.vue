<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/layout/Header.vue'
</script>

<template>
  <Header class="mb-8"></Header>
  <RouterView />
</template>
