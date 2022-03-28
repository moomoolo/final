import { Descriptions, Input, message } from 'antd'
import React, { useState } from 'react'
import { renderHashInTable } from '../../common';

import PageLayoutWithContent from '../../component/PageLayoutWithContent'
import { api } from '../../config';
import styles from './style.module.css';

export default function Home() {
  const [detail, setDetail] = useState(null);

  const onSearch = (hash) => {
    fetch(api.ORDER_DETAIL_GET + hash, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setDetail(data);
        })
      } else {
        message.error("获取订单失败");
      }
    })
  }

  return (
    <PageLayoutWithContent>
      <div className={detail ? styles.wrapper_detail : styles.wrapper}>
        <Input.Search
          className={styles.search}
          size={'large'}
          placeholder={'输入订单号查询'}
          onSearch={onSearch}
        />
        { detail && (
          <Descriptions
            column={2}
            bordered
            className={styles.desc}
          >
            <Descriptions.Item label="寄件人">{detail.senderName}</Descriptions.Item>
            <Descriptions.Item label="寄件人电话">{detail.senderPhone}</Descriptions.Item>
            <Descriptions.Item label="寄件人地址">{detail.fromAddress}</Descriptions.Item>
            <Descriptions.Item label="收件人">{detail.recieverName}</Descriptions.Item>
            <Descriptions.Item label="收件人电话">{detail.recieverPhone}</Descriptions.Item>
            <Descriptions.Item label="收件人地址">{detail.toAddress}</Descriptions.Item>
            <Descriptions.Item label="寄件站点">{detail.fromStationStr}</Descriptions.Item>
            <Descriptions.Item label="收件站点">{detail.toStationStr}</Descriptions.Item>
          </Descriptions>
        )}
      </div>
    </PageLayoutWithContent>
  )
}
