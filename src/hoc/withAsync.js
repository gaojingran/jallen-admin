import React from "react";
import omit from "omit";
import { Message } from "@alifd/next";
import axios from "$U/request";
import { storage, session } from "$U/storage";
import { sysLogout } from "$U/utils";
import config from "../config";

const { ajaxAddress } = config;

/**
 * INFO 如果要在redux中获取withAsync中方法必须在connect组件后再withAsync组件
 **/
export default function withAsync(Component) {
  return class HocComponent extends React.Component {
    constructor(props) {
      super(props);
      this.httpDefers = [];
      this.dispatch = this.dispatchEnhance();
    }

    componentWillUnmount() {
      Message.hide();
      while (this.httpDefers.length) {
        try {
          this.httpDefers.pop().cancel("canceled");
        } catch (e) {
          console.log("httpDefers:", e);
        }
      }
    }

    dispatchEnhance = () => {
      if (this.props.dispatch && typeof this.props.dispatch === "function") {
        return ({ type, payload = {} }) => {
          this.props.dispatch({
            type,
            payload: {
              ...payload,
              ajax: this.ajax,
              ajaxNotify: this.ajaxNotify
            }
          });
        };
      }
    };

    ajax = (key, data, config = {}) => {
      const cancel = config.cancelToken || axios.CancelToken.source();
      // 外部传入的canceltoken由外部手动cancel
      if (!config.cancelToken) {
        this.httpDefers.push(cancel);
      }
      return axios({
        method: data ? "POST" : "GET",
        url: ajaxAddress[key],
        data: data,
        cancelToken: cancel.token,
        ...omit(["cancelToken"], config)
      });
    };

    ajaxNotify = err => {
      const authError = err.code === 401;
      Message.show({
        type: "warning",
        duration: authError ? 1000 * 60 : 3000,
        content: authError ? (
          <span className="v-middle">
            用户信息验证失效,请
            <span className="link" onClick={this.goLogin}>
              {" "}
              重新登录{" "}
            </span>
            !
          </span>
        ) : (
          <span className="v-middle">{err.error || err.toString()}</span>
        )
      });
    };

    goLogin = e => {
      e.preventDefault();
      const { history, location } = this.props;
      sysLogout(history, location);
    };

    render() {
      return (
        <Component
          {...this.props}
          ajax={this.ajax}
          ajaxNotify={this.ajaxNotify}
          dispatch={this.dispatch}
        />
      );
    }
  };
}
