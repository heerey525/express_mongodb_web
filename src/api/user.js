import axios from '@/libs/api.request'

// 登录
export const login = info => {
  return axios.request({
    url: 'user/login',
    data: info,
    method: 'post'
  })
}
// 发送验证码
export const getMailCode = info => {
  return axios.request({
    url: 'user/getMailCode',
    data: info,
    method: 'post'
  })
}
// 注册
export const reg = info => {
  return axios.request({
    url: 'user/reg',
    data: info,
    method: 'post'
  })
}
// 列表
export const usersPage = info => {
  return axios.request({
    url: 'user/page',
    data: info,
    method: 'post'
  })
}
// 删除
export const usersDel = info => {
  return axios.request({
    url: 'user/del',
    data: info,
    method: 'post'
  })
}
// 添加
export const usersAdd = info => {
  return axios.request({
    url: 'user/add',
    data: info,
    method: 'post'
  })
}
// 分配角色
export const usersUpdateRole = info => {
  return axios.request({
    url: 'user/updateRole',
    data: info,
    method: 'post'
  })
}
// 修改用户状态
export const usersUpdateState = info => {
  return axios.request({
    url: 'user/updateState',
    data: info,
    method: 'post'
  })
}
// 修改密码
export const usersUpdatePs = info => {
  return axios.request({
    url: 'user/updatePs',
    data: info,
    method: 'post'
  })
}