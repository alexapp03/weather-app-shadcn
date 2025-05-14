import type { AxiosInstance } from 'axios'
import type { ForwardGeocodingParams, MapboxForwardGeocodingResponse } from './types'

export class GeolocationMapboxService {
  private apiClient
  private accessToken: string

  constructor(accessToken: string, apiClient: AxiosInstance) {
    this.accessToken = accessToken
    this.apiClient = apiClient
  }

  async forwardGeocode(params: ForwardGeocodingParams): Promise<MapboxForwardGeocodingResponse> {
    const response = await this.apiClient.get('/search/geocode/v6/forward', {
      params: {
        ...params,
        access_token: this.accessToken,
      },
    })
    return response.data
  }
}
