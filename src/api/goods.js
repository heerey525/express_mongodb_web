import axios from '@/libs/api.request'

// 商品列表
export const goodsPage = info => {
  return axios.request({
    url: 'food/page',
    data: info,
    method: 'post'
  })
}
// 商品修改
export const goodsUpdate = info => {
  return axios.request({
    url: 'food/update',
    data: info,
    method: 'post'
  })
}
// 商品添加
export const goodsAdd = info => {
  return axios.request({
    url: 'food/add',
    data: info,
    method: 'post'
  })
}
// 商品删除
export const goodsDel = info => {
  return axios.request({
    url: 'food/del',
    data: info,
    method: 'post'
  })
}

