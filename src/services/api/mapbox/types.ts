export interface MapboxFeature {
  id: string
  type: string
  place_type: string[]
  relevance: number
  properties: {
    accuracy?: string
    mapbox_id?: string
    wikidata?: string
    [key: string]: any
    name: string
    name_preferred: string
  }
  text: string
  place_name: string
  center: [number, number] // [longitude, latitude]
  geometry: {
    type: string
    coordinates: [number, number] // [longitude, latitude]
  }
  address?: string
  context?: Array<{
    id: string
    text: string
    wikidata?: string
    [key: string]: any
  }>
  bbox?: [number, number, number, number]
}

export interface MapboxForwardGeocodingResponse {
  type: string
  features: MapboxFeature[]
  attribution: string
}

export interface ForwardGeocodingParams {
  q: string
  limit?: number
  proximity?: string // Format: "longitude,latitude"
  language?: string | string[]
  country?: string | string[]
  types?: string | string[]
  fuzzyMatch?: boolean
  routing?: boolean
  worldview?: string
}
