
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

export default function Admin() {
  const userInfo = useSelector(state => state.userInfo);
  if (userInfo.role_str !== 'admin') {
      return <Navigate to={'/'}/>
  }
  return (
      <PageLayout>
          <PageHeader />
          <Layout>
            <PageSider>
                <Menu>
                    <Menu.Item key={'user_list'}>
                        <Link to='user_list'>用户列表</Link>
                    </Menu.Item>
                    <Menu.Item key={'station_list'}>
                        <Link to='station_list'>站点列表</Link>
                    </Menu.Item>
                </Menu>
            </PageSider>
            <PageContent>
                <Routes>
                    <Route index element={<Navigate to={'user_list'} />} />
                    <Route path='user_list' element={<UserList />} />
                    <Route path='station_list' element={<StationList />} />
                </Routes>
            </PageContent>
          </Layout>
      </PageLayout>
  )
}
