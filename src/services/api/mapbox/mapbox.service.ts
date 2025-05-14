import { createApiClient } from '../axios-instance'
import { GeolocationMapboxService } from './geolocation.mapbox.service'

export class MapboxService {
  private apiClient
  private accessToken: string

  // list of services for mapbox api
  public geolocation: GeolocationMapboxService

  constructor(accessToken: string) {
    this.accessToken = accessToken
    this.apiClient = createApiClient({
      baseURL: 'https://api.mapbox.com',
    })

    this.geolocation = new GeolocationMapboxService(this.accessToken, this.apiClient)
  }
}
