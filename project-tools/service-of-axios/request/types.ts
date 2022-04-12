import type { AxiosRequestConfig, AxiosResponse } from 'axios'
// 实例拦截器
export interface RequestInterceptors<T> {
  // 请求拦截
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorsCatch?: (err: any) => any
  // 响应拦截
  responseInterceptors?: (config: T) => T
  responseInsterceptorsCatch?: (err: any) => any
}

// 自定义传入的参数
export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: RequestInterceptors<T>
}

export interface CancelRequestSource {
  [index: string]: () => void
}