import React from "react";
import { Layout } from "antd";

import styles from './style.module.css';

const { Content } = Layout;

export default function PageContent({ children }) {
  return (
    <Content className={styles.content}>{children}</Content>
  );
}
