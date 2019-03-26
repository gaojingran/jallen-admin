import React from "react";
import cls from "classnames";
import Cropper from "react-cropper";
import {
  Grid,
  Tab,
  Icon,
  Tag,
  Form,
  Input,
  Select,
  Upload,
  Dialog,
  Loading,
  Field
} from "@alifd/next";
import { connect } from "react-redux";
import withAsync from "$H/withAsync";
import StickyLayout from "$C/sticky-layout";
import {
  stringFormat,
  convertBase64UrlToFile,
  messageHandler,
  getSessionToken,
  getAjaxPath
} from "$U/utils";
import config from "../../config";
import styles from "./.module.less";

const { Row, Col } = Grid;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 3 }
};
const passwordItemLayout = {
  labelCol: { span: 4 }
};
const mapStateToProps = ({ user }) => ({
  userInfo: user.userInfo
});

export default
@connect(mapStateToProps)
@withAsync
class AccountSetting extends React.Component {
  constructor(props) {
    super(props);
    this.field = new Field(this);
    this.uploader = new Upload.Uploader({
      action: getAjaxPath("updateAvatar"),
      headers: {
        Authorization: "Bearer " + getSessionToken()
      },
      onProgress: this.uploaderProgress,
      onError: this.uploaderError,
      onSuccess: this.uploaderSuccess
    });
    this.state = {
      loading: false,
      visible: false,
      imgSrc: ""
    };
  }

  checkConfirmPass = (rule, value, callback) => {
    const { getValue } = this.field;
    if (value && value !== getValue("newPassword")) {
      callback("两次密码输入不一致!");
    }
    callback();
  };

  uploaderProgress = progress => {
    if (!this.state.loading) {
      this.setState({ loading: true });
    }
  };

  uploaderSuccess = value => {
    if (this.state.loading) {
      this.setState({ loading: false });
    }
    const { code, data } = value;
    if (code === 0) {
      this.props.dispatch({
        type: "user/update",
        payload: {
          userInfo: {
            ...this.props.userInfo,
            avatar: data
          }
        }
      });
    }
  };

  uploaderError = error => {
    if (this.state.loading) {
      this.setState({ loading: false });
    }
    messageHandler("error", JSON.stringify(error));
  };

  onImageSelect = files => {
    if (files[0].size / 1024 / 1024 > 4) {
      return messageHandler("warning", "请选择4MB以下图片!");
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({
        imgSrc: reader.result,
        visible: true
      });
    };
    reader.readAsDataURL(files[0]);
  };

  dialogHandleOk = () => {
    const data = this.cropperRef.getCroppedCanvas().toDataURL();
    const blob = convertBase64UrlToFile(data);
    const file = new File([blob], "test.png", { type: "image/png" });
    // start upload
    this.uploader.startUpload(file);
    this.setState({
      visible: false
    });
  };

  cropperDialogCancel = () => {
    this.setState({ visible: false });
  };

  checkUserTag = (rule, value, callback) => {
    if (value && value.length) {
      const overlength = value.find(v => v.length > 8);
      if (overlength) {
        callback("单个标签最大长度不超过8位字符");
      }
      if (value.length > 16) {
        callback("最大可添加16个标签!");
      }
    }
    callback();
  };

  // 保存基本信息
  saveBaseInfo = async (value, error) => {
    if (!error) {
      try {
        this.setState({ loading: true });
        const { data } = await this.props.ajax("updateUserInfo", value);
        this.props.dispatch({
          type: "user/update",
          payload: {
            userInfo: data
          }
        });
      } catch (e) {
        this.props.ajaxNotify(e);
      }
      this.setState({ loading: false });
    }
  };

  // 修改密码
  changePwd = async (value, error) => {
    if (!error) {
      try {
        this.setState({ loading: true });
        await this.props.ajax("changePwd", value);
        messageHandler("success", "密码修改成功!");
        this.field.reset();
      } catch (e) {
        this.props.ajaxNotify(e);
      }
      this.setState({ loading: false });
    }
  };

