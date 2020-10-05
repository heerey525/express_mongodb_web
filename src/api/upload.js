import axios from '@/libs/api.request'

// 图片上传
export const imgUpload = (info) => {
  return axios.request({
    url: 'file/upload',
    data: info,
    method: 'post',
  })
}
// excel上传
export const excelUpload = (info) => {
  return axios.request({
    url: 'file/excel/import',
    data: info,
    method: 'post',
  })
}
