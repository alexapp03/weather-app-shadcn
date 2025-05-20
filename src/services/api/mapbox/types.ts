export interface MapboxFeature {
  id: string
  type: string
  geometry: {
    type: string
    coordinates: [number, number] // [longitude, latitude]
  }
  properties: {
    name: string
    name_preferred: string
    text: string
    place_name: string
    place_formatted: string
    center: [number, number] // [longitude, latitude]

    full_address?: string
    context?: Array<{
      id: string
      text: string
      wikidata?: string
      [key: string]: any
    }>
    bbox?: [number, number, number, number]
  }
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
