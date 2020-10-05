import axios from '@/libs/api.request'

// 多语言列表
export const langsPage = info => {
  return axios.request({
    url: 'lang/page',
    data: info,
    method: 'post'
  })
}
// 多语言修改
export const langsUpdate = info => {
  return axios.request({
    url: 'lang/update',
    data: info,
    method: 'post'
  })
}
// 多语言添加
export const langsAdd = info => {
  return axios.request({
    url: 'lang/add',
    data: info,
    method: 'post'
  })
}
// 多语言删除
export const langsDel = info => {
  return axios.request({
    url: 'lang/del',
    data: info,
    method: 'post'
  })
}
// 多语言删除全部
export const langsDelAll = () => {
  return axios.request({
    url: 'lang/delAll',
    method: 'post'
  })
}
