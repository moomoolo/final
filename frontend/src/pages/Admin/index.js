
import { Layout, Menu } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router'
import { Link } from 'react-router-dom'
import PageContent from '../../component/PageContent'
import PageHeader from '../../component/PageHeader'
import PageLayout from '../../component/PageLayout'
import PageSider from '../../component/PageSider'
import StationList from './StationList'
import UserList from './UserList'

import styles from './style.module.css';

export default function Admin() {
  const userInfo = useSelector(state => state.userInfo);
  if (userInfo.role_str !== 'admin') {
      return <Navigate to={'/'}/>
  }
  return (
      <PageLayout>
          <PageHeader />
          <Layout className={styles.wrapper_layout}>
            <Layout.Sider className={styles.sider}>
                <Menu>
                    <Menu.Item key={'user_list'}>
                        <Link to='user_list'>用户列表</Link>
                    </Menu.Item>
                    <Menu.Item key={'station_list'}>
                        <Link to='station_list'>站点列表</Link>
                    </Menu.Item>
                </Menu>
            </Layout.Sider>
            <Layout.Content className={styles.content}>
                <Routes>
                    <Route index element={<Navigate to={'user_list'} />} />
                    <Route path='user_list' element={<UserList />} />
                    <Route path='station_list' element={<StationList />} />
                </Routes>
            </Layout.Content>
          </Layout>
      </PageLayout>
  )
}
