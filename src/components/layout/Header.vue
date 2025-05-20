<script setup lang="ts">
import { RouterLink } from 'vue-router'
import ThemeToggle from '@/components/ThemeToggle.vue'
import { Umbrella } from 'lucide-vue-next'
</script>

<template>
  <header class="container mx-auto">
    <div class="flex items-center justify-between w-full py-4">
      <div class="w-20"></div>

      <nav class="flex items-center space-x-4">
        <RouterLink to="/" class="hover:text-primary">Home</RouterLink>
      </nav>

      <div class="w-20 flex justify-end">
        <ThemeToggle />
      </div>
    </div>
    <h1 class="text-3xl font-bold text-center my-8 flex justify-center">
      <Umbrella class="me-4" :size="36" /> Weather App
    </h1>
  </header>
</template>
