import React from "react";
import { Message } from "@alifd/next";
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
  return (
    storage.get(sessionKey.token) || session.get(sessionKey.token)
  );
};

// 获取account
export const getUserAccount = () => {
  return (
    storage.get(sessionKey.cacheAccount) ||
    session.get(sessionKey.cacheAccount)
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
