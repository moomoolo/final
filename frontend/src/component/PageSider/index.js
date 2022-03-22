import React from 'react'
import { Layout } from 'antd'

import './style.css';

const { Sider } = Layout;

export default function PageSider({ children }) {
  return (
    <Sider
        className='sider'
    >{children}</Sider>
  )
}
