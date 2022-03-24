import {
  Button,
  Form,
  Modal,
  Input,
  Table,
  Tag,
  Tooltip,
  message,
  Select,
} from "antd";
import React, { useEffect, useState } from "react";
import { getHeader, renderHashInTable } from "../../../common";
import { api } from "../../../config";

import styles from "./style.module.css";

const roleMap = {
  admin: "管理员",
  postman: "邮差"
};

const renderRole = (role) => {
  const roleEleMap = {
    admin: <Tag color={"red"}>管理员</Tag>,
    postman: <Tag color={"green"}>邮差</Tag>
  };
  return <span>{roleEleMap[role]}</span>;
};

const renderPasswd = (passwd) => {
  return (
    <Tooltip title={passwd}>
      <span>********</span>
    </Tooltip>
  );
};

let refreshOutside;
const renderOper = (text, record) => {
  const alterUser = () => {
    const info = { ...record };
    // 显示编辑表单
    Modal.confirm({
      icon: null,
      content: (
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
          <Form.Item label={"ID"}>
            <Input defaultValue={info.id} disabled />
          </Form.Item>
          <Form.Item label={"姓名"}>
            <Input
              defaultValue={info.name_str}
              onChange={(evt) => {
                info.name_str = evt.target.value;
              }}
            />
          </Form.Item>
          <Form.Item label={"密码"}>
            <Input.Password
              defaultValue={info.passwd}
              onChange={(evt) => {
                info.passwd = evt.target.value;
              }}
            />
          </Form.Item>
          <Form.Item label={"网络地址"}>
            <Input defaultValue={info.address} disabled />
          </Form.Item>
          <Form.Item label={"角色"}>
            <Input defaultValue={roleMap[info.role_str]} disabled />
          </Form.Item>
          <Form.Item label={"站点"}>
            <Select
              defaultValue={info.station}
              onChange={(station) => {
                info.station = station;
              }}
            >
              {
                  stationListOutside.map((item) => {
                      return <Select.Option value={item.id}>{item.name_str}</Select.Option>
                  })
              }
            </Select>
          </Form.Item>
        </Form>
      ),
      okText: "提交",
      cancelText: "取消",
      onOk: () => {
        fetch(api.ALTER_USER_POST, {
          method: "POST",
          headers:getHeader(),
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
  const deleteUser = () => {
    const info = { ...record };
    Modal.confirm({
      icon: null,
      content: `是否删除用户 ${info.id}`,
      okType: "danger",
      okText: "删除",
      onOk: () => {
        fetch(api.DELETE_USER_POST, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authentication: "Bearer " + localStorage.getItem("access_token"),
          },
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
        style={{ margin: "0 10px 0 0" }}
        onClick={alterUser}
      >
        修改
      </Button>
      <Button type="danger" onClick={deleteUser}>
        删除
      </Button>
    </span>
  );
};

let stationListOutside;

const renderUserStation = (station) => {
    const stationName = stationListOutside.filter((item) => {
        return item.id === station;
    })[0]?.name_str ?? '';
    return (
        <span>{stationName}</span>
    )
} 

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "姓名",
    dataIndex: "name_str",
    key: "name_str",
  },
  {
    title: "密码",
    dataIndex: "passwd",
    key: "passwd",
    render: renderPasswd,
  },
  {
    title: "身份",
    dataIndex: "role_str",
    key: "role_str",
    render: renderRole,
  },
  {
    title: "网络地址",
    dataIndex: "address",
    key: "address",
    render: renderHashInTable,
  },
  {
    title: "站点",
    dataIndex: "station",
    key: "station",
    render: renderUserStation
  },
  {
    title: "操作",
    dataIndex: "oper",
    key: "oper",
    render: renderOper,
  },
];


export default function UserList() {
  const [userList, setUserList] = useState([]);
  const [stationList, setStationList] = useState([]);

  const refresh = () => {
    fetch(api.USER_LIST_GET, {
      method: "GET",
      headers: getHeader(),
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          data.forEach((item) => {
            item.key = item.id;
          });
          setUserList(data);
        });
      }
    });
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

  // 设置refreshOutside用于在修改和删除时刷新页面
  refreshOutside = refresh;
  console.log(userList, stationList);
  stationListOutside = stationList;

  useEffect(() => {
    refresh();
  }, []);

  const onAddUser = () => {
    const userInfo = {};
    Modal.confirm({
      icon: null,
      content: (
        <Form wrapperCol={{ span: 16 }} labelCol={{ span: 6 }}>
          <Form.Item label={"ID"}>
            <Input
              onChange={(evt) => {
                userInfo.id = evt.target.value;
              }}
            />
          </Form.Item>
          <Form.Item label={"密码"}>
            <Input.Password
              type={"password"}
              onChange={(evt) => {
                userInfo.passwd = evt.target.value;
              }}
            />
          </Form.Item>
          <Form.Item label={"姓名"}>
            <Input
              onChange={(evt) => {
                userInfo.name_str = evt.target.value;
              }}
            />
          </Form.Item>
          <Form.Item label={"角色"}>
            <Select
              onChange={(role_str) => {
                userInfo.role_str = role_str;
              }}
            >
              {
                Object.entries(roleMap).map((entry) => {
                    return <Select.Option value={entry[0]}>{entry[1]}</Select.Option>
                })
              }
            </Select>
          </Form.Item>
          <Form.Item label={"站点"}>
              <Select
                onChange={(station) => {
                    userInfo.station = station;
                }}
              >
                  {
                      stationListOutside.map((item) => {
                          return <Select.Option value={item.id}>{item.name_str}</Select.Option>
                      })
                  }
              </Select>
          </Form.Item>
        </Form>
      ),
      onOk: () => {
        fetch(api.ADD_USER_POST, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authentication: "Bearer " + localStorage.getItem("access_token"),
          },
          body: JSON.stringify(userInfo),
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
        scroll={{ x: 700 }}
        className={styles.table}
        size="middle"
        columns={columns}
        dataSource={userList}
      ></Table>
      <Button type="primary" className={styles.add_button} onClick={onAddUser}>
        新增
      </Button>
    </div>
  );
}