  render() {
    const { userInfo } = this.props;
    const { loading } = this.state;
    return (
      <StickyLayout>
        <Row gutter={24} wrap className="pt24" style={{ margin: "0 12px" }}>
          <Col xxs={24} s={24} m={6} className="mb24">
            <div className={cls(styles.card, "bg-secondary")}>
              <div className={styles.avatar}>
                <img src={config.imgPrefix + userInfo.avatar} alt="avatar" />
              </div>
              <h4 className="text-center">{userInfo.nickname}</h4>
              <p className="text-center subtitle">
                {stringFormat(userInfo.introduce)}
              </p>
              <div className="divider-dashed mt24" />
              <p className="subtitle mt24">
                <Icon
                  size="small"
                  type="androidstar"
                  className="mr8"
                  style={userInfo.userType === 1 ? { color: "#FFA003" } : {}}
                />
                <span className="v-middle">
                  {userInfo.userType === 1 ? "超级管理员" : "普通用户"}
                </span>
              </p>
              <p className="subtitle">
                <Icon size="small" type="androidmail" className="mr8" />
                <span className="v-middle">{stringFormat(userInfo.mail)}</span>
              </p>
              <p className="subtitle">
                <Icon size="small" type="cube" className="mr8" />
                <span className="v-middle">
                  {stringFormat(userInfo.company)}
                </span>
              </p>
              <p className="subtitle">
                <Icon
                  size="small"
                  type="erlenmeyerflaskbubbles"
                  className="mr8"
                />
                <span className="v-middle">{stringFormat(userInfo.job)}</span>
              </p>
              <p className="subtitle">
                <Icon size="small" type="earth" className="mr8" />
                <span className="v-middle">
                  {stringFormat(userInfo.address)}
                </span>
              </p>
              <div className="divider-dashed mt24" />
              <h5 className="mb8">标签</h5>
              {userInfo.userTag.length ? (
                <Tag.Group>
                  {userInfo.userTag.map(v => (
                    <Tag type="normal" key={v} size="small">
                      {v}
                    </Tag>
                  ))}
                </Tag.Group>
              ) : (
                <p>- - - -</p>
              )}
            </div>
          </Col>
          <Col xxs={24} s={24} m={18} className="mb24">
            <div className={cls(styles.card, "bg-secondary")}>
              <Tab>
                <Tab.Item title="基本设置" key="1">
                  <Form
                    className="mt24"
                    style={{ width: 500 }}
                    labelAlign="left"
                  >
                    <FormItem label="头像:" {...formItemLayout}>
                      <div className={styles.uploadItem}>
                        <Upload.Selecter
                          accept={config.imageAccept}
                          onSelect={this.onImageSelect}
                        >
                          <img
                            style={{ width: 100, height: 100 }}
                            src={config.imgPrefix + userInfo.avatar}
                            alt="avatar"
                          />
                        </Upload.Selecter>
                      </div>
                    </FormItem>
                    <FormItem
                      required
                      label="昵称:"
                      requiredMessage="昵称不能为空!"
                      {...formItemLayout}
                      autoValidate={false}
                      maxLength={16}
                      minmaxLengthMessage="最大长度不超过16位字符!"
                    >
                      <Input
                        defaultValue={userInfo.nickname}
                        hasClear
                        name="nickname"
                        placeholder="请输入昵称"
                      />
                    </FormItem>
                    <FormItem
                      label="描述:"
                      {...formItemLayout}
                      autoValidate={false}
                      maxLength={256}
                      minmaxLengthMessage="最大长度不超过256位字符!"
                    >
                      <Input.TextArea
                        defaultValue={userInfo.introduce}
                        maxLength={256}
                        hasLimitHint
                        placeholder="请输入描述"
                        name="introduce"
                      />
                    </FormItem>
                    <FormItem
                      label="邮箱:"
                      {...formItemLayout}
                      autoValidate={false}
                      pattern={config.pattern.mail.pattern}
                      patternMessage={config.pattern.mail.message}
                    >
                      <Input
                        defaultValue={userInfo.mail}
                        hasClear
                        name="mail"
                        placeholder="请输入邮箱"
                      />
                    </FormItem>
                    <FormItem
                      label="公司:"
                      {...formItemLayout}
                      autoValidate={false}
                      maxLength={32}
                      minmaxLengthMessage="最大长度不超过32位字符!"
                    >
                      <Input
                        defaultValue={userInfo.company}
                        hasClear
                        name="company"
                        placeholder="请输入公司名称"
                      />
                    </FormItem>
                    <FormItem
                      label="职位:"
                      {...formItemLayout}
                      autoValidate={false}
                      maxLength={16}
                      minmaxLengthMessage="最大长度不超过16位字符!"
                    >
                      <Input
                        defaultValue={userInfo.job}
                        hasClear
                        name="job"
                        placeholder="请输入职位"
                      />
                    </FormItem>
                    <FormItem
                      label="地址:"
                      {...formItemLayout}
                      autoValidate={false}
                      maxLength={32}
                      minmaxLengthMessage="最大长度不超过32位字符!"
                    >
                      <Input
                        defaultValue={userInfo.address}
                        hasClear
                        name="address"
                        placeholder="请输入地址"
                      />
                    </FormItem>
                    <FormItem
                      label="标签:"
                      {...formItemLayout}
                      validator={this.checkUserTag}
                      autoValidate={false}
                    >
                      <Select
                        mode="tag"
                        defaultValue={userInfo.userTag || []}
                        style={{ width: "100%" }}
                        name="userTag"
                        notFoundContent={<span>回车添加标签</span>}
                      />
                    </FormItem>
                    <FormItem wrapperCol={{ offset: 3 }}>
                      <Form.Submit
                        validate
                        type="primary"
                        className="mr8"
                        onClick={this.saveBaseInfo}
                      >
                        保存
                      </Form.Submit>
                      <Form.Reset>重置</Form.Reset>
                    </FormItem>
                  </Form>
                  <Dialog
                    closeable={false}
                    visible={this.state.visible}
                    onCancel={this.cropperDialogCancel}
                    onOk={this.dialogHandleOk}
                  >
                    <Cropper
                      ref={c => (this.cropperRef = c)}
                      src={this.state.imgSrc}
                      style={{ height: 300, width: 300 }}
                    />
                  </Dialog>
                </Tab.Item>
                <Tab.Item title="修改密码" key="2">
                  <Form
                    className="mt24"
                    style={{ width: 500 }}
                    labelAlign="left"
                    field={this.field}
                  >
                    <FormItem
                      {...passwordItemLayout}
                      label="旧密码:"
                      required
                      hasFeedback
                      requiredMessage="请输入密码!"
                      autoValidate={false}
                      minLength={6}
                      maxLength={16}
                      minmaxLengthMessage="密码长度为6到16位!"
                    >
                      <Input
                        placeholder="请输入密码"
                        name="password"
                        htmlType="password"
                      />
                    </FormItem>
                    <FormItem
                      {...passwordItemLayout}
                      label="新密码:"
                      required
                      hasFeedback
                      requiredMessage="请输入新密码!"
                      autoValidate={false}
                      minLength={6}
                      maxLength={16}
                      minmaxLengthMessage="密码长度为6到16位!"
                    >
                      <Input
                        placeholder="请输入新密码"
                        name="newPassword"
                        htmlType="password"
                      />
                    </FormItem>
                    <FormItem
                      {...passwordItemLayout}
                      label="确认密码:"
                      required
                      hasFeedback
                      requiredMessage="请确认新密码!"
                      autoValidate={false}
                      validator={this.checkConfirmPass}
                    >
                      <Input
                        placeholder="请确认新密码"
                        name="confirm"
                        htmlType="password"
                      />
                    </FormItem>
                    <FormItem wrapperCol={{ offset: 4 }}>
                      <Form.Submit
                        validate
                        type="primary"
                        className="mr8"
                        onClick={this.changePwd}
                      >
                        保存
                      </Form.Submit>
                      <Form.Reset>重置</Form.Reset>
                    </FormItem>
                  </Form>
                </Tab.Item>
              </Tab>
            </div>
          </Col>
          <Loading visible={loading} fullScreen />
        </Row>
      </StickyLayout>
    );
  }
}
