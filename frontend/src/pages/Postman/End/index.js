import { Button, Form, message, Modal, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getHeader, renderHashInTable } from "../../../common";
import { api } from "../../../config";

let stationListOutSide = [];
let userInfoOutSide = {};
let refreshOutside;

const renderStation = (station) => {
  return stationListOutSide.filter((item) => {return item.id === station})[0]?.name_str;
}

const renderOper = (text, record) => {
  const onClick = () => {
    const info = {
      hash: record.hash,
      station: userInfoOutSide.station
    };
    fetch(api.END_ORDER_POST, {
      method: 'POST',
      headers: getHeader(),
      body: JSON.stringify(info)
    }).then((res) => {
      if (res.status === 200) {
        message.success('结束成功');
        refreshOutside();
      } else {
        message.error('结束失败');
      }
    })
    message.info('已提交，请稍等');
  }
  return (
    <Button
      type="primary"
      onClick={onClick}
    >结束</Button>
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
    title: '收件人',
    dataIndex: 'receiverName',
    key: 'receiverName',
  },
  {
    title: '收件地址',
    dataIndex: 'toAddress',
    key: 'receiverAddress',
  },
  {
    title: '收件人电话',
    dataIndex: 'receiverPhone',
    key: 'receiverPhone',
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

export default function End() {
  const userInfo = useSelector((state) => state.userInfo);
  userInfoOutSide = userInfo;
  const [orderList, setOrderList] = useState([]);
  const [stationList, setStationList] = useState([]);
  stationListOutSide = stationList;

  const refresh = () => {
    console.log(233)
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
      fetch(api.ORDER_TO_END_GET + userInfo.station, {
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
