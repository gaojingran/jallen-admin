import React from "react";
import cls from "classnames";
import { Nav, Balloon } from "@alifd/next";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getScrollBarWidth } from "$U/dom";
import RouteWithSubRoutes from "$C/RouteWithSubRoutes";
import PrivateRoute from "$H/privateRoute";
import withAsync from "$H/withAsync";
import { sysLogout } from "$U/utils";
import UserInfo from "./UserInfo";
import config from "../../config";
import styles from "./.module.less";

const barWidth = getScrollBarWidth();
const mapStateToProps = ({ user }) => ({
  userInfo: user.userInfo
});

export default
@PrivateRoute
@connect(mapStateToProps)
@withAsync
class Frame extends React.PureComponent {
  componentDidMount() {
    this.getUserInfo();
  }

  // 获取用户信息
  getUserInfo = () => {
    this.props.dispatch({ type: "user/getUserInfo" });
  };

  handleSelect = ([key]) => {
    this.props.history.push(key);
  };

  handleLogout = () => {
    const { history, location } = this.props;
    sysLogout(history, location);
  };

  goAccountSetting = () => {
    const { history } = this.props;
    history.push("/account-setting");
  };

  _avatar = () => {
    const { userInfo } = this.props;
    return (
      <div className={cls([styles.avatar, "mt24", "mb24", "bg-dark"])}>
        <img src={`${config.imgPrefix}${userInfo.avatar}`} alt="avatar" />
      </div>
    );
  };

  render() {
    const { routes, match, location, userInfo } = this.props;
    // 菜单需要展示的子页面
    const navRoutes = routes.filter(v => !v.notInNav);

    return userInfo.account ? (
      <div className="full bg-dark">
        <div className={cls(styles.sider, "bg-secondary")}>
          <div className={styles.inner} style={{ marginRight: -barWidth }}>
            <Balloon
              align="rt"
              alignEdge
              triggerType="hover"
              closable={false}
              trigger={this._avatar()}
              style={{ width: 400 }}
            >
              <UserInfo
                userInfo={userInfo}
                handleLogout={this.handleLogout}
                handleEdit={this.goAccountSetting}
              />
            </Balloon>
            <Nav
              className={styles.nav}
              selectedKeys={[location.pathname]}
              onSelect={this.handleSelect}
              iconOnly
              hasTooltip
              type="primary"
              direction="ver"
              activeDirection="left"
            >
              {navRoutes.map(v => (
                <Nav.Item key={v.path} icon={v.icon}>
                  {v.name}
                </Nav.Item>
              ))}
            </Nav>
          </div>
        </div>
        <div className={styles.container}>
          {routes.map(route => (
            <RouteWithSubRoutes key={route.path} {...route} />
          ))}
          {navRoutes.length && match.url === location.pathname ? (
            <Redirect to={navRoutes[0].path} />
          ) : null}
        </div>
      </div>
    ) : null;
  }
}
