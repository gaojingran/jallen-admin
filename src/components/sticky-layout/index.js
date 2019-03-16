import React from "react";
import config from "../../config";
import styles from "./.module.less";

export default function({ children }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>{children}</div>
      <div className={styles.footer}>
        <p>{config.copyright}</p>
      </div>
    </div>
  );
}
