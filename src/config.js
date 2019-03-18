export default {
  siteName: "Jallen Admin",
  copyright: "Jallen Admin © 2019 by gaojingran",
  imageAccept: "image/png, image/jpg, image/jpeg, image/gif, image/bmp",
  pattern: {
    mail: {
      pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
      message: "请输入正确邮箱格式!"
    }
  },
  sessionKey: {
    token: "sessionToken",
    isAutoLogin: "isAutoLogin",
    isCacheAccount: "isCacheAccount",
    cacheAccount: "cacheAccount"
  },
  imgPrefix: "/jallen/image/",
  ajxPrefix: "/jallen",
  ajaxAddress: {
    register: "/public/register",
    login: "/public/login",
    userInfo: "/api/user-info",
    updateUserInfo: "/api/update-user",
    updateAvatar: "/api/update-avatar",
    changePwd: "/api/change-pwd"
  }
};
