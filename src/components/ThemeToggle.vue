<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { Sun, Moon } from 'lucide-vue-next'
import { Button } from '@/components/ui'

const theme = ref<'light' | 'dark'>('light')

// Handle initial theme
onMounted(() => {
  // Check for system preference or stored preference
  const storedTheme = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
    theme.value = 'dark'
    document.documentElement.classList.add('dark')
  } else {
    theme.value = 'light'
    document.documentElement.classList.remove('dark')
  }
})

// Toggle theme
function toggleTheme(): void {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

// Apply theme changes when theme ref changes
watch(theme, (newTheme) => {
  if (newTheme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  localStorage.setItem('theme', newTheme)
})
</script>

<template>
  <Button variant="ghost" size="icon" @click="toggleTheme()" aria-label="Toggle theme">
    <Sun v-if="theme === 'dark'" class="size-5" />
    <Moon v-else class="size-5" />
  </Button>
</template>
