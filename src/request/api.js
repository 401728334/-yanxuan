// 导入请求头头部
import request from './request'
// 请求首页数据
export const getHomeData = () => request.get('/index/index')

// 请求popup数据
export const getPopupData = () => request.get('/search/index')
