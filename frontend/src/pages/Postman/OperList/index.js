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
        <OperCard>接收</OperCard>
        <OperCard>发送</OperCard>
    </div>
  )
}
