import axios from 'axios';
import Router from './../router'

class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
    };
    return config;
  }

  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    // 响应拦截
    instance.interceptors.response.use(
      (res) => {
        // 进行登录错误拦截
        const { data, status } = res;
        //   if (status === 200) {
        // 未登录或token过期
        if (data.code === 502) {
          setTimeout(() => {
            Router.push({
              path: '/login',
              query: { redirect: Router.currentRoute.fullPath },
            });
          }, 1000);
        }
        // 对于code错误码 识别 做统一处理
        // let errorMsg = ''
        // switch (data.code) {
        //   case 111:
        //     errorMsg = '1'
        //     break
        //   case 222:
        //     errorMsg = '2'
        //     break
        //   case 333:
        //     errorMsg = '3'
        //     break
        //   default:
        //     errorMsg = data.msg
        // }
        // data.msg = errorMsg
        //   }
        return { data, status };
      },
      () => {
        const text = '请求失败，服务器异常'
        return Promise.reject(text);
      }
    );
  }

  request(options) {
    let intTemp = '';
    if (options.headers) {
      intTemp = axios.create();
    } else {
      intTemp = axios.create();
      options.headers = {
        token: window.sessionStorage.getItem('token'),
      };
    }
    const instance = intTemp;
    options = Object.assign(this.getInsideConfig(), options);
    this.interceptors(instance, options.url);
    return instance(options);
  }
}
export default HttpRequest;
