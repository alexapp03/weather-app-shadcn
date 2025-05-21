<template>
  <div></div>
</template>

<script setup lang="ts">
import { openWeatherService } from '@/services/api'
import type { OpenWeatherResponse } from '@/services/api/openweather/types'
import { useRoute } from 'vue-router'

const route = useRoute()

const weatherData = await fetchWeatherData()
console.log('Weather data:', weatherData)

async function fetchWeatherData(): Promise<OpenWeatherResponse | undefined> {
  try {
    const response = await openWeatherService.onecall.getWeatherData({
      lat: +route.params.lat,
      lon: +route.params.lon,
      exclude: '',
      units: '',
    })
    return response
  } catch (error) {
    console.error('Error fetching weather data:', error)
    return undefined
  }
}
</script>
