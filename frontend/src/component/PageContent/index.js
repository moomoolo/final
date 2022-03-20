import React from "react";
import { Layout } from "antd";

import './style.css';

const { Content } = Layout;

export default function PageContent({ children }) {
  return (
    <Content className="content">{children}</Content>
  );
}
