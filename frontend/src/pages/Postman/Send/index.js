import { Button, Form, message, Modal, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getHeader, renderHashInTable } from "../../../common";
import { api } from "../../../config";

let stationListOutSide = [];
let refreshOutside;

const renderStation = (station) => {
  return stationListOutSide.filter((item) => {return item.id === station})[0]?.name_str;
}

const renderOper = (text, record) => {
  const onClick = () => {
    const info = {
      hash: record.hash
    };

    const onOk = () => {
      fetch(api.SEND_ORDER_POST, {
        method: 'POST',
        headers: getHeader(),
        body: JSON.stringify(info)
      }).then((res) => {
        if (res.status === 200) {
          message.success('发送成功');
          refreshOutside();
        } else {
          message.error('发送失败');
        }
      })
      message.info('已提交，请稍等');
    }
    Modal.confirm({
      icon: null,
      content: (
        <Form>
          <Form.Item label={'目的地'}>
            <Select onChange={(value) => {
              info.toStation = value;
            }}>
              {
                stationListOutSide.map((item) => {
                  return <Select.Option value={item.id}>{item.name_str}</Select.Option>
                })
              }
            </Select>
          </Form.Item>
        </Form>
      ),
      onOk: onOk,
      okText: '提交',
      cancelText: '取消'
    })
  }
  return (
    <Button
      type="primary"
      onClick={onClick}
    >发送</Button>
  )
}

const columns = [
  {
    title: "订单号",
    dataIndex: "hash",
    key: "hash",
    render: renderHashInTable
  },
  {
    title: "创建时间",
    dataIndex: 'createTime',
    key: 'createTime',
  },
  {
    title: "开始站点",
    dataIndex: 'fromStation',
    key: 'fromStation',
    render: renderStation
  },
  {
    title: '结束站点',
    dataIndex: 'toStation',
    key: 'toStation',
    render: renderStation
  },
  {
    title: '操作',
    dataIndex: 'oper',
    key: 'oper',
    width: 150,
    fixed: 'right',
    render: renderOper
  }
];

export default function Send() {
  const userInfo = useSelector((state) => state.userInfo);
  const [orderList, setOrderList] = useState([]);
  const [stationList, setStationList] = useState([]);
  stationListOutSide = stationList;
  
  const refresh = () => {
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
    fetch(api.ORDER_TO_SEND_GET + userInfo.station, {
      method: "GET",
      headers: getHeader(),
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          console.log(data);
          console.log(data.length);
          data.forEach((item) => {
            item.key = item.hash;
          })
          setOrderList(data);
        })
      } else {
        message.error('获取订单列表失败');
      }
    });
  }
  refreshOutside = refresh;

  useEffect(() => {
    refresh();
  }, []);
  return (
    <Table
      columns={columns}
      dataSource={orderList}
      scroll={{ x: 1000 }}
    ></Table>);
}
