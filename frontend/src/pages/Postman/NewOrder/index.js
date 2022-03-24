import { Button, Form, Input, message, Select } from "antd";
import React, { useEffect, useState } from "react";
import { getHeader } from "../../../common";
import { api } from "../../../config";

import styles from './style.module.css';

export default function NewOrder() {
  const [finish, setFinish] = useState(false);
  const [stationList, setStationList] = useState([]);
  
  useEffect(() => {
    fetch(api.STATION_LIST_GET, {
      method: 'GET',
      headers: getHeader()
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setStationList(data);
        })
      } else {
        message.error('获取站点列表失败');
      }
    })
  }, [])
  const info = {};

  return (
      <div  className={styles.wrapper}>
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 24 }}>
          <Form.Item label="寄件人">
            <Input onChange={(evt) => { info.senderName = evt.target.value; }} />
          </Form.Item>
          <Form.Item label="寄件人电话">
            <Input onChange={(evt) => { info.senderPhone = evt.target.value; }}/>
          </Form.Item>
          <Form.Item label="寄件人地址">
            <Input onChange={(evt) => { info.senderAddress = evt.target.value; }}/>
          </Form.Item>
          <Form.Item label="收件人">
            <Input onChange={(evt) => { info.recieverName = evt.target.value; }} />
          </Form.Item>
          <Form.Item label="收件人电话">
            <Input onChange={(evt) => { info.recieverPhone = evt.target.value; }}/>
          </Form.Item>
          <Form.Item label="收件人地址">
            <Input onChange={(evt) => { info.recieverAddress = evt.target.value; }}/>
          </Form.Item>
          <Form.Item label="寄件站点">
            <Select onChange={(fromStation) => { info.fromStation = fromStation }}>
              {
                stationList.map((item) => {
                  return <Select.Option value={item.id}>{item.name_str}</Select.Option>
                })
              }
            </Select>
          </Form.Item>
          <Form.Item label="收件站点">
            <Select onChange={(toStation) => { info.toStation = toStation }}>
              {
                stationList.map((item) => {
                  return <Select.Option value={item.id}>{item.name_str}</Select.Option>
                })
              }
            </Select>
          </Form.Item>
          <Form.Item
            wrapperCol={{ span: 24, offset: 8 }}
          >
            <Button 
              type="primary"
            >提交</Button>
          </Form.Item>
        </Form>
      </div>
  );
}
