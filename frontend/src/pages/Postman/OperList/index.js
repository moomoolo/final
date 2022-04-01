import React from 'react'
import { Link } from 'react-router-dom';
import OperCard from '../../../component/OperCard';

import styles from './style.module.css';

export default function OperList() {
  return (
    <div className={styles.wrapper}>
        <Link to={'/postman/new_order'}>
            <OperCard>新建</OperCard>
        </Link>
        <Link to={'/postman/receive'}>
          <OperCard>接收</OperCard>
        </Link>
        <Link to={'/postman/send'}>
          <OperCard>发送</OperCard>
        </Link>
        <Link to={'/postman/deliver'}>
          <OperCard>派送</OperCard>
        </Link>
        <Link to={'/postman/end'}>
          <OperCard>结束</OperCard>
        </Link>
        
    </div>
  )
}
