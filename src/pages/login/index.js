import React from "react";
import cls from "classnames";
import {
  Grid,
  Form,
  Input,
  Button,
  Icon,
  Checkbox,
  Message
} from "@alifd/next";
import { storage, session } from "$U/storage";
import { getSessionToken } from "$U/utils";
import config from "$S/config";
// import spaceIcon from "$A/img/space.svg";
import logo from "$A/img/logo.png";
import withAsync from "$H/withAsync";
import Register from "$C/Register";
import LottieIcon from "$C/Lottie";
import styles from "./.module.less";

const { Row, Col } = Grid;
const FormItem = Form.Item;
const copyrightStyle = cls(["text-ellipsisl", "text-center", styles.copyright]);
// const bgStyle = cls(styles["space-img"], "fr");
const logoStyle = cls([styles.logo, "mr16"]);

export default
@withAsync
class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.isCacheAccount = storage.get(config.sessionKey.isCacheAccount);
    this.cacheAccount = storage.get(config.sessionKey.cacheAccount);
    this.state = {
      isAutoLogin: storage.get(config.sessionKey.isAutoLogin),
      register: false,
      loading: false
    };
    this.checkIsLogin();
  }

  // 检查是否已经登录
  checkIsLogin = () => {
    if (getSessionToken()) {
      this.props.history.goBack();
    }
  };

  // 记住账号
  handleCacheAccount = v => {
    this.cacheAccount = v;
    storage.set(config.sessionKey.isCacheAccount, v);
  };

  // 自动登录
  handleAutoLogin = v => {
    this.setState({ isAutoLogin: v });
    storage.set(config.sessionKey.isAutoLogin, v);
  };

  // 登录
  handleLogin = async (val, err) => {
    if (!err && !this.state.loading) {
      this.setState({ loading: true });
      try {
        const { data } = await this.props.ajax("login", val);
        // 缓存账号
        if (this.isCacheAccount) {
          storage.set(config.sessionKey.cacheAccount, val.account);
        } else {
          session.set(config.sessionKey.cacheAccount, val.account);
        }
        // 缓存token
        if (this.state.isAutoLogin) {
          storage.set(config.sessionKey.token, data.token);
        } else {
          session.set(config.sessionKey.token, data.token);
        }
        const nextPath =
          this.props.location.state && this.props.location.state.from;
        this.props.history.replace(nextPath || "/");
      } catch (err) {
        this.props.ajaxNotify(err);
        this.setState({ loading: false });
      }
    }
  };

  showRegister = () => {
    this.setState({ register: true });
  };

  hideRegister = () => {
    this.setState({ register: false });
  };

  render() {
    const { loading, register, isAutoLogin } = this.state;
    return (
      <div className="full bg-dark pos-rel hidden flex">
        <Row
          className="full"
          align="center"
          gutter={64}
          style={{ marginLeft: 0 }}
        >
          <Col span={12}>
            <div className="fr">
              <LottieIcon width={480} height={480} name="rocket" />
            </div>
            {/**
             *  <img className={bgStyle} src={spaceIcon} alt="背景图" />
             */}
          </Col>
          <Col span={12}>
            <div className={styles.form}>
              <Row align="center">
                <img className={logoStyle} src={logo} alt="logo" />
                <h1>{config.siteName}</h1>
              </Row>
              <Form className={styles.form}>
                <FormItem
                  required
                  hasFeedback
                  requiredMessage="请输入账号!"
                  autoValidate={false}
                  minLength={4}
                  maxLength={16}
                  minmaxLengthMessage="账号长度为4到16位!"
                >
                  <Input
                    defaultValue={this.cacheAccount}
                    addonTextBefore={<Icon type="androidperson" size="small" />}
                    placeholder="请输入账号"
                    name="account"
                  />
                </FormItem>
                <FormItem
                  required
                  hasFeedback
                  requiredMessage="请输入密码!"
                  autoValidate={false}
                  minLength={6}
                  maxLength={16}
                  minmaxLengthMessage="密码长度为6到16位!"
                >
                  <Input
                    addonTextBefore={<Icon type="iosunlocked" size="small" />}
                    placeholder="请输入密码"
                    name="password"
                    htmlType="password"
                  />
                </FormItem>
                <Row justify="space-between">
                  <Row>
                    <FormItem className="mr16">
                      <Checkbox
                        onChange={this.handleCacheAccount}
                        defaultChecked={this.isCacheAccount}
                      >
                        记住账号
                      </Checkbox>
                    </FormItem>

                    <FormItem>
                      <Checkbox
                        onChange={this.handleAutoLogin}
                        checked={isAutoLogin}
                      >
                        自动登录
                      </Checkbox>
                    </FormItem>
                  </Row>

                  <FormItem className="text-right">
                    <Button text onClick={this.showRegister}>
                      <Icon type="smile" /> 立即注册
                    </Button>
                  </FormItem>
                </Row>

                <Message type="notice" visible={isAutoLogin} shape="toast">
                  请勿在不安全设备上使用
                  <span className="info-light-color"> 自动登录 </span>!
                </Message>

                <FormItem style={{ marginTop: isAutoLogin ? 16 : 0 }}>
                  <Form.Submit
                    validate
                    type="primary"
                    style={{ width: "100%" }}
                    loading={loading}
                    onClick={this.handleLogin}
                  >
                    登录
                  </Form.Submit>
                </FormItem>
              </Form>
            </div>
          </Col>
        </Row>
        <p className={copyrightStyle}>{config.copyright}</p>
        <Register visible={register} handleCancel={this.hideRegister} />
      </div>
    );
  }
}
