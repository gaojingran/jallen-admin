import React from "react";
import { Button, Icon, Grid } from "@alifd/next";
import Lottie from "$C/Lottie";
import config from "../../config";
import styles from "./.module.less";

const { Row, Col } = Grid;

export default ({ userInfo, handleLogout, handleEdit }) => (
  <div className={styles.infoCard}>
    <Row justify="end">
      <Button text type="secondary" className="mr16" onClick={handleEdit}>
        <Icon type="compose" /> 编辑
      </Button>
      <Button text type="secondary" onClick={handleLogout}>
        <Icon type="power" /> 退出登录
      </Button>
    </Row>
    <Row className="mt8 mb8" align="center">
      <Col className={styles.avatar}>
        <img alt="avatar" src={`${config.imgPrefix}${userInfo.avatar}`} />
        <div className={styles.star}>
          <Lottie name="stars" width={100} height={100} />
        </div>
      </Col>
      <Col className={styles.content}>
        <h5 className="text-ellipsis mt0 mb0" title={userInfo.nickname}>
          {userInfo.nickname}
        </h5>
        <p className="text-ellipsis subtitle mt0 mb0">
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
        <p className="text-ellipsis subtitle mt0 mb0">
          <Icon size="small" type="socialsnapchat" className="mr8" />
          <span className="v-middle">{userInfo.account}</span>
        </p>
        <p className="subtitle mt0 mb0">{userInfo.introduce}</p>
      </Col>
    </Row>
  </div>
);
