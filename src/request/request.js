// 封装request/axios请求 拦截器
import axios from 'axios'

// 创建一个实例/单例
const instance = axios.create({
  baseURL: 'http://kumanxuan1.f3322.net:8001',
  // 请求响应时长
  timeout: 5000
})

// 请求拦截器
instance.interceptors.request.use(config => {
  return config
}, err => {
  console.log(err)
})

// 响应拦截器
instance.interceptors.response.use(res => {
  return res.data
}, err => {
  console.log(err)
})
// 导出实例
export default instance
