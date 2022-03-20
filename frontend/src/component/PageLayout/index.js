import React from 'react';
import { Layout } from 'antd';
import 'antd/dist/antd.css';

import './style.css';

export default function PageLayout({ children }) {
  return (
    <Layout className="layout">{children}</Layout>
  )
}
