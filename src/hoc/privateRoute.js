import React from "react";
import { Redirect } from "react-router-dom";
import { getSessionToken } from "$U/utils";

export default function PrivateRoute(Component) {
  return class PrivateRouteHoc extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isLogin: this.checkLogin()
      };
    }

    checkLogin = () => {
      return getSessionToken();
    };

    render() {
      const { isLogin } = this.state;
      if (isLogin) {
        return <Component {...this.props} />;
      } else {
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: this.props.location.pathname || '' }
            }}
          />
        );
      }
    }
  };
}
