import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Apply theme from localStorage or system preference
const applyTheme = () => {
  const storedTheme = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

// Apply theme before mounting the app
applyTheme()

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
