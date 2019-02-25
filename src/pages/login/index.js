

import React from 'react';
import { Button } from '@alifd/next';
import styles from './.module.less';

export default class Login extends React.Component {
  render() {
    return (
      <div className={styles.login}>
        <Button type="primary">login</Button>
      </div>
    )
  }
}

