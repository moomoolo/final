import React from 'react';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import { useSelector } from 'react-redux';

import './style.css';
import { Link } from 'react-router-dom';

const { Header, Content } = Layout;

export default function PageLayout({ children }) {
  const userInfo = useSelector(state => state.userInfo);

  return (
    <Layout className="layout">
      <Header className="header">
        <Link className='link start' to={'/'}>主页</Link>
        {!userInfo && <Link className='link end' to={'/login'}>登录</Link>}
        {userInfo && <div className='name end'>{userInfo.nameStr}</div>}
      </Header>
      <Content className="content">{children}</Content>
    </Layout>
  )
}
