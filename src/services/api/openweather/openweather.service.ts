import { createApiClient } from '../axios-instance'
import { OneCallOpenWeatherService } from './onecall.openweather.service'

export class OpenWeatherService {
  private apiClient
  private accessToken: string

  // list of services for mapbox api
  public onecall: OneCallOpenWeatherService

  constructor(accessToken: string) {
    this.accessToken = accessToken
    this.apiClient = createApiClient({
      baseURL: 'https://api.openweathermap.org/data/3.0',
    })

    this.onecall = new OneCallOpenWeatherService(this.accessToken, this.apiClient)
  }
}
