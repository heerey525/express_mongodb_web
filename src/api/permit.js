import axios from '@/libs/api.request'

// 列表
export const permitsPage = info => {
  return axios.request({
    url: 'permit/page',
    data: info,
    method: 'post'
  })
}
// 删除
export const permitsDel = info => {
  return axios.request({
    url: 'permit/del',
    data: info,
    method: 'post'
  })
}
// 添加
export const permitsAdd = info => {
  return axios.request({
    url: 'permit/add',
    data: info,
    method: 'post'
  })
}
// 修改
export const permitsUpdate = info => {
  return axios.request({
    url: 'permit/update',
    data: info,
    method: 'post'
  })
}
// 权限列表（用于分配权限列表）
export const permitsList = info => {
  return axios.request({
    url: 'permit/list',
    data: info,
    method: 'post'
  })
}
// 用户权限列表
export const getMenusList = info => {
  return axios.request({
    url: 'permit/menus',
    data: info,
    method: 'post'
  })
}
