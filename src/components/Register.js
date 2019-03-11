

import React from "react";
import { Dialog, Form, Icon, Input, Field, Message } from '@alifd/next';
import withAsync from "$H/withAsync";

const FormItem = Form.Item;

export default
@withAsync
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.field = new Field(this);
    this.state = {
      loading: false,
    };
  }

  checkAccount = (rule, value, callback) => {
    if (value && (value.length < 4 || value.length > 16)) {
      callback('账号长度为4到16位!');
    }
    callback()
  }

  checkPass = (rule, value, callback) => {
    const { validate } = this.field;
    if (value) {
      if (value.length < 6 || value.length > 16) {
        callback('密码长度为6到16位!');
      } else {
        validate(['confirm']);
      }
    }
    callback();
  }

  checkConfirmPass = (rule, value, callback) => {
    const { getValue } = this.field;
    if (value && value !== getValue('password')) {
      callback('两次密码输入不一致!');
    }
    callback();
  }

  handleRegister = async (v, err) => {
    if (!err) {
      this.setState({ loading: true });
      try {
        await this.props.ajax('register', { account: v.account, password: v.password });
        Message.success('注册成功!');
        this.props.handleCancel();
      } catch (err) {
        this.props.ajaxNotify(err);
      }
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading } = this.state;
    const { visible, handleCancel } = this.props;
    return (
      <Dialog
        title="注册账号"
        footer={false}
        visible={visible}
        onOk={this.handleRegister}
        onClose={() => !loading && handleCancel()}
      >
        <Form style={{ width: 380 }} field={this.field}>
          <FormItem
            required
            hasFeedback
            requiredMessage="请输入账号!"
            autoValidate={false}
            validator={this.checkAccount}>
            <Input
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
            validator={this.checkPass}>
            <Input
              addonTextBefore={<Icon type="iosunlocked" size="small" />}
              placeholder="请输入密码"
              name="password"
              htmlType="password"
            />
          </FormItem>
          <FormItem
            required
            hasFeedback
            requiredMessage="请确认密码!"
            autoValidate={false}
            validator={this.checkConfirmPass}>
            <Input
              addonTextBefore={<Icon type="iosunlocked" size="small" />}
              placeholder="请确认密码"
              name="confirm"
              htmlType="password"
            />
          </FormItem>
          <FormItem>
            <Form.Submit
              validate
              type="primary"
              style={{ width: "100%" }}
              loading={loading}
              onClick={this.handleRegister}
            >
              注册
            </Form.Submit>
          </FormItem>
        </Form>
      </Dialog>
    );
  }
}
