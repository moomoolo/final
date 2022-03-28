import { Button, Form, Input, message, Select, Spin, Descriptions } from "antd";
import React, { useEffect, useState } from "react";
import { getHeader, renderHashInTable } from "../../../common";
import { api } from "../../../config";

import styles from './style.module.css';


let info;

export default function NewOrder() {
  const [finish, setFinish] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [stationList, setStationList] = useState([]);
  const [diable, setDisable] = useState(false);

  useEffect(() => {
    info = {};
    fetch(api.STATION_LIST_GET, {
      method: 'GET',
      headers: getHeader()
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          data.forEach((item) => {
            item.key = item.id;
          })
          setStationList(data);
        })
      } else {
        message.error('获取站点列表失败');
      }
    })
  }, [])
  const onCreateOrder = () => {
    setDisable(true);
    fetch(api.NEW_ORDER_POST, {
      method: 'POST',
      headers: getHeader(),
      body: JSON.stringify(info)
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          info.hash = data.orderHash;
          message.success('新建成功');
          setFinish(true);
          setWaiting(false);
        })
      } else {
        message.error('新建失败');
        setDisable(false);
        setWaiting(false);
      }
    })
    setWaiting(true);
  }
  
  console.log(stationList);

  return (
      <div className={styles.wrapper}>
        {waiting && (
          <Spin />
        )}
        {!waiting && !finish &&(
          <Form labelCol={{ span: 8 }} wrapperCol={{ span: 24 }}>
            <Form.Item label="寄件人">
              <Input onChange={(evt) => { info.senderName = evt.target.value; }} />
            </Form.Item>
            <Form.Item label="寄件人电话">
              <Input onChange={(evt) => { info.senderPhone = evt.target.value; }}/>
            </Form.Item>
            <Form.Item label="寄件人地址">
              <Input onChange={(evt) => { info.fromAddress = evt.target.value; }}/>
            </Form.Item>
            <Form.Item label="收件人">
              <Input onChange={(evt) => { info.recieverName = evt.target.value; }} />
            </Form.Item>
            <Form.Item label="收件人电话">
              <Input onChange={(evt) => { info.recieverPhone = evt.target.value; }}/>
            </Form.Item>
            <Form.Item label="收件人地址">
              <Input onChange={(evt) => { info.toAddress = evt.target.value; }}/>
            </Form.Item>
            <Form.Item label="寄件站点">
              <Select onChange={(fromStation) => { info.fromStation = fromStation }}>
                {
                  stationList.map((item) => {
                    return <Select.Option key={item.id} value={item.id}>{item.name_str}</Select.Option>
                  })
                }
              </Select>
            </Form.Item>
            <Form.Item label="收件站点">
              <Select onChange={(toStation) => { info.toStation = toStation }}>
                {
                  stationList.map((item) => {
                    return <Select.Option key={item.id} value={item.id}>{item.name_str}</Select.Option>
                  })
                }
              </Select>
            </Form.Item>
            <Form.Item
              wrapperCol={{ span: 24, offset: 6 }}
            >
              <span>
              <Button style={{ marginRight: '10px'}} onClick={() => {window.location.href='/postman/oper_list'}}>返回</Button>
              <Button 
                type="primary"
                disabled={diable}
                onClick={onCreateOrder}
              >提交</Button>
              </span>
            </Form.Item>
          </Form>
        )}
        {!waiting && finish && (
        <>
        <Descriptions 
          bordered
          column={1}
        >
          <Descriptions.Item label="订单号">{renderHashInTable(info.hash)}</Descriptions.Item>
          <Descriptions.Item label="寄件人">{info.senderName}</Descriptions.Item>
          <Descriptions.Item label="寄件人电话">{info.senderPhone}</Descriptions.Item>
          <Descriptions.Item label="寄件人地址">{info.fromAddress}</Descriptions.Item>
          <Descriptions.Item label="收件人">{info.recieverName}</Descriptions.Item>
          <Descriptions.Item label="收件人电话">{info.recieverPhone}</Descriptions.Item>
          <Descriptions.Item label="收件人地址">{info.toAddress}</Descriptions.Item>
          <Descriptions.Item label="寄件站点">
            {stationList.filter((item) => {console.log(item); return item.id === info.fromStation })[0]?.name_str}
          </Descriptions.Item>
          <Descriptions.Item label="收件站点">
            {stationList.filter((item) => { return item.id === info.toStation })[0]?.name_str}
          </Descriptions.Item>
        </Descriptions>
        <Button style={{ marginRight: '10px'}} onClick={() => {window.location.href='/postman/oper_list'}}>返回</Button>
        </>
        )}
      </div>
  );
}
