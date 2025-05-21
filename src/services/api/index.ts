import { MapboxService } from './mapbox/mapbox.service'
import { OpenWeatherService } from './openweather/openweather.service'

// Export types
export * from './mapbox/types'

const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || ''
const OPEN_WEATHER_ACCESSS_TOKEN = import.meta.env.VITE_OPEN_WEATHER_ACCESS_TOKEN || ''

export const mapboxService = new MapboxService(MAPBOX_ACCESS_TOKEN)
export const openWeatherService = new OpenWeatherService(OPEN_WEATHER_ACCESSS_TOKEN)
