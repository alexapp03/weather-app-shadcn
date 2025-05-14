import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'

export interface ApiClientOptions {
  baseURL: string
  timeout?: number
  headers?: Record<string, string>
}

export function createApiClient(options: ApiClientOptions): AxiosInstance {
  const defaultOptions: AxiosRequestConfig = {
    baseURL: options.baseURL,
    timeout: options.timeout || 30000,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  }

  const instance = axios.create(defaultOptions)

  // Add request interceptor
  instance.interceptors.request.use(
    (config) => {
      // You can modify the request here before it's sent
      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )

  // Add response interceptor
  instance.interceptors.response.use(
    (response) => {
      // Any status code within the range of 2xx triggers this function
      return response
    },
    (error) => {
      // Any status codes outside the range of 2xx trigger this function
      return Promise.reject(error)
    },
  )

  return instance
}
