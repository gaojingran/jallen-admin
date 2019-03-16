import React from "react";
import { Message } from "@alifd/next";
import is from "./is";
import { storage, session } from "./storage";
import config from "../config";

const { sessionKey } = config;

// message 格式化
export const messageHandler = (type, text, option) => {
  return Message[type]({
    content: <span className="v-middle">{text}</span>,
    ...option
  });
};

// 获取token
export const getSessionToken = () => {
  return storage.get(sessionKey.token) || session.get(sessionKey.token);
};

// 获取account
export const getUserAccount = () => {
  return (
    storage.get(sessionKey.cacheAccount) || session.get(sessionKey.cacheAccount)
  );
};

// 退出登录
export const sysLogout = (history, location) => {
  storage.set(sessionKey.token, null);
  session.set(sessionKey.token, null);
  history.push({
    pathname: "/login",
    state: {
      from: location.pathname
    }
  });
};

// 文本格式化 null 或 undefind 输出 ----
export const stringFormat = str => {
  return is.Defined(str) ? str : "- - - -";
};

// base64转文件流
export const convertBase64UrlToFile = urlData => {
  const bytes = window.atob(urlData.split(",")[1]);

  const ab = new ArrayBuffer(bytes.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }

  const blob = new Blob([ab], { type: "image/png" });

  return new File([blob], "test.png", { type: "image/png" });
};
