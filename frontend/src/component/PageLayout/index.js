import React from 'react';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';

import './style.css';
import { Link } from 'react-router-dom';

const { Header, Content } = Layout;

export default function PageLayout({ children }) {
  return (
    <Layout className="layout">
      <Header className="header">
        <Link className='link start' to={'/'}>主页</Link>
        <Link className='link end' to={'/login'}>登录</Link>
      </Header>
      <Content className="content">{children}</Content>
    </Layout>
  )
}
