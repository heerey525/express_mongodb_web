import HttpRequest from '@/libs/axios'
// import config from '@/config'
// 此处vue还没实例化，不能使用vue相关变量来获取数据
const baseUrl = process.env.NODE_ENV === 'development' ? window.Glob.baseUrl.dev : window.Glob.baseUrl.pro
const axios = new HttpRequest(baseUrl)
export default axios
