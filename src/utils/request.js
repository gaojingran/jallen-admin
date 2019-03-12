import axios from "axios";
import moment from "moment";
import config from "../config";
import { getSessionToken } from "./utils";

const timeFormat = "YYYY-MM-DD";
axios.defaults.baseURL = config.ajxPrefix;
axios.defaults.timeout = 1000 * 30;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

// 添加token
axios.interceptors.request.use(
  cfg => {
    const token = "Bearer " + getSessionToken();
    if (token) {
      cfg.headers.Authorization = token;
    }
    return cfg;
  },
  err => {
    return Promise.reject(err);
  }
);

// 响应处理
axios.interceptors.response.use(
  response => {
    const data = response.data;
    const serverTime = data.serverTime
      ? moment(data.serverTime).format(timeFormat)
      : moment().format(timeFormat);
    if (data.code === -1) {
      return Promise.reject({
        ...data,
        serverTime
      });
    } else {
      return Promise.resolve({
        ...data,
        serverTime
      });
    }
  },
  err => {
    const { status, data } = err.response;
    let result = {
      error: "与服务器通讯异常，您的网络可能出现了问题！",
      code: "0000"
    };
    if (err.message && err.message === "canceled") {
      result = {
        ...result,
        code: "canceled",
        error: "连接被断开！"
      };
    }
    if (status === 404) {
      result = {
        ...result,
        error: "网络请求不存在404！"
      };
    }
    if (status === 401) {
      result = {
        ...result,
        error: data.error,
        code: 401
      };
    }
    return Promise.reject(result);
  }
);

export default axios;
