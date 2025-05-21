import type { AxiosInstance } from 'axios'
import type { OpenWeatherResponse } from './types'

export class OneCallOpenWeatherService {
  private apiClient
  private accessToken: string

  constructor(accessToken: string, apiClient: AxiosInstance) {
    this.accessToken = accessToken
    this.apiClient = apiClient
  }

  getWeatherData(params: {
    lat: number
    lon: number
    exclude: string
    units: string
  }): Promise<OpenWeatherResponse> {
    return this.apiClient.get('/onecall', {
      params: {
        ...params,
        appid: this.accessToken,
      },
    })
  }
}
