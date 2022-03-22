import { Button, message, Modal, Table, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { api } from "../../../config";

import { getHeader, renderHashInTable } from "../../../common";
import styles from "./style.module.css";

let refreshOutside;

const renderOper = (text, record) => {
  const alterStation = () => {
    const info = { ...record };
    Modal.confirm({
      icon: null,
      content: (
        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 24 }}>
          <Form.Item label={"ID"}>
            <Input defaultValue={info.id} disabled />
          </Form.Item>
          <Form.Item label={"名称"}>
            <Input
              defaultValue={info.name_str}
              onChange={(evt) => {
                info.name_str = evt.target.value;
              }}
            />
          </Form.Item>
          <Form.Item label={"地址"}>
            <Input
              defaultValue={info.addr_str}
              onChange={(evt) => {
                info.addr_str = evt.target.value;
              }}
            />
          </Form.Item>
        </Form>
      ),
      okText: "提交",
      cancelText: "取消",
      onOk: () => {
        fetch(api.ALTER_STATION_POST, {
          method: "POST",
          headers: getHeader(),
          body: JSON.stringify(info),
        }).then((res) => {
          if (res.status === 200) {
            message.success("修改成功");
            refreshOutside();
          } else {
            message.error("修改失败，请重试");
          }
        });
        message.info("已提交，请稍等");
      },
    });
  };

  const deleteStation = () => {
    const info = { ...record };
    Modal.confirm({
      icon: null,
      content: `是否删除站点 ${info.id}`,
      okType: "danger",
      okText: "删除",
      onOk: () => {
        fetch(api.DELETE_STATION_POST, {
          method: "POST",
          headers: getHeader(),
          body: JSON.stringify(info),
        }).then((res) => {
          if (res.status === 200) {
            message.success("删除成功");
            refreshOutside();
          } else {
            message.error("删除失败");
          }
        });
        message.info("已提交，请稍等");
      },
    });
  };

  return (
    <span>
      <Button
        type="primary"
        style={{ marginRight: "10px" }}
        onClick={alterStation}
      >
        修改
      </Button>
      <Button
        type="danger"
        onClick={deleteStation}
      >删除</Button>
    </span>
  );
};

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    render: renderHashInTable
  },
  {
    title: "名称",
    dataIndex: "name_str",
    key: "name_str",
  },
  {
    title: "地址",
    dataIndex: "addr_str",
    key: "addr_str",
  },
  {
    title: "操作",
    dataIndex: "oper",
    key: "oper",
    render: renderOper,
  },
];

export default function StationList() {
  const [stationList, setStationList] = useState(null);

  const refresh = () => {
    fetch(api.STATION_LIST_GET, {
      method: "GET",
      headers: getHeader(),
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          data.forEach((item) => {
            item.key = item.id;
          });
          setStationList(data);
        });
      } else {
        message.error("获取站点列表失败");
      }
    });
  };
  refreshOutside = refresh;

  useEffect(() => {
    refresh();
  }, []);


  const onAddStation = () => {
    const stationInfo = {};
    Modal.confirm({
      icon: null,
      content: (
        <Form wrapperCol={{ span: 24 }} labelCol={{ span: 4 }}>
          <Form.Item label={"名称"}>
            <Input
              onChange={(evt) => {
                stationInfo.name_str = evt.target.value;
              }}
            />
          </Form.Item>
          <Form.Item label={"地址"}>
            <Input
              onChange={(evt) => {
                stationInfo.addr_str = evt.target.value;
              }}
            />
          </Form.Item>
        </Form>
      ),
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        console.log(stationInfo);
        fetch(api.ADD_STATION_POST, {
          method: "POST",
          headers: getHeader(),
          body: JSON.stringify(stationInfo),
        }).then((res) => {
          if (res.status === 200) {
            message.success("新增成功");
            refresh();
          } else {
            res.json().then((data) => {
              message.error("新增失败 " + data.msg);
            });
          }
        });
        message.info("已提交，请稍等");
      },
    });
  };


  return (
    <div className={styles.wrapper}>
      <Table
        className={styles.table}
        size="middle"
        columns={columns}
        dataSource={stationList}
      ></Table>
      <Button type="primary" className={styles.button} onClick={onAddStation}>
        新增
      </Button>
    </div>
  );
}
