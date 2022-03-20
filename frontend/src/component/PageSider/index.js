import React from 'react'
import { Layout } from 'antd'

import './style.css';

const { Sider } = Layout;

export default function PageSider({ children }) {
  return (
    <Sider
        className='sider'
        width={240}
    >{children}</Sider>
  )
}
