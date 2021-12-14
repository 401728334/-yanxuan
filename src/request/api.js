// 导入请求头头部
import request from './request'
// 请求首页数据
export const getHomeData = () => request.get('/index/index')

// 请求popup数据
export const getPopupData = () => request.get('/search/index')

// 搜索请求数据
export const getSearchData = (params) => request.get('/goods/list', { params })

// 搜索联想词请求数据
export const getSearchListData = (params) => request.get('/search/helper', { params })

// 删除搜索框历史记录
export const clearHistory = () => request.post('/search/clearhistory')

// 登陆接口（没有用户自动注册）
export const loginUsers = (params) => request.post('/auth/loginByWeb', params)

// 产品详情页数
export const productDetailData = (params) => request.get('/goods/detail', { params })

// 产品详情页相关产品数据
export const relatedProductsData = (params) => request.get('/goods/related', { params })

// 购物车产品数量数据
export const cartNumbersData = () => request.get('/cart/goodscount')

// 加入购物车数据
export const addCartData = (params) => request.post('/cart/add', params)

// 购物车商品数据
export const CartListData = () => request.get('/cart/index')

// 购物车点击切换商品选中状态
export const CartCheckedData = (params) => request.post('/cart/checked', params)

// 购物车商品步进器数量编辑
export const CartStepNumData = (params) => request.post('/cart/update', params)

// 购物车商品删除
export const CartDeleteData = (params) => request.post('/cart/delete', params)
