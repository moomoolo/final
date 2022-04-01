import { Descriptions, Input, message, Steps } from 'antd'
import React, { useState } from 'react'
import { getHeader } from '../../common';

import PageLayoutWithContent from '../../component/PageLayoutWithContent'
import { api } from '../../config';
import styles from './style.module.css';

export default function Home() {
  const [detail, setDetail] = useState(null);
  const [actionList, setActionList] = useState([]);

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
    fetch(api.ORDER_ACTIONS_GET + hash, {
      method: 'GET',
      headers: getHeader()
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setActionList(data);
          console.log(data);
        })
      } else {
        message.error("获取物流进度失败");
      }
    })
  }

  const steps = [];
  let currentStep = 1;
  actionList.forEach((item) => {
    const step = {};
    switch (item.action) {
      case 'START': {
        step.title = item.toStationStr;
        step.desc = `${item.toStationStr}已创建订单，操作人： ${item.operatorStr}`
        break;
      }
      case 'SEND': {
        step.title = item.fromStationStr;
        step.desc = `${item.fromStationStr}已发货，下一站：${item.toStationStr}，操作人：${item.operatorStr}`
        break;
      }
      case 'RECEIVE': {
        step.title = item.fromStationStr;
        step.desc = `${item.fromStationStr}已收货，操作人：${item.operatorStr}`
        break;
      }
      case 'DELIVER': {
        step.title = item.fromStationStr;
        step.desc = `正在派送，操作人${item.operatorStr}`
        break;
      }
      case 'END': {
        step.title = '订单已完成'
        step.desc = ''
      }
      default: break;
    }
    steps.push(step);
  })

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
          <>
            <Descriptions
              column={2}
              bordered
              className={styles.desc}
            >
              <Descriptions.Item label="寄件人">{detail.senderName}</Descriptions.Item>
              <Descriptions.Item label="寄件人电话">{detail.senderPhone}</Descriptions.Item>
              <Descriptions.Item label="寄件人地址">{detail.fromAddress}</Descriptions.Item>
              <Descriptions.Item label="收件人">{detail.receiverName}</Descriptions.Item>
              <Descriptions.Item label="收件人电话">{detail.receiverPhone}</Descriptions.Item>
              <Descriptions.Item label="收件人地址">{detail.toAddress}</Descriptions.Item>
              <Descriptions.Item label="寄件站点">{detail.fromStationStr}</Descriptions.Item>
              <Descriptions.Item label="收件站点">{detail.toStationStr}</Descriptions.Item>
              <Descriptions.Item label="当前站点">{detail.curStationStr}</Descriptions.Item>
            </Descriptions>
            <Steps
              direction={'vertical'}
              className={styles.steps}
              current={steps.length}
            >
              {
                steps.map((item) => {
                  return <Steps.Step title={item.title} description={item.desc}/>
                })
              }
            </Steps>
          </>
        )}
      </div>
    </PageLayoutWithContent>
  )
}
