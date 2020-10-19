import axios from '@/libs/api.request'

// 列表
export const rolesPage = info => {
  return axios.request({
    url: 'role/page',
    data: info,
    method: 'post'
  })
}
// 删除
export const rolesDel = info => {
  return axios.request({
    url: 'role/del',
    data: info,
    method: 'post'
  })
}
// 添加
export const rolesAdd = info => {
  return axios.request({
    url: 'role/add',
    data: info,
    method: 'post'
  })
}
// 修改
export const rolesUpdate = info => {
  return axios.request({
    url: 'role/update',
    data: info,
    method: 'post'
  })
}
// 分配权限
export const rolesSetPermits = info => {
  return axios.request({
    url: 'role/setPermits',
    data: info,
    method: 'post'
  })
}