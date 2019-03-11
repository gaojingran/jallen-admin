import React from "react";
import cls from "classnames";
import { Nav } from "@alifd/next";
import { Redirect } from "react-router-dom";
import RouteWithSubRoutes from "$C/RouteWithSubRoutes";
import { getScrollBarWidth } from "$U/dom";
import styles from "./.module.less";

const barWidth = getScrollBarWidth();

export default class Frame extends React.PureComponent {
  handleSelect = ([key]) => {
    this.props.history.push(key);
  }

  render() {
    const { routes, match, location } = this.props;
    return (
      <div className="full bg-dark">
        <div className={styles.sider}>
          <div className={styles.inner} style={{ marginRight: -barWidth }}>
            <div className={cls([styles.avatar, "mt24", "mb24", "bg-dark"])}>
              <img
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="avatar"
              />
            </div>
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
              {routes.map(v => (
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
          {routes.length && match.url === location.pathname ? (
            <Redirect to={routes[0].path} />
          ) : null}
        </div>
      </div>
    );
  }
}
