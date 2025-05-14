<template>
  <main class="container mx-auto">
    <div class="flex justify-center">
      <SearchWeather v-model="selectedCity" />
    </div>
  </main>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import SearchWeather from './components/SearchWeather.vue'

const selectedCity = ref<string>('')
</script>
