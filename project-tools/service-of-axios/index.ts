import type { AxiosResponse } from "axios";
import Request from "./request";
import type { RequestConfig } from "./request/types";

interface MyRequestConfig<T> extends RequestConfig<MyResponse<any>> {
  data?: T
}

interface MyResponse<T> {
  code: number,
  message: string,
  data: T
}

const request = new Request({
  baseURL: '',//import.meta.env.BASE_UR
  timeout: 1000 * 60 * 5,
  interceptors: {
    requestInterceptors: config => {
      // 实例请求拦截器
      return config
    },
    responseInterceptors: (result: AxiosResponse) =>  {
      // 实例响应拦截器
      return result
    }
  }
})



/**
 * @description: 函数的描述
 * @generic D 请求参数
 * @generic T 响应结构
 * @param config 
 * @returns Promise
 */
const myRequest = <D = any, T = any>(config: MyRequestConfig<D>) => {
  const { method = 'GET' } = config
  if(method === 'get' || method === 'GET') {
    config.params = config.data
  }
  return request.request<MyResponse<T>>(config)
}

// 取消指定请求
export const cancalRequest = (url: string | string[]) => {
  return request.cancalRequest(url)
}

// 取消全部请求
export const cancelAllRequest = () => {
  return request.cancelAllRequest()
}

export default myRequest