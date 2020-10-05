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

