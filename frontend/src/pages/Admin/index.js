
import { Layout, Menu } from 'antd'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { Link } from 'react-router-dom'
import PageContent from '../../component/PageContent'
import PageHeader from '../../component/PageHeader'
import PageLayout from '../../component/PageLayout'
import PageSider from '../../component/PageSider'
import UserList from './UserList'

export default function Admin() {
  return (
      <PageLayout>
          <PageHeader />
          <Layout>
            <PageSider>
                <Menu>
                    <Menu.Item key={'user_list'}>
                        <Link to='user_list'>用户列表</Link>
                    </Menu.Item>
                </Menu>
            </PageSider>
            <PageContent>
                <Routes>
                    <Route index element={<Navigate to={'user_list'} />} />
                    <Route path='user_list' element={<UserList />} />
                </Routes>
            </PageContent>
          </Layout>
      </PageLayout>
  )
}
