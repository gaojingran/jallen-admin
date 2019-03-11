import React from "react";
import cls from "classnames";
import { Grid, Form, Input, Button, Icon, Checkbox } from "@alifd/next";
import { storage } from "$U/storage";
import config from "$S/config";
import spaceIcon from "$A/img/space.svg";
import logo from "$A/img/logo.png";
import withAsync from "$H/withAsync";
import Register from "$C/Register";
import styles from "./.module.less";

const { Row, Col } = Grid;
const FormItem = Form.Item;
const copyrightStyle = cls(["text-ellipsisl", "text-center", styles.copyright]);
const bgStyle = cls(styles["space-img"], "fr");
const logoStyle = cls([styles.logo, "mr16"]);

export default
@withAsync
class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.isCacheAccount = storage.get(config.sessionKey.isCacheAccount);
    this.cacheAccount = storage.get(config.sessionKey.cacheAccount);
    this.state = {
      register: false,
      loading: false
    };
  }

  // 记住账号
  handleCacheAccount = v => {
    this.cacheAccount = v;
    storage.set(config.sessionKey.isCacheAccount, v);
  };

  // 登录
  handleLogin = async (val, err) => {
    if (!err && !this.state.loading) {
      this.setState({ loading: true });
      try {
        const { data } = await this.props.ajax("login", val);
        if (this.isCacheAccount) {
          storage.set(config.sessionKey.cacheAccount, val.account);
        }
        // 缓存token
        storage.set(config.sessionKey.token, data.token);
        this.props.history.replace("/");
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
    const { loading, register } = this.state;
    return (
      <div className="full bg-dark pos-rel hidden flex">
        <Row
          className="full"
          align="center"
          gutter={64}
          style={{ marginLeft: 0 }}
        >
          <Col span={12}>
            <img className={bgStyle} src={spaceIcon} alt="背景图" />
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
                  <FormItem>
                    <Checkbox
                      onChange={this.handleCacheAccount}
                      defaultChecked={this.isCacheAccount}
                    >
                      记住账号
                    </Checkbox>
                  </FormItem>
                  <FormItem className="text-right">
                    <Button text onClick={this.showRegister}>
                      <Icon type="smile" /> 立即注册
                    </Button>
                  </FormItem>
                </Row>
                <FormItem>
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
