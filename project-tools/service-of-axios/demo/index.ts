import request from '../index'
interface Req {
  id: number | string
}

interface Res {
  data: object
}
const requestDemo1 = (data: Req) => {
  return request<Req, Res>({
    url: '',
    method: 'GET',
    data,
    interceptors: {
      requestInterceptors(res) {
        console.log('接口请求拦截')

        return res
      },
      responseInterceptors(result) {
        console.log('接口响应拦截')
        return result
      }
    }
  })
}

(async () => {
  let res = await requestDemo1({
    id: 1
  })
})()