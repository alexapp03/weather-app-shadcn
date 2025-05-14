import { MapboxService } from './mapbox/mapbox.service'

// Export types
export * from './mapbox/types'

const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || ''

export const mapboxService = new MapboxService(MAPBOX_ACCESS_TOKEN)
