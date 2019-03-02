import React from "react";
import cls from "classnames";
import { Grid, Form, Input, Button, Icon, Dialog } from "@alifd/next";
import config from "$S/config";
import spaceIcon from "$A/img/space.svg";
import logo from "$A/img/logo.png";
import styles from "./.module.less";

const { Row, Col } = Grid;
const FormItem = Form.Item;
const copyrightStyle = cls(["text-ellipsisl", "text-center", styles.copyright]);
const bgStyle = cls(styles["space-img"], "fr");
const logoStyle = cls([styles.logo, "mr16"]);

export default class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      register: false
    };
  }

  showRegister = () => {
    this.setState({ register: true });
  };

  hideRegister = () => {
    this.setState({ register: false });
  };

  render() {
    return (
      <div className="full bg-dark pos-rel hidden">
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
                <FormItem required hasFeedback requiredMessage="请输入账号!">
                  <Input
                    addonTextBefore={<Icon type="androidperson" size="small" />}
                    placeholder="请输入账号"
                    name="account"
                  />
                </FormItem>
                <FormItem required hasFeedback requiredMessage="请输入密码!">
                  <Input
                    addonTextBefore={<Icon type="iosunlocked" size="small" />}
                    placeholder="请输入密码"
                    name="password"
                    htmlType="password"
                  />
                </FormItem>
                <FormItem className="text-right">
                  <Button text onClick={this.showRegister}>
                    <Icon type="smile" /> 立即注册
                  </Button>
                </FormItem>
                <FormItem>
                  <Form.Submit
                    validate
                    type="primary"
                    style={{ width: "100%" }}
                    onClick={(v, e) => console.log(v)}
                  >
                    登录
                  </Form.Submit>
                </FormItem>
              </Form>
            </div>
          </Col>
        </Row>
        <p className={copyrightStyle}>{config.copyright}</p>

        <Dialog
          title="注册账号"
          closeable={false}
          visible={this.state.register}
          onOk={this.hideRegister}
          onCancel={this.hideRegister}
          onClose={this.hideRegister}
        >
          <Form className={styles.form}>
            <FormItem required hasFeedback requiredMessage="请输入账号!">
              <Input
                addonTextBefore={<Icon type="androidperson" size="small" />}
                placeholder="请输入账号"
                name="account"
              />
            </FormItem>
            <FormItem required hasFeedback requiredMessage="请输入密码!">
              <Input
                addonTextBefore={<Icon type="iosunlocked" size="small" />}
                placeholder="请输入密码"
                name="password"
              />
            </FormItem>
            <FormItem required hasFeedback requiredMessage="请确认密码!">
              <Input
                addonTextBefore={<Icon type="iosunlocked" size="small" />}
                placeholder="请确认密码"
                name="confirm"
              />
            </FormItem>
          </Form>
        </Dialog>
      </div>
    );
  }
}
